export const languages = {
  english: {
    home: "Home",
    calendar: "Calendar",
    settings: "Settings",
    credits: "Credits",
    greeting1: "Good {timeOfDay}! Today is the {schedule}.",
    greeting2: "Hi, it's the {timeOfDay} right now. We have the {schedule} today.",
    greeting3: "Hey, we're in the {timeOfDay}! Today is {schedule}.",
    morning: "Morning",
    afternoon: "Afternoon",
    evening: "Evening",
    theme: "Theme",
    themeDescription: "The background theme of the app",
    language: "Language",
    languageDescription: "The background theme of the app",
    footerMessage: "Made with ❤️ by the LCiTeam",
    footerBugReport: "Report a bug",
    footerInstallExtension: "Install the extension",
    softBlue: "Soft Blue",
    scarletSunrise: "Scarlet Sunrise",
    english: "English",
    goofy: "Goofy",
  },
  goofy: {
    home: "hom",
    calendar: "cawender",
    settings: "opshins",
    credits: "who did dis?",
    greeting1: "haiiii! itz {schedule}.",
    greeting2: "haiiii! itz {schedule}.",
    greeting3: "haiiii! itz {schedule}.",
    morning: "mornin",
    afternoon: "midday",
    evening: "nite",
    theme: "Theme",
    themeDescription: "oooo pwetty cowors~",
    language: "lanwaj",
    languageDescription: "I will exterminate you if you change this.",
    footerMessage: "wuv u all ❤️ - lciteam",
    footerBugReport: "uh oh buggies",
    footerInstallExtension: "dowload ekstenshun",
    softBlue: "blew uwu",
    scarletSunrise: "oooo soo pwety",
    english: "ewww language",
    goofy: "DA BEST",
  },
} as const

export const translate = (
  thingToTranslate: keyof typeof languages.english,
  language: keyof typeof languages
) => {
  return languages[language][thingToTranslate]
}

export const interpolateTranslation = (
  template: string,
  strings: Record<string, string>
): string => {
  for (const [key, value] of Object.entries(strings)) {
    const placeholder = new RegExp(`{${key}}`, "g")
    template = template.replace(placeholder, String(value))
  }
  return template
}

export type Languages = keyof typeof languages