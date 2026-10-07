<script lang="ts">
    import CalendarDate from "$lib/components/CalendarDate.svelte"
    import ScheduleModal from "$lib/components/ScheduleModal.svelte"
    import PeriodList from "$lib/components/home/periodList/PeriodList.svelte"
    import { settings } from "$lib/settings"
    import { translate } from "$lib/translate"
    import { getSchedule, getScheduleType } from "$lib/time"
    import dayjs, { type Dayjs } from "dayjs"

    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    let month = $state(dayjs().startOf("month"))
    let selected = $state<Dayjs | null>(null)
    let sourceRect = $state<DOMRect | null>(null)
    let showModal = $state(false)

    const grid = $derived.by(() => {
    const start = month.startOf("week")
    const end = month.endOf("month").endOf("week")
    const days: Dayjs[] = []
    for (let d = start; !d.isAfter(end, "day"); d = d.add(1, "day")) days.push(d)
        return days
    })

    const selectedType = $derived(selected ? getScheduleType(selected, $settings) : null)
    const selectedPeriods = $derived(
    selected && selectedType
    ? (getSchedule(selected, $settings)[selectedType] ?? []).filter(
        (p) => !p.passing && p.name !== "beforeSchool" && p.name !== "afterSchool"
        )
    : []
    )

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

  <div class="weekdays">
    {#each weekdays as weekday}
      <span>{weekday}</span>
    {/each}
  </div>

  <div class="grid">
    {#each grid as day (day.valueOf())}
      <CalendarDate date={day} inMonth={day.isSame(month, "month")} onselect={open} />
    {/each}
  </div>
</div>

<ScheduleModal bind:showModal {sourceRect}>
  {#if selected && selectedType}
    <h2>{selected.format("dddd, MMMM D")}</h2>
    <p>{translate(selectedType, $settings.language)}</p>
    {#if selectedType === "noSchool"}
      <p>No school this day.</p>
    {:else}
      <PeriodList periods={selectedPeriods} currentTime={selected} language={$settings.language} />
    {/if}
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
</style>
