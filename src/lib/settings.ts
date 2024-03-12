import type { Languages } from "$lib/translate"
import { writable, type Writable } from "svelte/store"
import { browser } from "$app/environment"

export interface Settings {
  language: Languages
}

const defaultSettings = {
  language: "english" as const,
}

let stored: Storage[string] = browser
  ? localStorage.getItem("settings") ?? JSON.stringify(defaultSettings)
  : defaultSettings

export const settings: Writable<Settings> = writable(stored)
settings.subscribe((value) => {
  if (browser) localStorage.setItem("settings", value.toString())
})

function updateSetting(setting: keyof Settings, value: any) {
  ;(settings as Writable<Settings>).update((currentValue) => {
    return {
      currentValue,
      [setting]: value,
    }
  })
}
