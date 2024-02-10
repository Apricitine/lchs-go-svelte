import { LanguageServiceMode } from "typescript"


const languages = {
  english: {
    HOME: "Home",
    CALENDAR: "Calendar",
  },
  spanish: {
    HOME: "Casa",
    CALENDAR: "Calendario",
  },
} as const

export const translate = (
  thingToTranslate: keyof typeof languages.english,
  language: keyof typeof languages
) => {
  return languages[language][thingToTranslate]
}
