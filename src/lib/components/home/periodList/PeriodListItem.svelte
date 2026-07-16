<script lang="ts">
  let {
    name,
    start,
    end,
    current = false,
  }: {
    name: string
    start: string
    end: string
    current?: boolean
  } = $props()
</script>

<li class="period-list-item" class:current aria-current={current ? "time" : undefined}>
  <span class="period-name">{name}</span>
  <span class="period-time">{start} - {end}</span>
</li>

<style lang="scss">
  .period-list-item {
    --row-alpha: 0.12;

    display: grid;
    grid-template-columns: minmax(0, 1fr) max-content;
    align-items: center;
    height: 3.45rem;
    min-height: 3.45rem;
    padding: 0 0.85rem;
    background-color: hsla(0, 0%, 100%, var(--row-alpha));
    transition: background-color 150ms ease;

    &:nth-child(even) {
      --row-alpha: 0.18;
    }

    &.current {
      --row-alpha: 0.28;
    }
  }

  .period-name {
    min-width: 0;
    overflow: hidden;
    font-size: 0.95rem;
    font-weight: 700;
    line-height: 1.1;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .period-time {
    padding-left: 0.85rem;
    font-size: 0.84rem;
    line-height: 1;
    opacity: 0.88;
    text-align: right;
    white-space: nowrap;
  }

  @media (max-width: 420px) {
    .period-list-item {
      grid-template-columns: 1fr;
      align-content: center;
    }

    .period-time {
      padding-left: 0;
      padding-top: 0.25rem;
      text-align: left;
    }
  }
</style>
