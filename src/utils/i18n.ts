import ru from "../i18n/ru.json";
import en from "../i18n/en.json";

const dict = { ru, en };
export const locales = ["ru", "en"] as const;

export type Locale = keyof typeof dict;

export function t(locale: Locale, key: string) {
    return key.split(".").reduce(
        (o: any, k) => o?.[k],
        dict[locale]
    ) ?? key;
}

export const withLocale = (locale: Locale, path: string) =>
    `/${locale}${path}`;
