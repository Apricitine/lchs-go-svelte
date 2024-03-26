<script lang="ts">
  import { translate } from "$lib/translate"
  import { settings, updateSetting } from "$lib/settings"
  import { derived } from "svelte/store"

  export let title: string
  export let description: string
  export let type: "dropdown" | "options" 
  export let options: any[]

</script>

<section>
  <h2>{title} <span>- {description}</span></h2>
  {#if type === "dropdown"}
    <select>
      {#each options as option}
        <option on:click={()=>{}}>{translate(option, $settings.language)}</option>
      {/each}
    </select>
  {:else}
    {#each options as option}
      <button on:click={() => updateSetting("theme", option)}
        >{translate(option, $settings.language)}</button
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
