import dayjs from "dayjs"
import isBetween from "dayjs/plugin/isBetween"
import customParseFormat from "dayjs/plugin/customParseFormat"
import type { Settings } from "$lib/settings"
import { days, weeks } from "$lib/schedules"


dayjs.extend(isBetween)
dayjs.extend(customParseFormat)


/**
 * Type representing all possible days in the schedule, as defined by *schedules.ts*.
 */
type Days =
  | Exclude<keyof typeof days, "middleSchool" | "highSchool">
  | keyof typeof days.middleSchool
  | keyof typeof days.highSchool


/**
 * Type representing a single period in the schedule, with various properties and methods to be referred to.
 * @member `name` the name of the period, before the translate function is applied
 * @member `start` the dayjs object representing the start time of the period
 * @member `end` the dayjs object representing the end time of the period
 * @member `passing` a boolean indicating whether the period is a passing period or not
 * @function `getStart` returns the start time of the period as a string in the pre-specified dayjs format
 * @function `getEnd` returns the end time of the period as a string in the pre-specified dayjs format
 * @function `isCurrent` checks if the period is currently ongoing based on the provided time, which defaults to the current time
 */
export interface Period {
  name: string // TODO: update this to be stricter, include only the possible period names as defined by *schedules.ts*
  start: dayjs.Dayjs
  end: dayjs.Dayjs
  passing: boolean
  isCurrent(time: dayjs.Dayjs): boolean
}
export type PeriodList = Period[]


/**
 * Creates a period component to represent a single period in a schedule for the now page with the period list component.
 * @param name the name of the period, pre-translate function
 * @param start the dayjs object representing the start time of the period
 * @param end the dayjs object representing the end time of the period
 * @param passing a boolean indicating whether the period is a passing period or not
 * @returns an object of type `Period`
 */
export function period(
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
    isCurrent(time: dayjs.Dayjs): boolean {
      return time.isBetween(this.start, this.end)
    }
  } satisfies Period
}


/**
 * A very important function that returns the schedule for the current date based on the grade level specified in the settings among other options.
 * @param date a dayjs object with the current date
 * @param settings the settings store
 * @returns an object with a single key with name of type `Days` and a value of type `PeriodList`, which is an array of objects of type `Period` ordered by their chronological position the the day's schedule
 */
export function getSchedule(date: dayjs.Dayjs, settings: Settings): { [key in Days]?: PeriodList } {
  let schedule: { [key in Days]?: PeriodList }
  let scheduleType: Days
  let previousPeriodEnd: null | dayjs.Dayjs = null


  schedule = {
    noSchool: [
      period(
        "noSchool",
        dayjs(days.noSchool.noSchool[0], "hh:mm A"),
        dayjs(days.noSchool.noSchool[1], "hh:mm A"),
        false
      ),
    ] as PeriodList
  }


  switch (settings.grade) {
    case "7":
    case "8":
      scheduleType = weeks.regular[date.day()]
      delete schedule["noSchool"]
      if (!schedule[scheduleType]) { schedule[scheduleType] = [] }


      if (scheduleType === "noSchool")
        schedule.noSchool = [
          period(
            "noSchool",
            dayjs(days.noSchool.noSchool[0], "hh:mm A"),
            dayjs(days.noSchool.noSchool[1], "hh:mm A"),
            false
          ),
        ] as PeriodList
      else {
        Object.entries(days.middleSchool[scheduleType]).forEach((p) => {
          if (previousPeriodEnd && p[0] != "break") {
            schedule[scheduleType]!.push(period(
              `passingBefore${(p[0].substring(0, 1).toLocaleUpperCase()).concat(p[0].substring(1))}`,
              previousPeriodEnd, dayjs(p[1][0], "hh:mm A"), true
            ))
          }
          schedule[scheduleType]!.push(period(p[0], dayjs(p[1][0], "hh:mm A"), dayjs(p[1][1], "hh:mm A"), false))
          previousPeriodEnd = dayjs(p[1][1], "hh:mm A")
        })
        schedule[scheduleType]!.unshift(period(
          "beforeSchool",
          dayjs("12:00 AM", "hh:mm A"),
          schedule[scheduleType]![0].start,
          false
        ))
        schedule[scheduleType]!.push(period(
          "afterSchool",
          schedule[scheduleType]![schedule[scheduleType]!.length - 1].end,
          dayjs("11:59 PM", "hh:mm A"),
          false
        ))
      }


      break
    case "9":
    case "10":
    case "11":
    case "12":
      scheduleType = weeks.regular[date.day()]
      delete schedule["noSchool"]
      if (!schedule[scheduleType]) schedule[scheduleType] = []


      if (scheduleType === "noSchool")
        schedule[scheduleType] = [
          period(
            "noSchool",
            dayjs(days.noSchool.noSchool[0], "hh:mm A"),
            dayjs(days.noSchool.noSchool[1], "hh:mm A"),
            false
          ),
        ] as PeriodList
      else {
        Object.entries(days.highSchool[scheduleType]).forEach((p) => {
          if (previousPeriodEnd && p[0] != "break") {
            schedule[scheduleType]!.push(period(
              `passingBefore${(p[0].substring(0, 1).toLocaleUpperCase()).concat(p[0].substring(1))}`,
              previousPeriodEnd, dayjs(p[1][0], "hh:mm A"), true
            ))
          }
          schedule[scheduleType]!.push(period(p[0], dayjs(p[1][0], "hh:mm A"), dayjs(p[1][1], "hh:mm A"), false))
          previousPeriodEnd = dayjs(p[1][1], "hh:mm A")
        })
        schedule[scheduleType]!.unshift(period(
          "beforeSchool",
          dayjs("12:00 AM", "hh:mm A"),
          schedule[scheduleType]![0].start,
          false
        ))
        schedule[scheduleType]!.push(period(
          "afterSchool",
          schedule[scheduleType]![schedule[scheduleType]!.length - 1].end,
          dayjs("11:59 PM", "hh:mm A"),
          false
        ))
      }


      break
  }
  return schedule
}



