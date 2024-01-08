<template>
	<nav
		class="fixed top-0 left-0 right-0 z-20 p-4 font-bold text-black shadow-lg bg-gradient-to-r from-green-300 to-green-500"
	>
		<div class="container flex items-center justify-between mx-auto">
			<div class="flex items-center gap-1">
				<router-link to="/" class="navbar-brand">
					<img src="../assets/fiir.png" class="w-auto h-[5rem]" alt="Logo" />
					<div class="hidden md:flex md:flex-col">
						<span class="text-2xl">{{ t("nav.Brand") }}</span>
						<span>{{ t("nav.Brand2") }}</span>
					</div>
				</router-link>
			</div>
			<div class="flex gap-5 md:hidden me-3">
				<LanguageSwitch />
				<button @click="toggleMenu">
					<i v-show="!collapseMenu" key="menuIcon" class="fa-solid fa-bars icon"></i>
					<i v-show="collapseMenu" key="closeIcon" class="fa-solid fa-x icon"></i>
				</button>
			</div>
			<div class="hidden md:block">
				<ul class="flex gap-4">
					<li v-for="item in navigationItems" :key="item.text">
						<router-link class="nav-link" :to="item.to" @click="closeMenu">{{
							item.text
						}}</router-link>
					</li>
				</ul>
			</div>
			<div class="hidden gap-3 md:flex">
				<router-link class="btn" to="/login"> Login </router-link>
				<LanguageSwitch />
			</div>
		</div>
		<div v-if="collapseMenu" class="block mt-3 md:hidden">
			<ul class="flex flex-col gap-5">
				<li v-for="item in navigationItems" :key="item.text">
					<router-link :to="item.to" @click="closeMenu">{{ item.text }}</router-link>
				</li>
				<li>
					<router-link class="btn" to="/login" @click="closeMenu"> Login </router-link>
				</li>
			</ul>
		</div>
	</nav>
</template>

<script setup>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import LanguageSwitch from "@/components/LanguageSwitch.vue";

const { t } = useI18n();
const collapseMenu = ref(false);

const navigationItemsData = [
	{ text: "Home", to: "/" },
	{ text: "About", to: "/about" },
	{ text: "FAQ", to: "/faq" },
	{ text: "ViewData", to: "/view-data" },
	{ text: "RegisterProduct", to: "/register-product" },
];

const navigationItems = computed(() => {
	return navigationItemsData.map((item) => ({
		text: t(`nav.${item.text}`),
		to: item.to,
	}));
});

function toggleMenu() {
	collapseMenu.value = !collapseMenu.value;
}

function closeMenu() {
	collapseMenu.value = false;
}
</script>
<style scoped>
.navbar-brand {
	@apply flex items-center gap-2 px-2 shadow transition duration-300 ease-in-out transform bg-white rounded-xl hover:ring-blue-400 hover:ring-4 hover:scale-110 hover:shadow-xl;
}
.btn {
	@apply bg-black text-white py-2 shadow rounded focus:ring-blue-400 hover:ring-blue-400 hover:ring-4 hover:text-blue-400 transition duration-500 ease-in-out transform px-5;
}
.nav-link {
	@apply relative text-black;
}

.nav-link:before {
	content: "";
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	height: 2px;
	background: transparent;
	transform: scaleX(0);
	transform-origin: 0 50%;
	transition: transform 0.3s ease-in-out;
}

.nav-link:hover:before {
	background: #42a5f5;
	transform: scaleX(1);
}
</style>
