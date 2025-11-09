import { langAtom } from "../stores/lang";

export function getLocalized(ru: string, en: string) {
    const lang = langAtom.get();
    return lang === "ru" ? ru : en;
}