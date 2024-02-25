<script lang="ts">
  import Info from "$lib/components/home/periodInfo/Info.svelte"
import Progress from "$lib/components/home/periodInfo/Progress.svelte";
</script>

<div class="now-container">
  <h1 class="welcome">Hi Tom!</h1>
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
