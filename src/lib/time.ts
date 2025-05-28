import dayjs from "dayjs"
import isBetween from "dayjs/plugin/isBetween"
import type { Settings } from "$lib/settings"
import { days, weeks } from "$lib/schedules"

dayjs.extend(isBetween)

type TopLevelDayKeys = Exclude<keyof typeof days, "middleSchool" | "highSchool">

type MiddleSchoolKeys = keyof typeof days.middleSchool
type HighSchoolKeys = keyof typeof days.highSchool

type Days =
  | Exclude<keyof typeof days, "middleSchool" | "highSchool">
  | keyof typeof days.middleSchool
  | keyof typeof days.highSchool

export interface Period {
  name: string
  start: dayjs.Dayjs
  end: dayjs.Dayjs
  passing: boolean
  getStart(): string
  getEnd(): string
  isCurrent(time: dayjs.Dayjs): boolean
}
export type PeriodList = Period[]

/**
 * Creates a period component to represent a single period in a schedule for the now page with the period list component.
 * @param name the name of the period, pre-translate function
 * @param start the dayjs object representing the start time of the period
 * @param end the dayjs object representing the end time of the period
 * @param passing
 * @returns
 */
function period(
  name: string,
  start: dayjs.Dayjs,
  end: dayjs.Dayjs,
  passing: boolean
): Period {
  let periodStart = dayjs(start, "hh:mm A")
  let periodEnd = dayjs(end, "hh:mm A")

  return {
    name: name,
    start: periodStart,
    end: periodEnd,
    passing: passing,
    getStart(): string {
      return periodStart.format()
    },
    getEnd(): string {
      return periodEnd.format()
    },
    isCurrent(time: dayjs.Dayjs): boolean {
      let now = dayjs()
        .subtract(time.hour(), "hour")
        .subtract(time.minute(), "minute")
        .subtract(time.second(), "second")
      return now.isBetween(this.start, this.end)
    },
  } satisfies Period
}

export function getSchedule(date: dayjs.Dayjs, settings: Settings): PeriodList | undefined {
  let schedule: PeriodList | undefined = undefined
  let scheduleType

  schedule = [
    period(
      "noSchool",
      dayjs(days.noSchool.noSchool[0], "hh:mm A"),
      dayjs(days.noSchool.noSchool[1], "hh:mm A"),
      false
    ),
  ] as PeriodList

  switch (settings.grade) {
    case "7":
    case "8":
      schedule = undefined
      scheduleType = weeks.regular[date.day()]

      if (scheduleType === "noSchool")
        schedule = [
          period(
            "noSchool",
            dayjs(days.noSchool.noSchool[0], "hh:mm A"),
            dayjs(days.noSchool.noSchool[1], "hh:mm A"),
            false
          ),
        ] as PeriodList
      else days.middleSchool[scheduleType]

      break
    case "9":
    case "10":
    case "11":
    case "12":
      schedule = undefined
      scheduleType = weeks.regular[date.day()]

      if (scheduleType === "noSchool")
        schedule = [
          period(
            "noSchool",
            dayjs(days.noSchool.noSchool[0], "hh:mm A"),
            dayjs(days.noSchool.noSchool[1], "hh:mm A"),
            false
          ),
        ] as PeriodList
      break
  }
  return schedule
}
