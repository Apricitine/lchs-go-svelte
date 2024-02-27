import type dayjs from "dayjs"

type Week = {
  sunday: keyof typeof days.noSchool
  monday: keyof typeof days.middleSchool | keyof typeof days.highSchool
  tuesday: keyof typeof days.middleSchool | keyof typeof days.highSchool
  wednesday: keyof typeof days.middleSchool | keyof typeof days.highSchool
  thursday: keyof typeof days.middleSchool | keyof typeof days.highSchool
  friday: keyof typeof days.middleSchool | keyof typeof days.highSchool
  saturday: keyof typeof days.noSchool
}

export const days = {
  noSchool: {
    noSchool: ["12:00 AM", "11:59 PM"],
  },
  middleSchool: {
    regular: {
      period0: ["07:28 AM", "08:24 AM"],
      period1: ["08:30 AM", "09:26 AM"],
      period2: ["09:32 AM", "10:28 AM"],
      break: ["10:28 AM", "10:38 AM"],
      period3: ["10:43 AM", "11:39 AM"],
      period4: ["11:45 AM", "12:41 PM"],
      lunch: ["12:41 PM", "01:11 PM"],
      period5: ["01:16 PM", "02:12 PM"],
      period6: ["02:18 PM", "03:14 PM"],
    },
    blockOdd: {
      period0: ["07:28 AM", "08:24 AM"],
      period1: ["08:30 AM", "10:14 AM"],
      break: ["10:14 AM", "10:24 AM"],
      period3: ["10:29 AM", "12:13 PM"],
      lunch: ["12:13 PM", "12:43 PM"],
      homeroom: ["12:48 PM", "01:23 PM"],
      period5: ["01:29 PM", "03:13 PM"],
    },
    blockEven: {
      period0: ["07:28 AM", "08:24 AM"],
      period2: ["08:30 AM", "10:14 AM"],
      break: ["10:14 AM", "10:24 AM"],
      period4: ["10:29 AM", "12:13 PM"],
      lunch: ["12:13 PM", "12:43 PM"],
      homeroom: ["12:48 PM", "01:23 PM"],
      period6: ["01:29 PM", "03:13 PM"],
    },
  },
  highSchool: {
    regular: {
      period0: ["07:28 AM", "08:24 AM"],
      period1: ["08:30 AM", "09:26 AM"],
      period2: ["09:32 AM", "10:28 AM"],
      break: ["10:28 AM", "10:38 AM"],
      period3: ["10:43 AM", "11:39 AM"],
      lunch: ["11:39 AM", "12:09 PM"],
      period4: ["12:14 PM", "01:10 PM"],
      period5: ["01:16 PM", "02:12 PM"],
      period6: ["02:18 PM", "03:14 PM"],
    },
    blockOdd: {
      period0: ["07:28 AM", "08:24 AM"],
      period1: ["08:30 AM", "10:14 AM"],
      break: ["10:14 AM", "10:24 AM"],
      period3: ["10:29 AM", "12:13 PM"],
      advisory: ["12:19 PM", "12:54 PM"],
      lunch: ["12:54 PM", "01:24 PM"],
      period5: ["01:29 PM", "03:13 PM"],
    },
    blockEven: {
      period0: ["07:28 AM", "08:24 AM"],
      period2: ["08:30 AM", "10:14 AM"],
      break: ["10:14 AM", "10:24 AM"],
      period4: ["10:29 AM", "12:13 PM"],
      advisory: ["12:19 PM", "12:54 PM"],
      lunch: ["12:54 PM", "01:24 PM"],
      period6: ["01:29 PM", "03:13 PM"],
    },
  },
}

export const weeks: { [key: string]: Week } = {
  regular: {
    sunday: "noSchool",
    monday: "regular",
    tuesday: "regular",
    wednesday: "regular",
    thursday: "regular",
    friday: "regular",
    saturday: "noSchool",
  },
}
