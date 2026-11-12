import dayjs, { type Dayjs } from "dayjs"

/**
 * The Google Calendar that LCHS Go pulls events from.
 * Not a secret: it is visible in the calendar's public embed URL. Override per deployment with `GOOGLE_CALENDAR_ID`.
 */
export const calendarId = "kenjlee09@gmail.com"

/**
 * One calendar event, normalized from the Google Calendar API.
 * Dates are ISO 8601 strings so the type survives JSON between the server endpoint and the browser.
 * All-day events use `YYYY-MM-DD` and `end` is exclusive, matching Google's convention.
 */
export type CalendarEvent = {
  id: string
  title: string
  start: string
  end: string
  allDay: boolean
  location?: string
  description?: string
  link?: string
}

/** The fields we read from a Google Calendar API v3 `events.list` item. */
export type GoogleCalendarItem = {
  id: string
  status?: string
  summary?: string
  description?: string
  location?: string
  htmlLink?: string
  start?: { date?: string; dateTime?: string }
  end?: { date?: string; dateTime?: string }
}

/** Converts a raw Google item into a `CalendarEvent`, or `null` if it is cancelled or malformed. */
export const normalizeGoogleEvent = (item: GoogleCalendarItem): CalendarEvent | null => {
  if (item.status === "cancelled") return null
  const start = item.start?.dateTime ?? item.start?.date
  const end = item.end?.dateTime ?? item.end?.date
  if (!start || !end) return null
  return {
    id: item.id,
    title: item.summary?.trim() || "(No title)",
    start,
    end,
    allDay: Boolean(item.start?.date),
    location: item.location?.trim() || undefined,
    description: item.description?.trim() || undefined,
    link: item.htmlLink || undefined,
  }
}

/** Events that overlap any part of the given calendar day, keeping the API's start-time order. */
export const eventsOnDay = (events: CalendarEvent[], day: Dayjs): CalendarEvent[] => {
  const dayStart = day.startOf("day")
  const dayEnd = day.endOf("day")
  return events.filter((event) => {
    // `end` is exclusive, so an event ending exactly at midnight does not spill into the next day
    return dayjs(event.start).isBefore(dayEnd) && dayjs(event.end).isAfter(dayStart)
  })
}

/**
 * Human-readable time range for an event.
 * Returns `null` for a single all-day event so the caller can show a translated "All day" label.
 */
export const formatEventWhen = (event: CalendarEvent): string | null => {
  const start = dayjs(event.start)
  if (event.allDay) {
    const lastDay = dayjs(event.end).subtract(1, "day")
    if (lastDay.isSame(start, "day")) return null
    return `${start.format("MMM D")} – ${lastDay.format("MMM D")}`
  }
  const end = dayjs(event.end)
  if (start.isSame(end, "day")) return `${start.format("h:mm A")} – ${end.format("h:mm A")}`
  return `${start.format("MMM D, h:mm A")} – ${end.format("MMM D, h:mm A")}`
}

/** Loads events from our own `/api/events` endpoint for the inclusive day range `from`..`to`. */
export const fetchEvents = async (from: Dayjs, to: Dayjs, fetcher: typeof fetch = fetch): Promise<CalendarEvent[]> => {
  const params = new URLSearchParams({ from: from.format("YYYY-MM-DD"), to: to.format("YYYY-MM-DD") })
  const response = await fetcher(`/api/events?${params}`)
  if (!response.ok) throw new Error(`Failed to load events (${response.status})`)
  return (await response.json()) as CalendarEvent[]
}
