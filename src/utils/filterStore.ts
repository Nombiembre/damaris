import { atom } from "nanostores";

export type filterType = "all" | "default" | "septiembre";
export const $filterStore = atom<filterType>("default")
export const viewStore = atom("mosaic");


