<script lang="ts">
  import { onMount } from "svelte";
  import type { PelangganParkiran } from "../../lib/data";
  import { getDataById, updateTable, getData } from "../../lib/data";
  import { editId, pageMode } from "../../stores";
  import Input from "../forms/Input.svelte";
  import Option from "../forms/Option.svelte";
  import Button from "../forms/Button.svelte";
  export let id: number;
  let jenisKendaraan;
  let platNomor;
  let id_pelanggan;

  let input_this = {
    platNomor: null,
    jenisKendaraan: null,
    id_pelanggan: null,
  };

  let ready = false;
  let dataPelanggan: PelangganParkiran[];
  onMount(async () => {
    const kendaraan = await getDataById("kendaraan", id);
    jenisKendaraan = kendaraan.jenisKendaraan;
    platNomor = kendaraan.platNomor;
    input_this.platNomor.value = kendaraan.platNomor;
    input_this.jenisKendaraan.options[
      kendaraan.jenisKendaraan === "Motor" ? 0 : 1
    ].selected = true;
    dataPelanggan = await getData("pelanggan");
    id_pelanggan = dataPelanggan[0].id;
    ready = true;
    return () => {
      editId.set(0);
    };
  });

  async function insertData() {
    updateTable("kendaraan", { platNomor, jenisKendaraan, id_pelanggan }, id);
    changeState("index");
  }

  function changeState(state: "index" | "update" | "insert") {
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
          placeholder="B 1234 JS"
          bind:element={input_this.platNomor}
          bind:value={platNomor}
        />
        <div class="mb-4">
          <Option
            label="Jenis Kendaraan"
            bind:element={input_this.jenisKendaraan}
            bind:value={jenisKendaraan}
          >
            <option value="Motor">Motor</option>
            <option value="Mobil">Mobil</option>
          </Option>
        </div>
        <div class="mb-4">
          <Option
            label="Pelanggan"
            bind:value={id_pelanggan}
            bind:element={input_this.id_pelanggan}
          >
            {#if ready}
              {#each dataPelanggan as pelanggan}
                <option value={pelanggan.id}>{pelanggan.nama}</option>
              {/each}
            {/if}
          </Option>
        </div>
        <div class="flex items-center justify-center">
          <Button on:click={insertData} color="green" label="Update" />
          <Button
            on:click={() => changeState("index")}
            color="blue"
            label="Kembali"
          />
        </div>
      </div>
    </form>
  </div>
</section>
