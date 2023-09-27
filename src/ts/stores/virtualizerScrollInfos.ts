import { atom } from "jotai";

export const virtualizerScrollInfosAtom = atom<
  Record<string, { index: number; relativeOffset: number; offset: number }>
>({});
