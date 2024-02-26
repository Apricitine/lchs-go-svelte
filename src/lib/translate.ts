const languages = {
  english: {
    home: "Home",
    calendar: "Calendar",
    settings: "Settings",
    credits: "Credits",
    greeting1: "Good {timeOfDay}! Today is {schedule}.",
  },
  goofy: {
    home: "hom",
    calendar: "cawender",
    settings: "opshins",
    credits: "who did dis?",
    greeting1: "haiiii! itz {schedule}.",
  },
} as const

export const translate = (
  thingToTranslate: keyof typeof languages.english,
  language: keyof typeof languages
) => {
  return languages[language][thingToTranslate]
}

export const interpolateTranslation = (
  receiver: string,
  strings: {
    [key: string]: string | undefined,
  }
) => {
  for (const string in strings) {
    if (strings[string] !== undefined)
      receiver.replace(`{${string}}`, strings[string] as string)
  }
  return receiver
}
