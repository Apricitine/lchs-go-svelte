<script lang="ts">
  import { page } from "$app/stores"
</script>

<h1>
  Something is broken :( <br>
  If you're a developer, you suck. <br>
  <section>
    error code: {$page.status} <br>
    error message: {$page.error?.message}
  </section>
</h1>

<style lang="scss">
  $clear-gray: hsla(0, 0%, 0%, 0.25);

  h1 {
    text-align: center;

    section {
      background-color: $clear-gray;
    }
  }
</style>