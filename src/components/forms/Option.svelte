<script lang="ts">
  export let value: string = null;
  export let label: string;
  export let element = null;
</script>

<label class="block text-gray-700 text-sm font-bold mb-2" for="option">
  {label}
</label>
<select
  bind:value
  bind:this={element}
  class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
  id="option"
>
  <slot />
</select>
