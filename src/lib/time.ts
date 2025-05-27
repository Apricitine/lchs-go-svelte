import dayjs from "dayjs"

interface TimePeriod {

}



function periodComponent(name: string, start: dayjs.Dayjs, end: dayjs.Dayjs, passing: boolean) {
  let periodStart = dayjs(start, "hh:mm A")
  let periodEnd = dayjs(end, "hh:mm A")

  return {
    name: name,
    start: periodStart,
    end: periodEnd,
    passing: passing,
    getStart() {
      return periodStart.format()
    }
  }
}