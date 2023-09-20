<script lang="ts">
  import { onMount } from "svelte";
  import type { TransaksiParkiran } from "../../lib/data";
  import { pageMode, editId } from "../../stores";
  import { deleteById, getData, updateStatusTransaksi } from "../../lib/data";
  import ModalScan from "./ModalScan.svelte";
  import Button from "../forms/Button.svelte";
  type State = "index" | "edit" | "insert" | "delete" | "report";
  let ready = false;
  let result: TransaksiParkiran[];
  let isModal = false;

  onMount(async () => {
    result = await getData("transaksi");
    ready = true;
  });

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
    isModal = !isModal;
  }
  async function ubahStatus(id_transaksi: string) {
    updateStatusTransaksi(id_transaksi);
    result = await getData("transaksi");
    ready = true;
  }
  async function deleteData(id: number) {
    const ok = confirm(
      "Yakin ingin menghapus? Konten yang hilang tidak dapat kembali"
    );
    if (!ok) return;
    deleteById("transaksi", id);
    result = await getData("transaksi");
    ready = true;
  }
</script>

{#if isModal}
  <ModalScan {toggleModal}>
    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      on:click={toggleModal}>Close</button
    >
  </ModalScan>
{/if}
<Button on:click={() => changeState("report")} color="green" label="Export" />

<section class="container mx-auto my-8">
  <h2 class="text-2xl font-semibold mb-4 text-center">Tabel Transaksi</h2>
  <button
    on:click={toggleModal}
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
    >Scan Qr</button
  >

  <table class="w-full border">
    <thead>
      <tr class="bg-gray-100">
        <th class="border px-4 py-2">ID</th>
        <th class="border px-4 py-2">Jenis Kendaran</th>
        <th class="border px-4 py-2">Plat Nomor</th>
        <th class="border px-4 py-2">Status</th>
        <th class="border px-4 py-2">Tarif</th>
        <th class="border px-4 py-2">Mulai</th>
        <th class="border px-4 py-2">Beres</th>
        <th>Aksi</th>
      </tr>
    </thead>
    <tbody>
      {#if !ready}
        <p>Loading...</p>
      {/if}
      {#if ready}
        {#each result as transaksi}
          <tr>
            <td class="border px-4 py-2">{transaksi.id}</td>
            <td class="border px-4 py-2">{transaksi.jenisKendaraan}</td>
            <td class="border px-4 py-2">{transaksi.platNomor}</td>
            <td class="border px-4 py-2">{transaksi.status}</td>
            <td class="border px-4 py-2">{transaksi.tarif}</td>
            <td class="border px-4 py-2">{transaksi.mulai}</td>
            <td class="border px-4 py-2">{transaksi.beres}</td>
            <td class="border px-4 py-2">
              <button
                class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                on:click={() => deleteData(transaksi.id)}>Delete</button
              >
              <button
                class="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-700"
                on:click={() => goToEdit(transaksi.id)}
              >
                Update</button
              >
              {#if transaksi.status != "Beres"}
                <button
                  class="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
                  on:click={() => ubahStatus(transaksi.id.toString())}
                >
                  Ubah Status</button
                >
              {/if}
            </td>
          </tr>
        {/each}
      {/if}
    </tbody>
  </table>

  <div class="flex items-center mt-4">
    <button
      class="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-700"
      on:click={() => changeState("insert")}>Tambahkan Transaksi</button
    >
  </div>
</section>
