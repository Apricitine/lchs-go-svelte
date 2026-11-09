<script lang="ts">
    import { translate } from "$lib/translate";
    import { settings } from "$lib/settings";
    import dayjs, { type Dayjs } from "dayjs";
    import { getScheduleType } from "$lib/time";
    import type { CalendarEvent } from "$lib/events";

    const MAX_VISIBLE_EVENTS = 2

    let {
        date,
        inMonth = true,
        events = [],
        onselect,
    }: {
        date: Dayjs
        inMonth?: boolean
        events?: CalendarEvent[]
        onselect: (date: Dayjs, rect: DOMRect) => void
    } = $props()

    const scheduleType = $derived(getScheduleType(date, $settings))
    const label = $derived(scheduleType)
    const isToday = $derived(date.isSame(dayjs(), "day"))
    const visibleEvents = $derived(events.slice(0, MAX_VISIBLE_EVENTS))
    const hiddenEventCount = $derived(events.length - visibleEvents.length)
    const ariaLabel = $derived(
      `${date.format("dddd, MMMM D")}: ${label}` +
        (events.length ? `, ${events.length} ${events.length === 1 ? "event" : "events"}` : "")
    )
</script>


<button
  class="calendar-box"
  class:outside={!inMonth}
  class:today={isToday}
  class:no-school={scheduleType === "noSchool"}
  aria-label={ariaLabel}
  onclick={(e) => onselect(date, e.currentTarget.getBoundingClientRect())}
>
  <span class="cd-number">{date.date()}</span>
  {#if events.length > 0}
    <span class="cd-events" aria-hidden="true">
      {#each visibleEvents as event (event.id)}
        <span class="cd-event" title={event.title}>{event.title}</span>
      {/each}
      {#if hiddenEventCount > 0}
        <span class="cd-more">+{hiddenEventCount}</span>
      {/if}
    </span>
  {/if}
  <span class="cd-tag">{label}</span>
</button>


<!-- Steps:
 1. set dates on box
 2. make it say what type of day it is
 3. make it modal on click
 4. modal should display the schedule on that specific day -->

<style lang="scss">
  @use "$lib/styles.scss";

  .calendar-box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    aspect-ratio: 1;
    padding: 0.5rem;
    border: none;
    background-color: styles.$clear-gray;
    text-align: left;
    cursor: pointer;
    transition: background-color 150ms ease, transform 150ms ease;

    &:hover,
    &:focus-visible {
      background-color: styles.$clear-gray-darker;
      transform: translateY(-2px);
      outline: none;
    }

    &.today {
      box-shadow: inset 0 0 0 2px styles.$clear-white;
    }

    &.outside {
      opacity: 0.4;
    }

    &.no-school .cd-tag {
      opacity: 0.6;
    }
  }

  .cd-number {
    font-size: 1.25rem;
    font-weight: 700;
  }

  .cd-tag {
    font-size: 0.75rem;
    line-height: 1.1;
  }

  .cd-events {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-height: 0;
    overflow: hidden;
    margin: 0.25rem 0;
  }

  .cd-event {
    font-size: 0.65rem;
    line-height: 1.3;
    padding: 0 0.3rem;
    border-radius: 4px;
    background-color: styles.$clear-white;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .cd-more {
    font-size: 0.65rem;
    line-height: 1.2;
    opacity: 0.8;
  }

  @media (max-width: 640px) {
    .cd-tag,
    .cd-more {
      display: none;
    }

    // Collapse event chips into dots where there is no room for text
    .cd-events {
      flex-direction: row;
      flex-wrap: wrap;
      gap: 3px;
    }

    .cd-event {
      width: 6px;
      height: 6px;
      padding: 0;
      border-radius: 50%;
      font-size: 0;
    }
  }
</style>
