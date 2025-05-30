import type { Languages } from "$lib/translate"
import { themes } from "$lib/themes"
import { writable, type Writable } from "svelte/store"
import { browser } from "$app/environment"

export interface Settings {
  version: number
  language: Languages
  theme: keyof typeof themes
  grade: "7" | "8" | "9" | "10" | "11" | "12"
}

const defaultSettings: Settings = {
  version: 2,
  language: "english",
  theme: "softBlue",
  grade: "9"
}

const stored: string = browser
  ? localStorage.getItem("settings") ?? JSON.stringify(defaultSettings)
  : JSON.stringify(defaultSettings)

let storedSettings: Settings =
  defaultSettings.version > (JSON.parse(stored) as Settings).version
    ? {
        ...(JSON.parse(stored) as Settings),
        ...defaultSettings,
        version: defaultSettings.version,
      }
    : JSON.parse(stored)

export const settings: Writable<typeof defaultSettings> =
  writable(storedSettings)
settings.subscribe((value) => {
  if (browser) localStorage.setItem("settings", JSON.stringify(value))
  console.group("Value of settings store changed to:", value)
  console.groupEnd()
})

/**
 * updates a user's setting
 * @param setting the setting you want to update. must be in the Settings type
 * @param value the value you want the new type to have
 */
export function updateSetting<T extends Settings, K extends keyof T>(
  setting: keyof Settings,
  value: Settings[keyof Settings]
): void {
  if (typeof value !== typeof defaultSettings[setting])
    throw new Error(
      `TypeError: type mismatch between value and setting at updateSetting(): between ${typeof value} and ${typeof defaultSettings[setting]}`
    )
  ;(settings as Writable<Settings>).update((currentValue: Settings) => {
    return {
      ...currentValue,
      [setting.toLowerCase()]: (value as string).toString(),
    }
  })
}