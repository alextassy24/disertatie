import { createI18n } from "vue-i18n";
import ro from "./locales/ro.json";

export default createI18n({
    locale: import.meta.env.VITE_DEFAULT_LOCALE,
    fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
    legacy: false,
    messages: {
        ro,
    },
    runtimeOnly: false,
});
