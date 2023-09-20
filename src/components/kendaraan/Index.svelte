<script lang="ts">
  import { onMount } from "svelte";
  import type { KendaraanParkiran } from "../../lib/data";
  import { pageMode, editId } from "../../stores";
  import { getData, deleteById } from "../../lib/data";
  import ModalQr from "./ModalQr.svelte";
  import Button from "../forms/Button.svelte";
  type State = "index" | "edit" | "insert" | "delete" | "report";
  let ready = false;
  let result: KendaraanParkiran[];
  let isModalOpen = false;
  let value;
  onMount(async () => {
    result = await getData("kendaraan");

    ready = true;
  });

  async function deleteData(id: number) {
    const ok = confirm(
      "Yakin ingin menghapus? Konten yang hilang tidak dapat kembali"
    );
    if (!ok) return;
    deleteById("kendaraan", id);
    result = await getData("kendaraan");
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

  function toggleModal() {
    isModalOpen = !isModalOpen;
  }

  function showQr(id_kendaraan: string) {
    value = id_kendaraan;
    toggleModal();
  }

  function exportData() {
    changeState("report");
  }
</script>

{#if isModalOpen}
  <ModalQr {value}>
    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      on:click={toggleModal}>Close</button
    >
  </ModalQr>
{/if}

<Button color="green" label="export" on:click={exportData} />
<section class="container mx-auto my-8">
  <h2 class="text-2xl font-semibold mb-4 text-center">Tabel Kendaraan</h2>

  <table class="w-full border">
    <thead>
      <tr class="bg-gray-100">
        <th class="border px-4 py-2">ID</th>
        <th class="border px-4 py-2">Plat Nomor</th>
        <th class="border px-4 py-2">Jenis Kendaraan</th>
        <th class="border px-5 py-2">Atas Nama</th>
        <th>Aksi</th>
      </tr>
    </thead>
    <tbody>
      {#if !ready}
        <p>Loading...</p>
      {/if}
      {#if ready}
        {#each result as kendaraan}
          <tr>
            <td class="border px-4 py-2">{kendaraan.id}</td>
            <td class="border px-4 py-2">{kendaraan.platNomor}</td>
            <td class="border px-4 py-2">{kendaraan.jenisKendaraan}</td>
            <td class="border px-4 py-2">{kendaraan.atasNama}</td>
            <td class="border px-4 py-2">
              <button
                class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                on:click={() => deleteData(kendaraan.id)}>Delete</button
              >
              <button
                class="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-700"
                on:click={() => goToEdit(kendaraan.id)}
              >
                Update</button
              >
              <button
                class="bg-cyan-500 text-white px-2 py-1 rounded hover:bg-cyan-700"
                on:click={() => showQr(kendaraan.id.toString())}
              >
                QrCode</button
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
      on:click={() => changeState("insert")}>Tambahkan Kendaraan</button
    >
  </div>
</section>
