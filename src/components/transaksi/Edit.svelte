<script lang="ts">
  import { onMount } from 'svelte';

    import {getDataById} from '../../lib/data'
    import {editId} from '../../stores'
    export let id: number
    
    onMount( async () => {
        const input = {
            id: document.getElementById('idTransaksi') as HTMLInputElement,
            pembayaran: document.getElementById('metode-pembayaran') as HTMLSelectElement,
            platNomor: document.getElementById('plat-nomor') as HTMLInputElement,
            kartuParkir: document.getElementById('kartu-parkir') as HTMLSelectElement,
            tarif: document.getElementById('tarif') as HTMLInputElement,
            jenisKendaraan: document.getElementById('jenis-kendaraan') as HTMLSelectElement
        }
        const transaksi = await getDataById('transaksi', id)
        
        input.id.value = transaksi.id.toString() 
        input.platNomor.value = transaksi.platNomor
        input.tarif.value = transaksi.tarif.toString()
        input.jenisKendaraan.options[transaksi.jenis === "Motor" ? 0 : 1].selected = true
        input.pembayaran.options[transaksi.pembayaran === 'Tunai' ? 0 : 1].selected = true
        input.kartuParkir.options[transaksi.kartuParkir === "Ya" ? 0 : 1].selected = true
        return () => {
            editId.set(0)
        }
    })

    

</script>
        <section class="container mx-auto my-8">
            <h2 class="text-2xl font-semibold mb-4">Update Data Transaksi</h2>
            <div class="w-full max-w-md">
                <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="idTransaksi">
                            ID Transaksi
                        </label>
                        <input class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="idTransaksi" type="text" placeholder="1" readonly>
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="jenis-kendaraan">
                            Jenis Kendaraan
                        </label>
                        <select class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="jenis-kendaraan">
                            <option value="Motor">Motor</option>
                            <option value="Mobil">Mobil</option>
                        </select>
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="tarif">
                            Tarif
                        </label>
                        <input class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="tarif" type="text" placeholder="B 1234 AB">
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="plat-nomor">
                            Plat Nomor
                        </label>
                        <input class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="plat-nomor" type="text" placeholder="B 1234 AB">
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="kartu-parkir">
                            Kartu Parkir
                        </label>
                        <select class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="kartu-parkir">
                            <option value="Ya">Ya</option>
                            <option value="Tidak">Tidak</option>
                        </select>
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="metode-pembayaran">
                            Pembayaran Langsung
                        </label>
                        <select  class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="metode-pembayaran">
                            <option value="Tunai">Tunai</option>
                            <option selected value="Non-tunai">Non-Tunai</option>
                        </select>
                    </div>
                    <div class="flex items-center justify-center">
                        <button class="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:shadow-outline" type="button" >Update</button>
                    </div>
                </form>
            </div>
        </section>
