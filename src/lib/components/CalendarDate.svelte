
<script>
    import { translate } from "$lib/translate";
    function openModal() {
        // Open the modal here
    }
    let {
        schedule,
        date,
    }: {
        schedule: 

        }
    } = $props();


</script>

<button type="button" class="calendar-day-wrap" onclick = {openModal()}>
    <div class="calendar-box">
        <div class="cd-number"> { date.date() } </div>
        <div class="cd-tag"> { schedule.scheduleType } </div>
    </div>
</button>


<!-- Steps:
 1. set dates on box
 2. make it say what type of day it is
 3. make it modal on click
 4. modal should display the schedule on that specific day -->