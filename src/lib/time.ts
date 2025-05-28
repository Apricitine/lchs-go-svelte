import dayjs from "dayjs"
import isBetween from "dayjs/plugin/isBetween"

dayjs.extend(isBetween)

function periodComponent(name: string, start: dayjs.Dayjs, end: dayjs.Dayjs, passing: boolean) {
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
  }
}