import { langAtom } from "../stores/lang";

export function applyTranslations() {
    const elements = document.querySelectorAll("[data-i18n]");
    const lang = langAtom.get();

    for (const el of elements) {
        const dict = el.getAttribute("data-i18n");
        if (!dict) continue;

        try {
            const parsed = JSON.parse(dict);
            el.textContent = parsed[lang] ?? parsed["en"];
        } catch (err) {
            console.warn("Invalid data-i18n JSON:", dict);
        }
    }
}
