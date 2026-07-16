
<script lang="ts">
    import { translate } from "$lib/translate";
    import { type Days } from "$lib/time";
    let {
        scheduletype,
        date,
    }: {
        scheduletype: Days
        date: string

    } = $props();


</script>

<div class="calendar-day-wrap">
    <div class="calendar-box">
        <div class="cd-number"> { date } </div>
        <div class="cd-tag"> { scheduletype } </div>
    </div>
</div>


<!-- Steps:
 1. set dates on box
 2. make it say what type of day it is
 3. make it modal on click
 4. modal should display the schedule on that specific day -->