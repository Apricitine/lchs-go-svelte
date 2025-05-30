<script lang="ts">
  import dayjs from "dayjs"

  export let circleProgress: number

  export let now: string

</script>

<div class="progress">
  <div class="circle"></div>
  <div class="bar"></div>
  <div class="circle"></div>
  <div class="tracker" style="top: {circleProgress}%">
    <span>{now[0] === "0" ? now.slice(1) : now}</span>
  </div>
</div>

<style lang="scss">
  $circle-width: 1.25rem;
  $clear-gray: hsla(0, 0%, 0%, 0.25);
  $clear-white: hsla(0, 0%, 100%, 0.5);

  .progress {
    display: flex;
    width: 15%;
    height: 52.5vh;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;

    .circle {
      width: $circle-width;
      height: $circle-width * 1.16;
      border-style: solid;
      border-width: 2px;
      border-radius: 50% 50% 50% 50%;
      border-color: $clear-white;
    }

    .bar {
      width: 1px;
      height: 100%;
      border-color: $clear-white;
      border-style: solid;
      border-width: 1px;
    }

    .tracker {
      display: grid;
      place-content: center;
      border-radius: 50%;
      background-color: $clear-gray;
      width: 35px;
      height: 35px;
      position: absolute;
      backdrop-filter: blur(4px);

      span {
        font-size: 11.5px;
        font-weight: 300;
      }
    }
  }
</style>
