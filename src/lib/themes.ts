type Theme = { name: string, colors: [string, string] }

export const themes = {
  softBlue: {
    name: "Soft Blue",
    colors: ["#4A7CF4", "#4FC3F7"],
  },
  scarletSunrise: {
    name: "Scarlet Sunrise",
    colors: ["#F43F5E", "#FB8C00"],
  },
} satisfies { [key: string]: Theme }