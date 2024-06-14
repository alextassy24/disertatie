import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { getImageURL } from './getImageURL'; 

export const useComponentData = () => {
    const { t } = useI18n();
    const hardwareComponents = computed(() => [
        {
            image: getImageURL("a9g", "png"),
            name: t("about.A9G"),
            price: 114.59,
            link: "https://www.sigmanortec.ro/placa-dezvoltare-a9g-gsm-gprs-gps?fast_search=fs",
        },
        {
            image: getImageURL("vodafone", "png"),
            name: "Vodafone SIM 7€",
            price: 44,
            link: "",
        },
        {
            image: getImageURL("rtc", "png"),
            name: "Real Time Clock",
            price: 10,
            link: "https://www.emag.ro/modul-rtc-cu-ds1307-oky3392/pd/D171J7MBM/?ref=hdr-favorite_products",
        },
        {
            image: getImageURL("oled", "png"),
            name: "OLED 0.96” ",
            price: 27,
            link: "https://www.emag.ro/ecran-oled-0-96-ai409-s322-323-324/pd/D69S02MBM/?ref=sponsored_products_search_r_1_1&recid=recads_1_741a2aa7708455069a4485a9989c5ba25e8a8379575fdb8c9dc456ccb44bea78_1716810644&aid=0a7d5dd6-d99b-11eb-8d67-06e2772fd63e&oid=63298237&aidr=ed861bdb-d486-11ee-a490-0229d980bfff&scenario_ID=1",
        },
    ]);

    const developmentComponents = computed(() => [
        {
            image: getImageURL("usbTTL", "png"),
            name: "USB TTL Converter",
            price: 15,
            link: "https://www.emag.ro/convertor-de-semnal-digital-usb-la-ttl-ch340g-oky3406-7/pd/D67Q80MBM/",
        },
        {
            image: getImageURL("attiny85", "png"),
            name: "Arduino ATTiny85",
            price: 28.13,
            link: "https://www.sigmanortec.ro/Placa-dezvoltare-ATTINY85-p126029357?fast_search=fs",
        },
        {
            image: getImageURL("arduino", "png"),
            name: "Arduino UNO R3",
            price: 52.96,
            link: "https://cleste.ro/arduino-uno-r3-atmega328p.html",
        },
        {
            image: getImageURL("sim800l2.0", "png"),
            name: t("home.GSMTitle"),
            price: 60.98,
            link: "https://cleste.ro/modul-gprs-gsm-quad-band-sim800l-20-cu-antena.html",
        },
        {
            image: getImageURL("neo6m", "png"),
            name: t("home.GPSTitle"),
            price: 62.06,
            link: "https://cleste.ro/modul-gps-ublox-neo-6m-cu-antena.html",
        },
        {
            image: getImageURL("arduinoNano", "png"),
            name: "Arduino Nano V3",
            price: 25.12,
            link: "https://www.emag.ro/placa-nano-cu-usb-c-compatibila-cu-arduino-nano-v3-0-albastru-arduino-nano-328-usbc-n/pd/DSVTTMYBM/?ref=fav_pd-title",
        },
        {
            image: getImageURL("sim800l", "png"),
            name: t("home.GSMTitle"),
            price: 57.46,
            link: "https://cleste.ro/modul-gprs-gsm-quad-band-sim800l-cu-antena.html",
        },
        {
            image: getImageURL("vodafone", "png"),
            name: "Vodafone SIM 8€",
            price: 53,
            link: "",
        },
        {
            image: getImageURL("bateriiAA", "png"),
            name: t("about.AABatteries"),
            price: 19.99,
            link: "",
        },
        {
            image: getImageURL("baterii", "png"),
            name: t("home.BatteryTitle"),
            price: 38.99,
            link: "https://www.emag.ro/set-4-acumulatori-rakieta-18650-3-7v-12000mah-li-ion-auriu-st-rk18650g/pd/DV5XB8MBM/?utm_medium=ios&utm_source=mobile%20app&utm_campaign=share%20product",
        },
        {
            image: getImageURL("suportBaterie", "png"),
            name: t("about.BatterySupport"),
            price: 4.17,
            link: "https://cleste.ro/suport-baterii-18650-1-slot.html",
        },
        {
            image: getImageURL("suportBaterii", "png"),
            name: t("about.BatteriesSupport"),
            price: 12,
            link: "https://www.emag.ro/suport-acumulator-3-7v-18650-x-2-sloturi-s18650-2/pd/DRC49WBBM/?ref=fav_pd-title",
        },
        {
            image: getImageURL("butonLed", "png"),
            name: t("about.LedBtn"),
            price: 1.98,
            link: "https://cleste.ro/?redirect=1#/dfclassic/query=buton%20led&query_name=match_and",
        },
        {
            image: getImageURL("suportBateriiAA", "png"),
            name: t("about.AABatterySupport"),
            price: 6.79,
            link: "https://cleste.ro/suport-baterii-18650-3-sloturi.html",
        },
        {
            image: getImageURL("cabluriT-T", "png"),
            name: t("about.CableT-T"),
            price: 13.09,
            link: "https://www.emag.ro/cabluri-arduino-tata-tata-20-cm-40-buc-elektroweb-multicolor-2-c-026/pd/DC1MTMYBM/?utm_source=mobile%20app&utm_medium=ios&utm_campaign=share%20product",
        },
        {
            image: getImageURL("cabluriM-T", "png"),
            name: t("about.CableM-T"),
            price: 13.09,
            link: "https://www.emag.ro/set-40-cabluri-arduino-tata-mama-40-cm-multicolor-5904162803460/pd/DH8RKLMBM/?utm_medium=ios&utm_campaign=share%20product&utm_source=mobile%20app",
        },
        {
            image: getImageURL("cabluriM-M", "png"),
            name: t("about.CableM-M"),
            price: 13.09,
            link: "https://www.emag.ro/set-40-fire-mama-mama-20-cm-05fz/pd/DHTS9WBBM/?utm_campaign=share%20product&utm_medium=ios&utm_source=mobile%20app",
        },
        {
            image: getImageURL("breadboard", "png"),
            name: "Breadboard 400",
            price: 7.1,
            link: "https://www.emag.ro/placa-test-breadboard-400-bb400/pd/D5WBP7MBM/",
        },
        {
            image: getImageURL("breadboard830", "png"),
            name: "Breadboard 830",
            price: 15.0,
            link: "https://www.emag.ro/placa-prototipare-tip-breadboard-830-puncte-oky0008/pd/DW8217MBM/?ref=history-shopping_357018673_2895_1",
        },
        {
            image: getImageURL("breadboardCon", "png"),
            name: t("about.BreadboardCon"),
            price: 15.0,
            link: "https://www.emag.ro/set-conectori-pentru-breadboard-140buc-oky0053/pd/DMG9BKMBM/?ref=history-shopping_357018673_2895_2",
        },
    ]);

    const galleryConfig = computed(() => [
        {
            title: t("about.PhotoGallery.gpsSolder"),
            count: 16,
            prefix: "gpsSolder",
            toggler: false,
        },
        {
            title: t("about.PhotoGallery.gpsTest"),
            count: 14,
            prefix: "gpsTest",
            toggler: false,
        },
        {
            title: t("about.PhotoGallery.gsmSolder"),
            count: 2,
            prefix: "gsmSolder",
            toggler: false,
        },
        {
            title: t("about.PhotoGallery.gsmTest"),
            count: 10,
            prefix: "gsmTest",
            toggler: false,
        },
        {
            title: t("about.PhotoGallery.arduinoSolder"),
            count: 5,
            prefix: "arduinoSolder",
            toggler: false,
        },
        {
            title: t("about.PhotoGallery.batteryTesting"),
            count: 3,
            prefix: "bateriiTest",
            toggler: false,
        },
        {
            title: t("about.PhotoGallery.prototype"),
            count: 13,
            prefix: "Prototip",
            toggler: false,
        },
        {
            title: t("about.PhotoGallery.testPrototype"),
            count: 12,
            prefix: "TestPrototip",
            toggler: false,
        },
        {
            title: t("about.PhotoGallery.testA9G"),
            count: 8,
            prefix: "TestA9G",
            toggler: false,
        },
        {
            title: t("about.PhotoGallery.testA9G-AT"),
            count: 6,
            prefix: "TestA9G-AT",
            toggler: false,
        },
    ]);

    const developmentPhases = computed(() => [
		{
			title: t("about.DevelopmentPhases.Phase1.Title"),
			description: t("about.DevelopmentPhases.Phase1.Description"),
			paragraphs: [
				t("about.DevelopmentPhases.Phase1.Paragraphs.P1"),
				t("about.DevelopmentPhases.Phase1.Paragraphs.P2"),
				t("about.DevelopmentPhases.Phase1.Paragraphs.P3"),
			],
		},
		{
			title: t("about.DevelopmentPhases.Phase2.Title"),
			description: t("about.DevelopmentPhases.Phase2.Description"),
			paragraphs: [
				t("about.DevelopmentPhases.Phase2.Paragraphs.P1"),
				t("about.DevelopmentPhases.Phase2.Paragraphs.P2"),
			],
		},
		{
			title: t("about.DevelopmentPhases.Phase3.Title"),
			description: t("about.DevelopmentPhases.Phase3.Description"),
			paragraphs: [
				t("about.DevelopmentPhases.Phase3.Paragraphs.P1"),
				t("about.DevelopmentPhases.Phase3.Paragraphs.P2"),
			],
		},
		{
			title: t("about.DevelopmentPhases.Phase4.Title"),
			description: t("about.DevelopmentPhases.Phase4.Description"),
			paragraphs: [
				t("about.DevelopmentPhases.Phase4.Paragraphs.P1"),
				t("about.DevelopmentPhases.Phase4.Paragraphs.P2"),
			],
		},
		{
			title: t("about.DevelopmentPhases.Phase5.Title"),
			description: t("about.DevelopmentPhases.Phase5.Description"),
			paragraphs: [
				t("about.DevelopmentPhases.Phase5.Paragraphs.P1"),
				t("about.DevelopmentPhases.Phase5.Paragraphs.P2"),
				t("about.DevelopmentPhases.Phase5.Paragraphs.P3"),
			],
		},
	]);

    return {hardwareComponents, developmentComponents, galleryConfig, developmentPhases}
}
