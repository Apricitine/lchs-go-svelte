<script>
  import { page } from "$app/stores"
  import routes from "$lib/routes"
  import { translate } from "$lib/translate"
</script>

<header>
  <nav>
    {#each routes as route}
      <a
        href={route.name === "home" ? "/" : route.name}
        class={($page.url.pathname.length === 1
          ? "home"
          : $page.url.pathname.slice(1)) === `${route.name}`
          ? "selected"
          : ""}>{translate(route.name, "english")}</a
      >
    {/each}
  </nav>
</header>

<style lang="scss">
  header {
    padding: 4% 2% 4% 2%;
    display: grid;
    place-content: center;

    nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 25em;

      a {
        padding: 0.5em;
        text-decoration: none;
        transition: all 100ms ease-in-out;
        border-radius: 2px;
        font-size: 14px;
        font-weight: 300;
        letter-spacing: 1px;
        text-transform: uppercase;
        cursor: pointer;

        &:hover {
          background-color: rgba(0, 0, 0, 0.15);
        }
      }
    }
  }

  .selected {
    background-color: rgba(0, 0, 0, 0.25);
  }
</style>
