<script lang="ts">
  import { createEventDispatcher } from "svelte";
  export let label: string;
  export let color: string;
  const dispatch = createEventDispatcher();

  function onClick() {
    dispatch("click");
  }
</script>

<button
  on:click={onClick}
  class="bg-{color}-500 text-white py-2 px-4 rounded hover:bg-{color}-700 focus:outline-none focus:shadow-outline"
  type="button"
>
  {label}
</button>
