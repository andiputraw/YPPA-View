<script lang="ts">
  import { pageMode } from "../../stores";
  import { getData, insertToTable } from "../../lib/data";
  import type { PelangganParkiran } from "../../lib/data";
  import Input from "../forms/Input.svelte";
  import Option from "../forms/Option.svelte";
  import Button from "../forms/Button.svelte";
  import { onMount } from "svelte";
  type State = "index" | "edit" | "insert" | "delete";
  let platNomor: string;
  let jenisKendaraan: string;
  let id_pelanggan: string;
  let ready = false;
  let dataPelanggan: PelangganParkiran[];
  let elementPlatnomor;
  onMount(async () => {
    dataPelanggan = await getData("pelanggan");
    id_pelanggan = dataPelanggan[0].id;
    ready = true;
  });

  async function insertData() {
    (id_pelanggan as any) = parseInt(id_pelanggan);
    console.log({ platNomor, jenisKendaraan, id_pelanggan });
    insertToTable("kendaraan", { platNomor, jenisKendaraan, id_pelanggan });
    changeState("index");
  }

  function changeState(state: State) {
    pageMode.update((_) => state);
  }
</script>

<section
  class="flex flex-col justify-start items-center container mx-auto mt-8"
>
  <h2 class="text-2xl font-semibold mb-4">Input Data Kendaraan Baru</h2>
  <div class="w-full max-w-md">
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <Input
          label="Plat Nomor"
          placeholder="B 4920 ID"
          bind:value={platNomor}
          bind:element={elementPlatnomor}
        />
      </div>
      <div class="mb-4">
        <Option label="Jenis Kendaraan" bind:value={jenisKendaraan}>
          <option value="Motor">Motor</option>
          <option value="Mobil">Mobil</option>
        </Option>
      </div>
      <div class="mb-4">
        <Option label="Pelanggan" bind:value={id_pelanggan}>
          <option value="" disabled>--Pilih Pelanggan--</option>
          {#if ready}
            {#each dataPelanggan as pelanggan}
              <option value={pelanggan.id} selected={pelanggan.id == 1}
                >{pelanggan.nama}</option
              >
            {/each}
          {/if}
        </Option>
      </div>
      <div class="flex items-center justify-center">
        <Button on:click={insertData} color="blue" label="Submit" />
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
