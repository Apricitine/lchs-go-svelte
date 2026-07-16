import { translate, type Languages } from "$lib/translate"

export const formatPeriodName = (name: string, language: Languages) => {
  if (!name) return ""

  const periodMatch = name.match(/^period(\d+)$/)
  if (periodMatch) return `Period ${periodMatch[1]}`

  const passingMatch = name.match(/^passingBeforePeriod(\d+)$/)
  if (passingMatch) return `Passing Before Period ${passingMatch[1]}`

  const periodNames: Record<string, string> = {
    beforeSchool: "Before School",
    afterSchool: "After School",
    break: "Break",
    lunch: "Lunch",
    noSchool: translate("noSchool", language),
  }

  return (
    periodNames[name] ??
    name
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/(\D)(\d+)/g, "$1 $2")
      .replace(/\b\w/g, (letter) => letter.toUpperCase())
  )
}
