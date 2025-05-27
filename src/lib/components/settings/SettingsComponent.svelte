<script lang="ts">
  import { translate } from "$lib/translate"
  import { settings, updateSetting, type Settings } from "$lib/settings"
  import { themes } from "$lib/themes"

  type FunctionOptionAs<T extends (...args: any) => any> = (
    option: (typeof options)[0]
  ) => Parameters<T>[1]

  export let shouldReload: boolean
  export let name: keyof Settings
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

  let selection = $settings[name]
</script>

<section>
  <h2>{title} <span>- {description}</span></h2>
  {#if type === "dropdown"}
    <select
      bind:value={selection}
      on:change={() => {
        updateSetting(name, selection)
        if (shouldReload) location.reload()
      }}
    >
      {#each options as option}
        <option value={option}
          >{translate(getOptionAsTranslate(option), $settings.language)}</option
        >
      {/each}
    </select>
  {:else}
    <span>
      {#each options as option}
        <button
          style={$settings[name] === getOptionAsUpdateSetting(option)
            ? "background: hsla(0, 0%, 0%, 0.125)"
            : ""}
          on:click={() => {
            updateSetting(name, getOptionAsUpdateSetting(option))
            if (shouldReload) location.reload()
          }}
          >{translate(getOptionAsTranslate(option), $settings.language)}</button
        >
      {/each}
    </span>
  {/if}
</section>

<style lang="scss">
  section {
    background-color: hsla(0, 0%, 0%, 0.25);
    padding: 1rem;
    border-radius: 4px;
    margin-bottom: 0.5rem;
    width: 100%;

    select {
      padding: 0.75rem;
      background: hsla(0, 0%, 0%, 0.125);
      border: none;
      appearance: none;
      border-radius: 2px;
      outline: none;
      
      &:hover {
        cursor: pointer;
      }

      option {
        border-radius: 2px;
      }
    }

    span:nth-child(2) {
      background: hsla(0, 0%, 0%, 0.125);
      display: inline-block;
      padding: 0.5rem;
      border-radius: 2px;

      button {
        background: 0;
        padding: 0.5rem;
        border: none;
        transition: all 100ms ease-in-out;
        border-radius: 2px;

        &:not(:first-of-type) {
          margin-left: 0.5rem;
        }

        &:hover {
          background: hsla(0, 0%, 0%, 0.125);
          cursor: pointer;
        }
      }
    }
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
