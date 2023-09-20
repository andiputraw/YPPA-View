<script lang="ts">
  import {pageMode} from './stores'
  import TailwindCss from './tailwindCSS.svelte';
  import Header from './components/partials/Header.svelte';
  import Pelanggan from './components/pelanggan/Pelanggan.svelte';
  import Kendaraan from './components/kendaraan/Kendaraan.svelte';
  import Transaksi from './components/transaksi/Transaksi.svelte';
  
  let currentContent = "kendaraan"
  function showContent(content : string){
      currentContent = content
      pageMode.set('index')
  }
</script>
<TailwindCss/>
<Header/>
<div class="flex w-screen bg-slate-700" >  
  <aside class="bg-gray-800 text-white h-screen p-4">
      <h2 class=" text-2xl font-semibold mb-6">Proyek Parkiran</h2>
      <ul class="space-y-4">
          <li><button class="hover:text-blue-300" on:click={() => showContent("kendaraan")}>Kendaraan</button></li>
          <li><button class="hover:text-blue-300" on:click={() => showContent("pelanggan")}>Pelanggan</button></li>
          <li><button class="hover:text-blue-300" on:click={() => showContent("transaksi")}>Transaksi</button></li>
      </ul>
  </aside>
  
  {#if currentContent === "kendaraan"}
    <Kendaraan/>
  {/if}
  {#if currentContent === "pelanggan"}
    <Pelanggan/>
  {/if}
  {#if currentContent === "transaksi"}
    <Transaksi/>
  {/if}
</div>

<style>

</style>
