<script lang="ts">
  import html2pdf from "html2pdf.js";
  import Button from "./Button.svelte";
  import { onMount } from "svelte";
  import { getData } from "../../lib/data";
  export let table: string;
  let printTarget;
  let data: any;
  let ready = false;
  onMount(async () => {
    data = await getData(table as any);

    ready = true;
  });

  async function download() {
    html2pdf().from(printTarget).save();
  }
</script>

<Button on:click={download} color={"green"} label="Download" />
<div class="bg-gray-100 p-6 w-screen" bind:this={printTarget}>
  <div class="bg-white shadow-md rounded-lg overflow-hidden">
    <table class="w-full whitespace-no-wrap">
      <thead>
        {#if ready}
          <tr class="text-left font-semibold bg-gray-200">
            {#each Object.entries(data[0]) as [key, _]}
              <th class="py-3 px-4">{key}</th>
            {/each}
          </tr>
        {/if}
      </thead>
      <tbody>
        {#if ready}
          {#each data as data}
            <tr class="hover:bg-gray-100">
              {#each Object.entries(data) as [_, value]}
                <td class="py-3 px-4">{value}</td>
              {/each}
            </tr>
          {/each}
        {/if}

        <!-- Add more rows as needed with alternating colors -->
      </tbody>
    </table>
  </div>
</div>
