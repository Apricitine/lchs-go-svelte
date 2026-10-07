<script lang="ts">
    import { translate } from "$lib/translate";
    import { settings } from "$lib/settings";
    import dayjs, { type Dayjs } from "dayjs";
    import { getScheduleType } from "$lib/time";
    

    let {
        date,
        inMonth = true,
        onselect,
    }: {
        date: Dayjs
        inMonth?: boolean
        onselect: (date: Dayjs, rect: DOMRect) => void
    } = $props()

    const scheduleType = $derived(getScheduleType(date, $settings))
    const label = $derived(translate(scheduleType, $settings.language))
    const isToday = $derived(date.isSame(dayjs(), "day"))


</script>


<button
  class="calendar-box"
  class:outside={!inMonth}
  class:today={isToday}
  class:no-school={scheduleType === "noSchool"}
  aria-label="{date.format('dddd, MMMM D')}: {label}"
  onclick={(e) => onselect(date, e.currentTarget.getBoundingClientRect())}
>
  <span class="cd-number">{date.date()}</span>
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

  @media (max-width: 640px) {
    .cd-tag {
      display: none;
    }
  }
</style>
