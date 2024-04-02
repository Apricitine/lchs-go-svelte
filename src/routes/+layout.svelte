<script lang="ts">
  import Footer from "$lib/components/Footer.svelte"
  import Nav from "$lib/components/Nav.svelte"
  import { settings } from "$lib/settings"
  import { themes } from "$lib/themes"
  import { onMount } from "svelte"
  import { writable } from "svelte/store"

  let timeUntilNext = "[timeUntilNext]"
  let themeStyles = writable("")

  function applyTheme(): string {
    console.log(
      "Applying theme",
      themes[$settings.theme][0],
      themes[$settings.theme][1]
    )
    return `background: linear-gradient(to bottom, ${themes[$settings.theme][0]}, ${themes[$settings.theme][1]})`
  }

  $: $settings, ($themeStyles = applyTheme())

  onMount(() => {
    $themeStyles = applyTheme()
  })
</script>

<svelte:head>
  <title>{timeUntilNext} | LCHS Go</title>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta
    name="description"
    content="LCHS Go - Keep track of your time in class with one app"
  />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Niramit:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,200;1,300;1,400;1,500;1,600;1,700&display=swap"
    rel="stylesheet"
  />
  <link rel="apple-touch-icon" href="/whiteFavicon.png" />
  <link rel="icon" type="image/x-icon" href="/clearFavicon.png" />
  <style>
    *,
    *::before,
    *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      color: inherit;
      font: inherit;
    }
  </style>
</svelte:head>

<main>
  <Nav />
  <div class="slot">
    <slot />
  </div>
  <div class="background" style={$themeStyles} />
  <Footer />
</main>

<style lang="scss">
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: inherit;
    font-family: inherit;
  }

  main {
    font-family: "Niramit", sans-serif;
    color: #fff;
  }

  .background {
    position: fixed;
    z-index: -1;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-size: 400% 400%;
    animation: animated-background 20s ease infinite;
    transition: all 1s ease-in;
  }

  @keyframes animated-background {
    0% {
      background-position: 50% 0%;
    }

    50% {
      background-position: 51% 100%;
    }

    100% {
      background-position: 50% 0%;
    }
  }

  div.slot {
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
