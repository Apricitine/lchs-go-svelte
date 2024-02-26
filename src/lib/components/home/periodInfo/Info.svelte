<script lang="ts">
  

  let periodStart = "[periodStart]"
  let periodEnd = "[periodEnd]"
  let periodName = "[periodName]"
  let timeLeft = "[timeLeft]"
  let percentCompleted = "[percentCompleted]"
</script>

<main class="info">
  <span class="period-start-end">{periodStart}</span>
  <div class="time-left">
    <div class="divider top"></div>
    <div class="info">
      <span class="period-name">{periodName}</span>
      <span class="time-left">
        <div class="wrapper">
          <span class="number">{timeLeft}</span> mins. <br /> until period ends
        </div>
      </span>
      <span class="percent-completed">({percentCompleted}% completed)</span>
    </div>
    <div class="divider bottom"></div>
  </div>
  <span class="period-start-end">{periodEnd}</span>
</main>

<style lang="scss">
  $clear-gray: hsla(0, 0, 0, 0.25);
  $clear-white: hsla(0, 0, 100%, 0.5);

  .info {
    width: 100%;
    display: flex;
    flex-direction: column;

    .period-start-end {
      height: 20%;
      padding: 5%;
      font-size: 4vh;
      font-weight: 600;
      text-align: center;
      letter-spacing: 2px;
    }

    .time-left {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      height: 60%;

      .info {
        height: 98%;
        padding: 5%;

        span {
          text-align: center;

          &.period-name {
            font-size: 4vh;
            font-weight: 600;
          }

          &.time-left {
            display: grid;
            place-items: center;
            text-align: center;

            .wrapper {
              .number {
                font-size: 4vh;
                font-weight: 600;
              }
            }
          }
        }
      }

      .divider {
        height: 1%;
        width: 50%;

        &.bottom {
          border-top: 2px solid $clear-white;
        }
        &.top {
          border-bottom: 2px solid $clear-white;
        }
      }
    }
  }
</style>
