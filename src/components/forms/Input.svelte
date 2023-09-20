<script lang="ts">
  export let label: string;
  export let placeholder: string | null;
  export let value: string = null;
  export let element = null;
</script>

<label class="block text-gray-700 text-sm font-bold mb-2" for="input">
  {label}
</label>
<input
  bind:value
  bind:this={element}
  class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
  id="input"
  type="text"
  placeholder={placeholder || ""}
/>
