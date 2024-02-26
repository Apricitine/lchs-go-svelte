<script lang="ts">
  import Info from "$lib/components/home/periodInfo/Info.svelte"
  import Progress from "$lib/components/home/periodInfo/Progress.svelte"
  import { interpolateTranslation, translate } from "$lib/translate"
</script>

<div class="now-container">
  <h1 class="welcome">
    {interpolateTranslation(translate("greeting1", "english"), {
      timeOfDay: "Afternoon",
      schedule: "Regular Schedule",
    })}
  </h1>
  <main class="schedule-container">
    <div class="period-info">
      <Progress />
      <Info />
    </div>
    <div class="all-periods">ff</div>
  </main>
</div>

<style lang="scss">
  $clear-gray: hsla(0, 0, 0, 0.25);

  .now-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 38.4%;

    .welcome {
      font-size: 125%;
    }

    .schedule-container {
      width: 100%;
      display: flex;
      flex-direction: row;

      .period-info {
        width: 100%;
        display: flex;
        background-color: $clear-gray;
      }
    }
  }
</style>
