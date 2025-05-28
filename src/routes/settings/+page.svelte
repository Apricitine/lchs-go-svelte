<script lang="ts">
  import SettingsComponent from "$lib/components/settings/SettingsComponent.svelte"
  import { updateSetting, type Settings } from "$lib/settings"
  import { translate } from "$lib/translate"
  import { settings } from "$lib/settings"

  export const settingsList: {
    [key in keyof Omit<Settings, "version">]: {
      title: ReturnType<typeof translate>
      description: ReturnType<typeof translate>
      type: "dropdown" | "options"
      options: (
        | Parameters<typeof translate>[1]
        | Parameters<typeof updateSetting>[1]
      )[]
      shouldReload: boolean
    }
  } = {
    theme: {
      title: translate("theme", $settings.language),
      description: translate("themeDescription", $settings.language),
      type: "dropdown",
      options: ["softBlue", "scarletSunrise", "forestGreen"],
      shouldReload: false
    },
    language: {
      title: translate("language", $settings.language),
      description: translate("languageDescription", $settings.language),
      type: "options",
      options: ["english", "goofy"],
      shouldReload: true
    },
    grade: {
      title: translate("grade", $settings.language),
      description: translate("gradeDescription", $settings.language),
      type: "dropdown",
      options: ["7", "8", "9", "10", "11", "12"],
      shouldReload: false
    },
  }

function getKeyAsUpdateSetting(key: string) {
  return key as keyof Settings
}
</script>

<main>
  {#each Object.entries(settingsList) as [key, setting]}
    <SettingsComponent
      name={getKeyAsUpdateSetting(key)}
      title={setting.title}
      description={setting.description}
      type={setting.type}
      options={setting.options}
      shouldReload={setting.shouldReload}
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
