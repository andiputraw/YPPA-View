<script lang="ts">
    import {pageMode} from '../../stores'
    import {insertToTable} from '../../lib/data'
    type State = "index" | "edit" | "insert" | "delete"

    let nama,telepon,keanggotaan

    async function insertData(){
        insertToTable('pelanggan', {nama,telepon,keanggotaan})
        changeState('index')
    }

    function changeState(state: State){
        pageMode.update((_) => state )
    }

</script>

<section class="flex flex-col justify-start items-center container mx-auto mt-8">
        <h2 class="text-2xl font-semibold mb-4">Input Data Pelanggan Baru</h2>
        <div class="w-full max-w-md">
            <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="nama">
                        Nama
                    </label>
                    <input bind:value={nama} class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="nama" type="text" placeholder="John Doe">
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="telepon">
                        Telepon
                    </label>
                    <input bind:value={telepon} class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="telepon" type="text" placeholder="08123456789">
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="keanggotaan">
                        Keanggotaan
                    </label>
                    <select bind:value={keanggotaan} class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="keanggotaan">
                        <option value="Bronze">Bronze</option>
                        <option value="Silver">Silver</option>
                        <option value="Gold">Gold</option>
                        <option value="Platinum">Platinum</option>
                    </select>
                </div>
                <div class="flex items-center justify-center">
                    <button on:click={insertData} class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline" type="button">
                        Submit
                    </button>
                    <button on:click={() => changeState("index")} class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline" type="button">
                        Kembali
                    </button>
                    
                </div>
            </form>
        </div>
    </section>