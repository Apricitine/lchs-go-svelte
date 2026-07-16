this is the calendar page
<script lang="ts">
    import CalendarDate from "$lib/components/CalendarDate.svelte";
    import { type Days } from "$lib/time";
    import { translate } from "$lib/translate";

</script>

<CalendarDate scheduletype={"noSchool"} date={"2023-10-01"} />