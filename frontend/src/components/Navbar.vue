<template>
	<nav
		class="fixed top-0 left-0 right-0 z-20 p-4 font-bold text-black shadow-lg bg-gradient-to-r from-green-300 to-green-500">
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
						<router-link class="nav-link" v-if="!item.requireAuth" :to="item.to" @click="closeMenu">{{ item.text }}</router-link>
						<router-link class="nav-link" v-else-if="item.requireAuth && authStore.isAuthenticated" :to="item.to"
							@click="closeMenu">{{ item.text }}</router-link>
					</li>
				</ul>
			</div>
			<div class="hidden gap-3 md:flex">

				<router-link v-if="!authStore.isAuthenticated" class="btn" to="/login"
					@click="closeMenu">Login</router-link>
				<router-link v-else class="btn-logout" to="/login" @click="logout">Logout</router-link>

				<LanguageSwitch />
			</div>
		</div>
		<div v-if="collapseMenu" class="block mt-3 md:hidden">
			<ul class="flex flex-col gap-5">
				<li v-for="item in navigationItems" :key="item.text">
					<router-link v-if="!item.requireAuth" :to="item.to" @click="closeMenu">{{ item.text }}</router-link>
					<router-link v-else-if="item.requireAuth && authStore.isAuthenticated" :to="item.to"
						@click="closeMenu">{{ item.text }}</router-link>
				</li>
				<li>
					<router-link v-if="!authStore.isAuthenticated" class="btn" to="/login"
						@click="closeMenu">Login</router-link>
					<router-link v-else @click="logout" class="btn-logut" to="/login">Logout</router-link>
				</li>
			</ul>
		</div>
	</nav>
</template>

<script setup>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from 'vue-router';
import { useAuthStore } from "../store/auth";
import LanguageSwitch from "@/components/LanguageSwitch.vue";

const router = useRouter();
const authStore = useAuthStore();

const logout = () => {
	authStore.logout();
	router.push('/login');
}

const isAuthenticated = computed(() => {
	return {
		authStore,
	};
});

const { t } = useI18n();
const collapseMenu = ref(false);

const navigationItemsData = [
	{ text: "Home", to: "/", requireAuth: false },
	{ text: "About", to: "/about", requireAuth: false },
	{ text: "FAQ", to: "/faq", requireAuth: false },
	{ text: "RegisterProduct", to: "/register-product", requireAuth: true },
	{ text: "ViewData", to: "/view-data", requireAuth: true },
];

const navigationItems = computed(() => {
	return navigationItemsData.map((item) => ({
		text: t(`nav.${item.text}`),
		to: item.to,
		requireAuth: item.requireAuth
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

.btn-logout {
	@apply bg-red-500 text-white py-2 shadow rounded focus:ring-red-400 hover:ring-red-400 hover:ring-4 transition duration-500 ease-in-out transform px-5;
}

.nav-link {
	@apply relative text-black hover:text-white transition duration-300 ease-in-out transform;
}

.nav-link:before {
	content: "";
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	height: 2px;
	margin-bottom: -2px;
	background: transparent;
	transform: scaleX(0);
	transform-origin: 0 50%;
	transition: transform 0.3s ease-in-out;
}

.nav-link:hover:before {
	background: white;
	transform: scaleX(1);
}</style>
