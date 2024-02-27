import type { Languages } from "$lib/translate"
import { writable, type Writable } from "svelte/store"
import { browser } from "$app/environment"

export interface Settings {
  language: Languages
}

const defaultSettings = {
  language: "english" as const,
}

export const getSettings = () => {
  let settings: typeof defaultSettings
  let settingsExist = localStorage.getItem("settings") as string
  if (settingsExist == null) {
    settings = defaultSettings
    localStorage.setItem("settings", JSON.stringify(settings))
    console.log("Existing settings not found, created new settings")
  } else settings = JSON.parse(localStorage.getItem("settings") as string)
  return settings as Settings
}
