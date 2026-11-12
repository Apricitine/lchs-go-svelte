import { error, json } from "@sveltejs/kit"
import { env } from "$env/dynamic/private"
import dayjs from "dayjs"
import { calendarId, normalizeGoogleEvent, type CalendarEvent, type GoogleCalendarItem } from "$lib/events"
import type { RequestHandler } from "./$types"

const DATE_PARAM = /^\d{4}-\d{2}-\d{2}$/
const MAX_RANGE_DAYS = 93

/**
 * GET /api/events?from=YYYY-MM-DD&to=YYYY-MM-DD
 * Proxies the Google Calendar API so the API key stays on the server, and normalizes the response.
 */
export const GET: RequestHandler = async ({ url, fetch, setHeaders }) => {
  const from = url.searchParams.get("from") ?? ""
  const to = url.searchParams.get("to") ?? ""
  if (!DATE_PARAM.test(from) || !DATE_PARAM.test(to)) error(400, "from and to must be YYYY-MM-DD")

  // Pad a day on each side: the server's timezone may differ from the viewer's, and the client filters per day anyway.
  const timeMin = dayjs(from).subtract(1, "day").startOf("day")
  const timeMax = dayjs(to).add(2, "day").startOf("day")
  if (!timeMin.isValid() || !timeMax.isValid() || !timeMax.isAfter(timeMin)) error(400, "Invalid date range")
  if (timeMax.diff(timeMin, "day") > MAX_RANGE_DAYS) error(400, `Range may not exceed ${MAX_RANGE_DAYS} days`)

  const apiKey = env.GOOGLE_CALENDAR_API_KEY
  if (!apiKey) error(500, "GOOGLE_CALENDAR_API_KEY is not set")

  const id = env.GOOGLE_CALENDAR_ID || calendarId
  const endpoint = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(id)}/events`
  const events: CalendarEvent[] = []
  let pageToken: string | undefined

  do {
    const params = new URLSearchParams({
      key: apiKey,
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
      singleEvents: "true", // expand recurring events into individual instances
      orderBy: "startTime",
      maxResults: "250",
    })
    if (pageToken) params.set("pageToken", pageToken)

    const response = await fetch(`${endpoint}?${params}`)
    if (!response.ok) {
      console.error(`Google Calendar API responded ${response.status}:`, await response.text())
      error(502, "Could not load events from Google Calendar")
    }

    const data = (await response.json()) as { items?: GoogleCalendarItem[]; nextPageToken?: string }
    for (const item of data.items ?? []) {
      const event = normalizeGoogleEvent(item)
      if (event) events.push(event)
    }
    pageToken = data.nextPageToken
  } while (pageToken)

  setHeaders({ "cache-control": "public, max-age=300, s-maxage=300" })
  return json(events)
}
