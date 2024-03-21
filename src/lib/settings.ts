import type { Languages } from "$lib/translate"
import { writable, type Writable } from "svelte/store"
import { browser } from "$app/environment"

export interface Settings {
  version: number
  language: Languages
}

const defaultSettings: Settings = {
  version: 0,
  language: "english" as const,
}

const stored: string = browser
  ? localStorage.getItem("settings") ?? JSON.stringify(defaultSettings)
  : JSON.stringify(defaultSettings)

export const settings: Writable<typeof defaultSettings> = writable(JSON.parse(stored))
settings.subscribe((value) => {
  if (browser) localStorage.setItem("settings", JSON.stringify(value))
})

/**
 * updates a user's setting
 * @param setting the setting you want to update. must be in the Settings type
 * @param value the value you want the new type to have
 */
export function updateSetting(setting: keyof Settings, value: any) {
  ;(settings as Writable<Settings>).update((currentValue: Settings) => {
    return {
      ...currentValue,
      [setting]: value.toString,
    }
  })
}
