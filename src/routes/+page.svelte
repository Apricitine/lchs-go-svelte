<script lang="ts">
  import Info from "$lib/components/home/periodInfo/Info.svelte"
  import PeriodList from "$lib/components/home/periodList/PeriodList.svelte"
  import Progress from "$lib/components/home/periodInfo/Progress.svelte"
  import {
    interpolateTranslation,
    translate,
    type Languages,
    languages,
  } from "$lib/translate"
  import { formatPeriodName } from "$lib/periods"
  import dayjs from "dayjs"
  import { randomPick } from "$lib/utilities"
  import { settings } from "$lib/settings"
  import * as time from "$lib/time"

  const day = dayjs()
  const format = "h:mm"

  const getTimeOfDayGreeting = (language: Languages) => {
    const now = day.hour()
    if (now < 12) return translate("morning", language)
    else if (now < 18) return translate("afternoon", language)
    else return translate("evening", language)
  }

  const schedule = $derived(time.getSchedule(day, $settings))
  const scheduleTranslation = $derived(
    Object.keys(schedule)[0] as keyof typeof languages.english
  )
  const daySchedule = $derived(
    schedule[Object.keys(schedule)[0] as keyof typeof schedule] ?? []
  )
  const visibleDaySchedule = $derived(
    daySchedule.filter(
      (period) =>
        !period.passing &&
        period.name !== "beforeSchool" &&
        period.name !== "afterSchool"
    )
  )

  const currentPeriod = $derived(
    daySchedule.find((p) => p.isCurrent(day)) ??
      time.period("", dayjs(), dayjs(), false)
  )

  const secondsLeft = $derived(currentPeriod.end.diff(day, "seconds"))
  const minutesLeft = $derived(Math.round(secondsLeft / 60))
  const percentCompleted = $derived(
    Math.round(
      100 -
        (secondsLeft / currentPeriod.end.diff(currentPeriod.start, "seconds")) *
          100
    )
  )

  const greeting = $derived(
    interpolateTranslation(
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
    )
  )
</script>

<div class="now-container">
  <h1 class="welcome">
    {greeting}
  </h1>
  <main class="schedule-container">
    <div class="period-info">
      <!-- TODO fix circleProgress!! -->
      <Progress circleProgress={25} now={day.format("hh:mm")} />
      <Info
        periodStart={currentPeriod.start.format(format)}
        periodEnd={currentPeriod.end.format(format)}
        periodName={formatPeriodName(currentPeriod.name, $settings.language)}
        timeLeft={minutesLeft}
        {percentCompleted}
      />
    </div>
    <PeriodList
      periods={visibleDaySchedule}
      currentTime={day}
      language={$settings.language}
    />
  </main>
</div>

<style lang="scss">
  $clear-gray: hsla(0, 0%, 0%, 0.25);

  .now-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: min(90vw, 980px);

    .welcome {
      font-size: 125%;
      text-align: center;
      margin-bottom: 2%;
    }

    .schedule-container {
      width: 100%;
      display: grid;
      grid-template-columns: minmax(360px, 1fr) minmax(260px, 0.72fr);
      gap: 1rem;
      align-items: stretch;

      .period-info {
        width: 100%;
        display: flex;
        background-color: $clear-gray;
      }
    }
  }

  @media (max-width: 820px) {
    .now-container {
      width: min(92vw, 520px);

      .schedule-container {
        grid-template-columns: 1fr;
      }
    }
  }
</style>
