import { atom } from "nanostores";

export const langAtom = atom<"en" | "ru">("en");

if (typeof window !== "undefined") {
    const saved = localStorage.getItem("lang");
    if (saved === "en" || saved === "ru") langAtom.set(saved);
    else {
        // автоопределение языка
        const userLang = navigator.language.startsWith("ru") ? "ru" : "en";
        langAtom.set(userLang);
    }

    langAtom.listen((value) => {
        localStorage.setItem("lang", value);
    })
}