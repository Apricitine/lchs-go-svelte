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
  import { settings, updateSetting } from "$lib/settings"
  import { browser } from "$app/environment"
  import * as time from "$lib/time"

  let greeting: string
  let day = dayjs()
  const format = "h:mm"

  const getTimeOfDayGreeting = (language: Languages) => {
    const now = day.hour()
    if (now < 12) return translate("morning", language)
    else if (now < 18) return translate("afternoon", language)
    else return translate("evening", language)
  }

  let currentPeriod: time.Period = time.period("", dayjs(), dayjs(), false)

  const schedule = time.getSchedule(day, $settings)
  const scheduleTranslation = Object.keys(
    schedule
  )[0] as keyof typeof languages.english
  const daySchedule =
    schedule[Object.keys(schedule)[0] as keyof typeof schedule] ?? []

  // help help help help
  daySchedule.forEach((p) => {
    if (p.isCurrent(day)) currentPeriod = p
  })

  $: secondsLeft = currentPeriod.end.diff(day, "seconds")
  $: minutesLeft = Math.round(secondsLeft / 60)
  $: percentCompleted = Math.round(100 - (secondsLeft / currentPeriod.end.diff(currentPeriod.start, "seconds")) * 100)

</script>

<div class="now-container">
  <h1 class="welcome">
    {(greeting = interpolateTranslation(
      translate(
        randomPick(["greeting1", "greeting2", "greeting3"]),
        $settings.language
      ),
      {
        timeOfDay: getTimeOfDayGreeting($settings.language).toLowerCase(),
        schedule: translate(
          scheduleTranslation,
          $settings.language
        ).toLocaleLowerCase(),
      }
    ))}
  </h1>
  <main class="schedule-container">
    <div class="period-info">
      <Progress />
      <Info
        periodStart={currentPeriod.start.format(format)}
        periodEnd={currentPeriod.end.format(format)}
        periodName={currentPeriod.name}
        timeLeft={minutesLeft}
        percentCompleted={percentCompleted}
      />
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
      margin-bottom: 2%;
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
