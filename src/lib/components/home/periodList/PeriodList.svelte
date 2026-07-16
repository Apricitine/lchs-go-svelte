<script lang="ts">
  import PeriodListItem from "$lib/components/home/periodList/PeriodListItem.svelte"
  import { formatPeriodName } from "$lib/periods"
  import type { Languages } from "$lib/translate"
  import type { PeriodList as SchedulePeriodList } from "$lib/time"
  import type { Dayjs } from "dayjs"

  const timeFormat = "h:mm A"

  let {
    periods,
    currentTime,
    language,
  }: {
    periods: SchedulePeriodList
    currentTime: Dayjs
    language: Languages
  } = $props()
</script>

<ul class="period-list" aria-label="Today's periods">
  {#each periods as period (period.name + period.start.valueOf())}
    <PeriodListItem
      name={formatPeriodName(period.name, language)}
      start={period.start.format(timeFormat)}
      end={period.end.format(timeFormat)}
      current={period.isCurrent(currentTime)}
    />
  {/each}
</ul>

<style lang="scss">
  .period-list {
    align-self: stretch;
    width: 100%;
    min-height: 100%;
    display: grid;
    align-content: stretch;
    gap: 0;
    list-style: none;
  }
</style>
