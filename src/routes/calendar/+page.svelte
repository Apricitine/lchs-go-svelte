<script lang="ts">
  import CalendarDate from "$lib/components/CalendarDate.svelte"
  import ScheduleModal from "$lib/components/ScheduleModal.svelte"
  import PeriodList from "$lib/components/home/periodList/PeriodList.svelte"
  import { settings } from "$lib/settings"
  import { translate } from "$lib/translate"
  import { getSchedule, getScheduleType } from "$lib/time"
  import { eventsOnDay, fetchEvents, formatEventWhen, type CalendarEvent } from "$lib/events"
  import dayjs, { type Dayjs } from "dayjs"
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  let month = $state(dayjs().startOf("month"))
  let selected = $state<Dayjs | null>(null)
  let sourceRect = $state<DOMRect | null>(null)
  let showModal = $state(false)
  let events = $state<CalendarEvent[]>([])
  let eventsError = $state(false)
  const eventCache = new Map<string, CalendarEvent[]>()

  const grid = $derived.by(() => {
  const start = month.startOf("week")
  const end = month.endOf("month").endOf("week")
  const days: Dayjs[] = []
  for (let d = start; !d.isAfter(end, "day"); d = d.add(1, "day")) days.push(d)
      return days
  })

  // Load events for the visible grid (including the padding days from adjacent months) whenever it changes
  $effect(() => {
    const from = grid[0]
    const to = grid[grid.length - 1]
    const key = `${from.format("YYYY-MM-DD")}_${to.format("YYYY-MM-DD")}`
    const cached = eventCache.get(key)
    if (cached) {
      events = cached
      return
    }

    let stale = false
    fetchEvents(from, to)
      .then((loaded) => {
        eventCache.set(key, loaded)
        if (stale) return
        events = loaded
        eventsError = false
      })
      .catch((err) => {
        console.error(err)
        if (stale) return
        events = []
        eventsError = true
      })
    return () => {
      stale = true
    }
  })

  const selectedType = $derived(selected ? getScheduleType(selected, $settings) : null)
  const selectedPeriods = $derived(
  selected && selectedType
  ? (getSchedule(selected, $settings)[selectedType] ?? []).filter(
      (p) => !p.passing && p.name !== "beforeSchool" && p.name !== "afterSchool"
      )
  : []
  )
  const selectedEvents = $derived(selected ? eventsOnDay(events, selected) : [])

  function open(date: Dayjs, rect: DOMRect) {
      selected = date
      sourceRect = rect
      showModal = true
  }
</script>

<div class="calendar">
  <header class="calendar-header">
    <button aria-label="Previous month" onclick={() => (month = month.subtract(1, "month"))}> &lt </button>
    <h1>{month.format("MMMM YYYY")}</h1>
    <button aria-label="Next month" onclick={() => (month = month.add(1, "month"))}>></button>
    <button onclick={() => (month = dayjs().startOf("month"))}>Today</button>
  </header>

  {#if eventsError}
    <p class="events-error" role="status">{translate("eventsError", $settings.language)}</p>
  {/if}

  <div class="weekdays">
    {#each weekdays as weekday}
      <span>{weekday}</span>
    {/each}
  </div>

  <div class="grid">
    {#each grid as day (day.valueOf())}
      <CalendarDate
        date={day}
        inMonth={day.isSame(month, "month")}
        events={eventsOnDay(events, day)}
        onselect={open}
      />
    {/each}
  </div>
</div>

<ScheduleModal bind:showModal {sourceRect}>
  {#if selected && selectedType}
    <h2>{selected.format("dddd, MMMM D")}</h2>
    {#if selectedType === "noSchool"}
      <p>No school this day.</p>
    {:else}
      <PeriodList periods={selectedPeriods} currentTime={selected} language={$settings.language} />
    {/if}

    <section class="day-events">
      <h3>{translate("events", $settings.language)}</h3>
      {#if selectedEvents.length === 0}
        <p class="no-events">{translate("noEvents", $settings.language)}</p>
      {:else}
        <ul>
          {#each selectedEvents as event (event.id)}
            <li>
              <span class="event-when">{formatEventWhen(event) ?? translate("allDay", $settings.language)}</span>
              <span class="event-title">
                {#if event.link}
                  <a href={event.link} target="_blank" rel="noopener noreferrer">{event.title}</a>
                {:else}
                  {event.title}
                {/if}
              </span>
              {#if event.location}
                <span class="event-location">{event.location}</span>
              {/if}
            </li>
          {/each}
        </ul>
      {/if}
    </section>
  {/if}
</ScheduleModal>

<style lang="scss">
  @use "$lib/styles.scss";

  .calendar {
    width: min(92vw, 760px);
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .calendar-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    h1 {
      flex: 1;
      text-align: center;
      font-size: 1.5rem;
      font-weight: 600;
    }

    button {
      padding: 0.25rem 0.75rem;
      border: none;
      background-color: styles.$clear-gray;
      cursor: pointer;

      &:hover {
        background-color: styles.$clear-gray-darker;
      }
    }
  }

  .events-error {
    text-align: center;
    font-size: 0.85rem;
    opacity: 0.8;
  }

  .weekdays,
  .grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 4px;
  }

  .weekdays span {
    text-align: center;
    font-weight: 600;
    opacity: 0.8;
  }

  .day-events {
    margin-top: 1.25rem;

    h3 {
      font-size: 1rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: grid;
      gap: 0.5rem;
    }

    li {
      display: grid;
      grid-template-columns: max-content 1fr;
      column-gap: 0.75rem;
      align-items: baseline;
    }

    .event-when {
      font-size: 0.85rem;
      opacity: 0.75;
      white-space: nowrap;
    }

    .event-title {
      font-weight: 600;

      a {
        color: inherit;
      }
    }

    .event-location {
      grid-column: 2;
      font-size: 0.85rem;
      opacity: 0.75;
    }

    .no-events {
      opacity: 0.75;
    }
  }
</style>
