<script lang="ts">
  import { pageMode, editId } from "../../stores";
  import Insert from "./Insert.svelte";
  import Index from "./Index.svelte";
  import Edit from "./Edit.svelte";
  import { onMount } from "svelte";
  import Report from "../forms/Report.svelte";
  let pageMode_value: string;
  let editId_value: number;

  pageMode.subscribe((value) => {
    pageMode_value = value;
  });
  editId.subscribe((v) => {
    editId_value = v;
  });
</script>

{#if pageMode_value === "index"}
  <Index />
{/if}

{#if pageMode_value === "insert"}
  <Insert />
{/if}

{#if pageMode_value === "edit"}
  <Edit id={editId_value} />
{/if}

{#if pageMode_value === "report"}
  <Report table="transaksi" />
{/if}
