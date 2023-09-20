import {
  transaksiParkiran,
  pelangganParkiran,
  kendaraanParkiran,
} from "./dummyData";

export interface TransaksiParkiran {
  id: number;
  jenis: "Mobil" | "Motor";
  status: "Beres" | "Belum";
  mulai: Date;
  beres?: Date;
  tarif?: number;
  platNomor?: string;
}

export interface PelangganParkiran {
  id: number;
  nama: string;
  telepon: string;
  keanggotaan: "Bronze" | "Silver" | "Gold" | "Platinum";
}

export interface KendaraanParkiran {
  id: number;
  platNomor: string;
  jenisKendaraan: "Mobil" | "Motor";
  atasNama: string;
}

type Table = "transaksi" | "pelanggan" | "kendaraan";

declare global {
  interface Window {
    database: {
      getDataById: (table: string, id: number) => Promise<TransaksiParkiran>;
      getData: (table: string) => Promise<TransaksiParkiran[]>;
      insertDataToTable: (table: string, data: any) => Promise<void>;
      updateTable: (table: string, data: any, id: number) => Promise<void>;
      deleteById: (table: string, id: number) => Promise<void>;
    };
  }
}

const error = (table: string) => new Error(`Error: Table ${table} not found`);

export async function getDataById(
  table: "transaksi",
  id: number
): Promise<TransaksiParkiran>;
export async function getDataById(
  table: "pelanggan",
  id: number
): Promise<PelangganParkiran>;
export async function getDataById(
  table: "kendaraan",
  id: number
): Promise<KendaraanParkiran>;
export async function getDataById(table: Table, id: number) {
  if (typeof window.database == "undefined") {
    if (table === "transaksi") {
      return transaksiParkiran[id - 1];
    } else if (table === "pelanggan") {
      return pelangganParkiran[id - 1];
    } else if (table === "kendaraan") {
      return kendaraanParkiran[id - 1];
    }
  } else {
    return await window.database.getDataById(table, id);
  }
}

export async function getData(table: "transaksi"): Promise<TransaksiParkiran[]>;
export async function getData(table: "pelanggan"): Promise<PelangganParkiran[]>;
export async function getData(table: "kendaraan"): Promise<KendaraanParkiran[]>;
export async function getData(table: Table): Promise<any[]> {
  if (typeof window.database == "undefined") {
    if (table === "transaksi") {
      return transaksiParkiran;
    } else if (table === "pelanggan") {
      return pelangganParkiran;
    } else if (table === "kendaraan") {
      return kendaraanParkiran;
    }
  } else {
    if (table === "kendaraan") {
      const result = await window.database.getData(table);
      return result.map((v) => ({
        id: v.id,
        platNomor: v.platNomor,
        jenisKendaraan: v.jenisKendaraan,
        atasNama: v.pelanggan.dataValues.nama,
      }));
    } else if (table === "transaksi") {
      const result = await window.database.getData(table);
      return result.map((v) => {
        return {
          id: v.id,
          platNomor: v.kendaraan.dataValues.platNomor,
          jenisKendaraan: v.kendaraan.dataValues.jenisKendaraan,
          mulai: v.mulai,
          status: v.status,
          beres: v.beres,
          tarif: v.tarif,
        };
      });
    }
    return await window.database.getData(table);
  }
}

export async function insertToTable(table: Table, data: any): Promise<void> {
  if (typeof window.database == "undefined") {
    if (table === "transaksi") {
      transaksiParkiran.push(data);
    } else if (table === "pelanggan") {
      pelangganParkiran.push(data);
    } else if (table === "kendaraan") {
      kendaraanParkiran.push(data);
    }
  } else {
    await window.database.insertDataToTable(table, data);
  }
}

export async function updateTable(
  table: Table,
  data: any,
  id: number
): Promise<void> {
  if (typeof window.database == "undefined") {
    if (table === "transaksi") {
      transaksiParkiran[id - 1] = { id, ...data };
    } else if (table === "pelanggan") {
      pelangganParkiran[id - 1] = { id, ...data };
    } else if (table === "kendaraan") {
      kendaraanParkiran[id - 1] = { id, ...data };
    }
  } else {
    await window.database.updateTable(table, data, id);
  }
}

export async function updateStatusTransaksi(id_transaksi) {
  const data = await getDataById("transaksi", id_transaksi);
  data.mulai = new Date(data.mulai);
  data.beres = new Date();
  console.log(
    `Data: ${JSON.stringify(
      data
    )}. Jam mulai: ${data.mulai.getHours()} Jam Beres: ${data.beres.getHours()} `
  );
  const jumlahJam = data.beres.getHours() - data.mulai.getHours() + 1;
  data.tarif =
    data.kendaraan.dataValues.jenisKendaraan == "Mobil"
      ? jumlahJam * 10_000
      : jumlahJam * 5_000;
  data.status = "Beres";
  if (typeof window.database == "undefined") {
    console.log(data);
  } else {
    window.database.updateTable("transaksi", data, id_transaksi);
  }
}

export async function deleteById(table: Table, id: number) {
  await window.database.deleteById(table, id);
}
