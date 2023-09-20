<script lang="ts">
    import { onMount } from 'svelte';
    
    import { getDataById, updateTable } from '../../lib/data';
    import { editId, pageMode } from '../../stores';
    export let id: number;
    
    let nama,telepon,keanggotaan
    onMount(async () => {
      let input = {
        id: document.getElementById('idPelanggan') as HTMLInputElement,
        nama: document.getElementById('nama') as HTMLInputElement,
        telepon: document.getElementById('telepon') as HTMLInputElement,
        keanggotaan: document.getElementById('keanggotaan') as HTMLSelectElement,
      };
  
      const pelanggan = await getDataById('pelanggan', id);
      nama = pelanggan.nama
      telepon = pelanggan.telepon
      keanggotaan = pelanggan.keanggotaan

      input.nama.value = pelanggan.nama.toString()
      input.telepon.value = pelanggan.telepon.toString()
      input.keanggotaan.options[getOptions(pelanggan.keanggotaan)].selected = true
  
      return () => {
        editId.set(0);
      };
    });

    
    async function insertData(){
        updateTable('pelanggan', {nama, keanggotaan, telepon}, id)
        changeState('index')
    }

    function changeState(state: 'index' | 'update' | 'insert'){
        pageMode.update((_) => state )
    }
  

    function getOptions(option:'Bronze'|'Silver'|'Gold'|'Platinum' ){
        return ['Bronze','Silver', 'Gold', 'Platinum'].findIndex((v) => v)
    }
  </script>
  
  <section class="container mx-auto my-8">
    <h2 class="text-2xl font-semibold mb-4">Update Data Pelanggan</h2>
    <div class="w-full max-w-md">
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="nama">
            Nama Pelanggan
          </label>
          <input
            class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="nama"
            type="text"
            placeholder="John Doe"
            bind:value={nama}
          >
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="telepon">
            Telepon
          </label>
          <input
            class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="telepon"
            type="text"
            placeholder="123-456-7890"
            bind:value={telepon}
          >
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="keanggotaan">
            Keanggotaan
          </label>
          <select
          bind:value={keanggotaan}
            class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="keanggotaan"
            placeholder="Gold"
          >
          <option value="Bronze">Bronze</option>
                        <option value="Silver">Silver</option>
                        <option value="Gold">Gold</option>
                        <option value="Platinum">Platinum</option>
        </select>
        </div>
        <div class="flex items-center justify-center">
          <button
            class="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:shadow-outline"
            type="button"
            on:click={insertData}
          >
            Update
          </button>
        </div>
      </form>
    </div>
  </section>

  