import { writable } from "svelte/store";

export const pageMode = writable("index");
export const editId = writable(0);
