<script lang="ts">
  import Info from "$lib/components/home/periodInfo/Info.svelte"
  import Progress from "$lib/components/home/periodInfo/Progress.svelte"
  import {
    interpolateTranslation,
    translate,
    type Languages,
    languages,
  } from "$lib/translate"
  import dayjs from "dayjs"
  import { type Settings } from "$lib/settings"
  import { randomPick } from "$lib/utilities"
  import { settings } from "$lib/settings"
  import { browser } from "$app/environment"

  const schedule = "Regular Schedule"
  let greeting: string

  const getTimeOfDayGreeting = (language: Languages) => {
    const now = dayjs().hour()
    if (now < 12) return translate("morning", language)
    else if (now < 18) return translate("afternoon", language)
    else return translate("evening", language)
  }

  console.log($settings)

  greeting = interpolateTranslation(
    translate(randomPick(["greeting1", "greeting2", "greeting3"]), $settings.language),
    {
      timeOfDay: getTimeOfDayGreeting($settings.language).toLowerCase(),
      schedule: schedule.toLowerCase(),
    }
  )

</script>

<div class="now-container">
  <h1 class="welcome">
    {greeting}
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
  $clear-gray: hsla(0, 0%, 0%, 0.25);

  .now-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 38.4%;

    .welcome {
      font-size: 125%;
      text-align: center;
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
