<script lang="ts">
  import { onMount } from "svelte";
  import { pageMode } from "../../stores";
  import { getData } from "../../lib/data";
  import type { KendaraanParkiran, PelangganParkiran } from "../../lib/data";
  import Option from "../forms/Option.svelte";
  type State = "index" | "edit" | "insert" | "delete";
  let ready = false;
  let listKendaraan: KendaraanParkiran[];
  let listPelanggan: PelangganParkiran[];
  let input = {
    kendaraan: null,
  };
  onMount(async () => {
    listKendaraan = await getData("kendaraan");
    listPelanggan = await getData("pelanggan");
    ready = true;
  });
  function changeState(state: State) {
    pageMode.update((_) => state);
  }
</script>

<section
  class="flex flex-col justify-start items-center container mx-auto mt-8"
>
  <h2 class="text-2xl font-semibold mb-4">Input Data Transaksi Baru</h2>
  <div class="w-full max-w-md">
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <Option bind:value={input.kendaraan} label="Kendaraan">
          {#if ready}
            {#each listKendaraan as kendaraan}
              <option value={kendaraan.id}>{kendaraan.platNomor}</option>
            {/each}
          {/if}
        </Option>
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="jenisKendaraan"
        >
          Pelanggan
        </label>
        <select
          class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="jenisKendaraan"
        >
          {#if ready}
            {#each listPelanggan as pelanggan}
              <option value={pelanggan.id}>{pelanggan.nama}</option>
            {/each}
          {/if}
        </select>
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="tarifMotor"
        >
          Tarif
        </label>
        <input
          class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="tarifMotor"
          type="text"
          placeholder="Rp"
        />
      </div>

      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="platNomor"
        >
          Plat Nomor
        </label>
        <input
          class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="platNomor"
          type="text"
          placeholder="B 1234 AB"
        />
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="kartuParkir"
        >
          Kartu Parkir
        </label>
        <select
          class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="kartuParkir"
        >
          <option value="Ya">Ya</option>
          <option value="Tidak">Tidak</option>
        </select>
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="pembayaranLangsung"
        >
          Pembayaran Langsung
        </label>
        <select
          class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="pembayaranLangsung"
        >
          <option value="Ya">Ya</option>
          <option value="Tidak">Tidak</option>
        </select>
      </div>
      <div class="flex items-center justify-center">
        <button
          class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
          type="button"
        >
          Submit
        </button>
        <button
          on:click={() => changeState("index")}
          class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
          type="button"
        >
          Kembali
        </button>
      </div>
    </form>
  </div>
</section>
