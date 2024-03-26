<script lang="ts">
  import SettingsComponent from "$lib/components/settings/SettingsComponent.svelte"
  import type { Settings } from "$lib/settings"
  import { translate } from "$lib/translate"
  import { settings } from "$lib/settings"
  import { themes } from "$lib/themes"
  import { languages } from "$lib/translate"

  export const settingsList: {
    [key in keyof Omit<Settings, "version">]: {
      title: ReturnType<typeof translate>
      description: ReturnType<typeof translate>
      type: "dropdown" | "options"
      options: string[]
    }
  } = {
    theme: {
      title: translate("theme", $settings.language),
      description: translate("themeDescription", $settings.language),
      type: "options",
      options: ["softBlue", "scarletSunrise"],
    },
    language: {
      title: translate("language", $settings.language),
      description: translate("languageDescription", $settings.language),
      type: "dropdown",
      options: ["english", "goofy"],
    },
  }

  for (const thing of settingsList.language.options) {
    console.log(thing)
  }
</script>

<main>
  {#each Object.values(settingsList) as setting}
    <SettingsComponent
      title={setting.title}
      description={setting.description}
      type={setting.type}
      options={setting.options}
    />
  {/each}
</main>

<style lang="scss">
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 50%;
  }
</style>
