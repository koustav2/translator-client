// state.js
import { atomFamily, selectorFamily } from "recoil";


export const textInputAtom = atomFamily({
  key: "textInputAtom",
  default: "",
});

export const translationAtom = atomFamily({
  key: "translationAtom",
  default: "",
});

export const selectedLanguageAtom = atomFamily({
  key: "selectedLanguageAtom",
  default: "",
});


export const textInputSelector = selectorFamily({
  key: "textInputSelector",
  get: (id) => ({ get }) => get(textInputAtom(id)),
  set: (id) => ({ set }, newValue) => set(textInputAtom(id), newValue),
});

export const translationSelector = selectorFamily({
  key: "translationSelector",
  get: (id) => ({ get }) => get(translationAtom(id)),
  set: (id) => ({ set }, newValue) => set(translationAtom(id), newValue),
});


export const languageChangeSelector = selectorFamily({
  key: "languageChangeSelector",
  get: (id) => ({ get }) => get(selectedLanguageAtom(id)),
  set: (id) => ({ set }, newValue) => set(selectedLanguageAtom(id), newValue),
});



