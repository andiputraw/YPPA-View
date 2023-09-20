<script lang="ts">
  import { onMount } from "svelte";
  import type { PelangganParkiran } from "../../lib/data";
  import { pageMode, editId } from "../../stores";
  import { deleteById, getData } from "../../lib/data";
  import Button from "../forms/Button.svelte";

  type State = "index" | "edit" | "insert" | "delete" | "report";
  let ready = false;
  let result: PelangganParkiran[];
  onMount(async () => {
    result = await getData("pelanggan");
    ready = true;
  });

  async function deleteData(id: number) {
    const ok = confirm(
      "Yakin ingin menghapus? Konten yang hilang tidak dapat kembali"
    );
    if (!ok) return;
    deleteById("pelanggan", id);
    result = await getData("pelanggan");
    ready = true;
  }

  function changeState(state: State) {
    pageMode.update((_) => state);
  }
  function setEditId(id: number) {
    editId.set(id);
  }
  function goToEdit(id: number) {
    setEditId(id);
    changeState("edit");
  }
</script>

<Button on:click={() => changeState("report")} color="green" label="Export" />
<section class="container mx-auto my-8">
  <h2 class="text-2xl font-semibold mb-4 text-center">Tabel Pelanggan</h2>

  <table class="w-full border">
    <thead>
      <tr class="bg-gray-100">
        <th class="border px-4 py-2">ID</th>
        <th class="border px-4 py-2">Nama</th>
        <th class="border px-4 py-2">Telepon</th>
        <th class="border px-4 py-2">Keanggotaan</th>
        <th>Aksi</th>
      </tr>
    </thead>
    <tbody>
      {#if !ready}
        <p>Loading...</p>
      {/if}
      {#if ready}
        {#each result as pelanggan}
          <tr>
            <td class="border px-4 py-2">{pelanggan.id}</td>
            <td class="border px-4 py-2">{pelanggan.nama}</td>
            <td class="border px-4 py-2">{pelanggan.telepon}</td>
            <td class="border px-4 py-2">{pelanggan.keanggotaan}</td>
            <td class="border px-4 py-2">
              <button
                class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                on:click={() => deleteData(pelanggan.id)}>Delete</button
              >
              <button
                class="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-700"
                on:click={() => goToEdit(pelanggan.id)}>Update</button
              >
            </td>
          </tr>
        {/each}
      {/if}
    </tbody>
  </table>

  <div class="flex items-center mt-4">
    <button
      class="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-700"
      on:click={() => changeState("insert")}>Tambahkan Pelanggan</button
    >
  </div>
</section>
