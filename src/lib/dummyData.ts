import type {
  TransaksiParkiran,
  KendaraanParkiran,
  PelangganParkiran,
} from "./data";

export const transaksiParkiran: TransaksiParkiran[] = [
  {
    id: 1,
    jenis: "Mobil",
    platNomor: "AB1234CD",
    mulai: new Date(2023, 9, 11, 9, 45),
    status: "Belum",
  },
  {
    id: 2,

    jenis: "Motor",
    platNomor: "AB1234CD",
    mulai: new Date(2023, 9, 11, 9, 45),
    status: "Belum",
  },
  {
    id: 3,
    jenis: "Mobil",
    platNomor: "AB1234CD",
    mulai: new Date(2023, 9, 11, 9, 45),
    status: "Belum",
  },
];

export const pelangganParkiran: PelangganParkiran[] = [
  {
    id: 1,
    nama: "John Doe",
    telepon: "08123456789",
    keanggotaan: "Bronze",
  },
  {
    id: 2,
    nama: "Jane Doe",
    telepon: "08234567890",
    keanggotaan: "Silver",
  },
  {
    id: 3,
    nama: "Peter Parker",
    telepon: "08334567891",
    keanggotaan: "Gold",
  },
];

export const kendaraanParkiran: KendaraanParkiran[] = [
  {
    id: 1,
    platNomor: "B6201",
    jenisKendaraan: "Motor",
    atasNama: "John Doe",
  },
  {
    id: 2,
    platNomor: "B2916",
    jenisKendaraan: "Motor",
    atasNama: "Jane Doe",
  },
  {
    id: 3,
    platNomor: "B7070",
    jenisKendaraan: "Motor",
    atasNama: "Peter Parker",
  },
];
