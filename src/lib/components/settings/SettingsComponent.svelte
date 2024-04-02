<script lang="ts">
  import { translate } from "$lib/translate"
  import { settings, updateSetting } from "$lib/settings"
  import { themes } from "$lib/themes"

  type FunctionOptionAs<T extends (...args: any) => any> = (
    option: (typeof options)[0]
  ) => Parameters<T>[1]

  export let title: string
  export let description: string
  export let type: "dropdown" | "options"
  export let options: (
    | Parameters<typeof translate>[1]
    | Parameters<typeof updateSetting>[1]
  )[]

  /*  these methods are necessary to make <options> at least somewhat 
  type-safe, as "as" notation along with all typescript notation is 
  not allowed inside Svelte component markup */
  const getOptionAsTranslate: FunctionOptionAs<typeof translate> = (
    option: (typeof options)[0]
  ) => option as Parameters<typeof translate>[1]
  const getOptionAsUpdateSetting: FunctionOptionAs<typeof updateSetting> = (
    option: (typeof options)[0]
  ) => option as Parameters<typeof updateSetting>[1]

</script>

<section>
  <h2>{title} <span>- {description}</span></h2>
  {#if type === "dropdown"}
    <select>
      {#each options as option}
        <option
          on:click={() =>
            updateSetting("language", getOptionAsUpdateSetting(option))}
          >{translate(getOptionAsTranslate(option), $settings.language)}</option
        >
      {/each}
    </select>
  {:else}
    {#each options as option}
      <button
        on:click={() =>
          updateSetting("theme", getOptionAsUpdateSetting(option))}
        >{translate(getOptionAsTranslate(option), $settings.language)}</button
      >
    {/each}
  {/if}
</section>

<style lang="scss">
  section {
    background-color: hsla(0, 0%, 0%, 0.25);
    padding: 1rem;
    border-radius: 4px;
    margin-bottom: 0.5rem;
    width: 100%;
  }
  h2 {
    font-size: 1.24rem;
    font-weight: bold;

    span {
      font-size: 1rem;
      font-weight: normal;
    }
  }
</style>
