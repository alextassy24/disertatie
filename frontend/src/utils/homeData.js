import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { getImageURL } from './getImageURL'; 

export const useComponentData = () => {
    const { t } = useI18n();

    const frontendComponents = computed(() => [
		{
			icon: getImageURL("vite"),
			name: "Vite",
			text: t("home.ViteText"),
			usage: t("home.ViteUsage"),
			link: "https://vitejs.dev/",
		},
		{
			icon: getImageURL("vue"),
			name: "Vue",
			text: t("home.VueText"),
			usage: t("home.VueUsage"),
			link: "https://vuejs.org/",
		},
		{
			icon: getImageURL("vue-router"),
			name: "Vue-Router",
			text: t("home.RouterText"),
			usage: t("home.RouterUsage"),
			link: "https://router.vuejs.org/",
		},
		{
			icon: getImageURL("pinia"),
			name: "Pinia",
			text: t("home.PiniaText"),
			usage: t("home.PiniaUsage"),
			link: "https://pinia.vuejs.org/",
		},
		{
			icon: getImageURL("axios"),
			name: "Axios",
			text: t("home.AxiosText"),
			usage: t("home.AxiosUsage"),
			link: "https://axios-http.com/",
		},
		{
			icon: getImageURL("tailwind"),
			name: "Tailwind CSS",
			text: t("home.TailwindText"),
			usage: t("home.TailwindUsage"),
			link: "https://tailwindcss.com/",
		},
	]);

	const backendComponents = computed(() => [
		{
			icon: getImageURL("aspnet"),
			name: "ASP.NET Core API",
			text: t("home.NetCoreText"),
			usage: t("home.NetCoreUsage"),
			link: "https://learn.microsoft.com/en-us/aspnet/core/?view=aspnetcore-8.0",
		},
		{
			icon: getImageURL("entity-framework"),
			name: "Entity Framework",
			text: t("home.EFText"),
			usage: t("home.EFUsage"),
			link: "https://docs.microsoft.com/en-us/ef/",
		},
		{
			icon: getImageURL("signalr"),
			name: "SignalR",
			text: t("home.SignalRText"),
			usage: t("home.SignalRUsage"),
			link: "https://docs.microsoft.com/en-us/aspnet/core/signalr/introduction?view=aspnetcore-8.0",
		},
		{
			icon: getImageURL("postgres"),
			name: "PostgreSQL",
			text: t("home.PostgresText"),
			usage: t("home.PostgresUsage"),
			link: "https://www.postgresql.org/",
		},
		{
			icon: getImageURL("azure"),
			name: "Microsoft Azure",
			text: t("home.Azure"),
			usage: t("home.AzureUsage"),
			link: "https://learn.microsoft.com/en-us/azure/?product=popular",
		},
		{
			icon: getImageURL("aws"),
			name: "Amazon Web Services",
			text: t("home.AWS"),
			usage: t("home.AWSUsage"),
			link: "https://docs.aws.amazon.com/",
		},
	]);

	const keyComponents = computed(() => [
		{
			name: t("home.MicrocontrolerTitle"),
			text: t("home.MicrocontrollerText"),
			usage: t("home.MicrocontrollerUsage"),
			link: "https://www.sigmanortec.ro/placa-dezvoltare-a9g-gsm-gprs-gps?gad_source=1&gclid=Cj0KCQjw0ruyBhDuARIsANSZ3wpzs1cdpPQCAGoJcTMuBkvK6m3y9paIZZDId9dAF1JMnQYq5jInq1waAveCEALw_wcB",
		},
		{
			name: "Server(API + DB)",
			text: t("home.ServerText"),
			usage: t("home.ServerUsage"),
		},
		{
			name: t("home.CaseTitle"),
			text: t("home.CaseText"),
			usage: t("home.CaseUsage"),
		},
		{
			name: t("home.BatteryTitle"),
			text: t("home.BatteryText"),
			usage: t("home.BatteryUsage"),
			link: "https://www.emag.ro/set-4-acumulatori-rakieta-18650-3-7v-12000mah-li-ion-auriu-st-rk18650g/pd/DV5XB8MBM/?utm_medium=ios&utm_source=mobile%20app&utm_campaign=share%20product",
		},
	]);

    return { frontendComponents, backendComponents, keyComponents };
}