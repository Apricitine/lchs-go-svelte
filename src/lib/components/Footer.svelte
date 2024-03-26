<script lang="ts">
  import { translate } from "$lib/translate"
  import { settings } from "$lib/settings"
</script>

<footer>
  <span> {translate("footerMessage", $settings.language)} </span>
  <span>
    <a href="https://forms.gle/BgFW4MgL9RGpezdw7" target="_blank">
      {translate("footerBugReport", $settings.language)}
    </a>
  </span>
  <span>
    <a
      href="https://chromewebstore.google.com/detail/lchs-go/bddnpkadgjcbafnmbampfbaiijafealk"
      target="_blank"
    >
    {translate("footerInstallExtension", $settings.language)}
    </a>
  </span>
</footer>

<style lang="scss">
  footer {
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    font-size: 62.5%;
    font-weight: normal;
    padding: 4% 0 4% 0;
  }
</style>
