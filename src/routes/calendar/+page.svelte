<script lang="ts">
  import CalendarDate from "$lib/components/CalendarDate.svelte";
  import { type Days } from "$lib/time";
  import { translate } from "$lib/translate";
    const tests = [
    { id: 1, name: "banana", qty: 12 },
    { id: 2, name: "apple", qty: 8 },
    { id: 3, name: "orange", qty: 7 }
	]



</script>
<div class="calendar-container">
    {#each tests as test}
        <div class="calendar-day">
            <div class="calendar-tag">
                {test.qty}
            </div>
        </div>
    {/each}
</div>
<CalendarDate scheduletype={"noSchool"} date={"2023-10-01"} />

<style lang="scss">
    .calendar-tag {
      position: absolute;
      left: 10px;
      top: 6px;
      right: auto;
      bottom: auto;
      font-size: 21px;
      font-weight: 600;
    }
    .calendar-day  {
      position: relative;
      display: flex;
      height: 100%;
      min-height: 85px;
      padding-top: 36px;
      padding-right: 10px;
      padding-bottom: 12px;
      padding-left: 10px;
      justify-content: flex-start;
      align-items: stretch;
      flex-direction: column;
      gap: 6px;
      flex-grow: 1;
      flex-shrink: 0;
      flex-basis: 13%;
      cursor: pointer;
      border: 1px solid var(--surface-border);
      border-radius: 20px;
      box-shadow: var(--shadow-soft);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      transition:
        transform var(--transition-fast),
        background-color var(--transition-fast),
        border-color var(--transition-fast),
        box-shadow var(--transition-fast),
        opacity var(--transition-fast);

  }
  .calendar-container {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(5, 1fr);
    grid-column-gap: 8px;
    grid-row-gap: 8px;
    width: min(92vw, 880px);
    max-width: 100%;
  }
</style>
