<template>
	<nav
		class="fixed top-0 left-0 right-0 p-4 font-bold text-black shadow-lg bg-gradient-to-r from-green-300 to-green-500"
		:class="{ 'z-30': isModalActive, 'z-50': !isModalActive }"
	>
		<div class="container flex items-center justify-between mx-auto">
			<div class="flex items-center gap-1">
				<router-link
					to="/"
					active-class="brand-active"
					class="navbar-brand"
				>
					<img
						src="../assets/logo.png"
						class="hidden lg:block w-auto h-[5rem]"
						alt="Logo"
					/>
					<span class="flex items-center gap-1">
						<img
							src="../assets/logo-nameless.png"
							class="block lg:hidden w-auto h-[5rem]"
							alt="Logo"
						/>
						<!-- <img
							src="../assets/logo-name.png"
							class="hidden sm:block w-[8rem] lg:hidden"
							alt="Logo"
						/> -->
					</span>
				</router-link>
			</div>
			<div class="flex gap-5 md:hidden me-3">
				<LanguageSwitch />
				<button @click="toggleMenu">
					<i
						v-show="!collapseMenu"
						key="menuIcon"
						class="fa-solid fa-bars icon"
					></i>
					<i
						v-show="collapseMenu"
						key="closeIcon"
						class="fa-solid fa-x icon"
					></i>
				</button>
			</div>
			<div class="hidden md:block">
				<ul class="flex gap-4">
					<li
						v-for="item in unauthNavigationItems"
						:key="item.text"
					>
						<router-link
							class="flex flex-col items-center nav-link"
							:to="item.to"
							@click="closeMenu"
						>
							<i :class="item.icon"></i>
							<span class="mt-1">{{ item.text }}</span>
						</router-link>
					</li>
					<li
						@click="toggleDropdown"
						v-if="authStore.isAuthenticated"
					>
						<span
							class="flex flex-col items-center cursor-pointer nav-link"
						>
							<i class="fa-solid fa-user"></i>
							<span class="flex flex-row items-center gap-1 mt-1">
								<span>{{ truncatedEmail }}</span>
								<i class="pb-1 fa-solid fa-chevron-down"></i>
							</span>
						</span>
						<div
							v-if="dropdownMenu"
							@pointerleave="closeDropdown"
							class="dropdown"
						>
							<router-link
								v-for="item in authNavigationItems"
								class="flex flex-row items-center gap-2 dropdown-item"
								:to="item.to"
								active-class="dropdown-active"
								@click="closeMenu"
							>
								<i :class="item.icon"></i>
								<span class="mt-1">{{ item.text }}</span>
							</router-link>
						</div>
					</li>
				</ul>
			</div>
			<div class="hidden gap-3 md:flex">
				<router-link
					v-if="!authStore.isAuthenticated"
					class="btn"
					to="/login"
					@click="closeMenu"
					>Login</router-link
				>
				<router-link
					v-else
					class="flex items-center gap-2 btn-logout"
					to="/login"
					@click="logout"
				>
					<i class="fa-solid fa-right-from-bracket"></i>
					<span>Logout</span>
				</router-link>
				<LanguageSwitch />
			</div>
		</div>
		<div
			v-if="collapseMenu"
			class="block mt-5 md:hidden"
		>
			<ul class="flex flex-col gap-5">
				<li
					v-for="item in unauthNavigationItems"
					:key="item.text"
				>
					<router-link
						class="flex flex-row items-center gap-2 nav-link"
						:to="item.to"
						@click="closeMenu"
					>
						<i :class="item.icon"></i>
						<span class="mt-1">{{ item.text }}</span>
					</router-link>
				</li>
				<li
					@click="toggleDropdown"
					v-if="authStore.isAuthenticated"
				>
					<span
						class="flex flex-row items-center gap-2 cursor-pointer nav-link"
					>
						<i class="fa-solid fa-user"></i>
						<span class="flex flex-row items-center gap-1 mt-1">
							<span>{{ truncatedEmail }}</span>
							<i class="fa-solid fa-chevron-down"></i>
						</span>
					</span>
					<div
						v-if="dropdownMenu"
						class="p-2 mt-3 space-y-2 bg-white border rounded-lg shadow-lg top-full"
					>
						<router-link
							v-for="item in authNavigationItems"
							class="flex flex-row items-center gap-2 dropdown-item"
							:to="item.to"
							active-class="dropdown-active"
							@click="closeMenu"
						>
							<i :class="item.icon"></i>
							<span class="mt-1">{{ item.text }}</span>
						</router-link>
					</div>
				</li>
				<li>
					<router-link
						v-if="!authStore.isAuthenticated"
						class="btn"
						to="/login"
						@click="closeMenu"
						>Login</router-link
					>
					<router-link
						v-else
						@click="logout"
						class="btn-logout"
						to="/login"
						>Logout</router-link
					>
				</li>
			</ul>
		</div>
	</nav>
</template>

<script setup>
	import { ref, computed, inject } from "vue";
	import { useI18n } from "vue-i18n";
	import { useRouter } from "vue-router";
	import { useAuthStore } from "../store/auth";
	import LanguageSwitch from "@/components/LanguageSwitch.vue";

	const isModalActive = ref(false);
	const emitter = inject("emitter");
	emitter.on("modal-active", (value) => {
		isModalActive.value = value;
	});

	const router = useRouter();
	const authStore = useAuthStore();

	const logout = () => {
		authStore.logout();
		router.push("/login");
	};

	const truncatedEmail = computed(() => {
		if (authStore.user.length > 15) {
			const value = authStore.user.substring(0, 15) + "...";
			return value;
		}
		return authStore.user;
	});

	const { t } = useI18n();
	const collapseMenu = ref(false);
	const dropdownMenu = ref(false);

	const navigationItemsData = [
		{
			text: "Home",
			to: "/",
			requireAuth: false,
			icon: "fa-solid fa-house",
		},
		{
			text: "About",
			to: "/about",
			requireAuth: false,
			icon: "fa-solid fa-people-group",
		},
		{
			text: "FAQ",
			to: "/faq",
			requireAuth: false,
			icon: "fa-regular fa-circle-question",
		},
		{
			text: "Docs",
			to: "/docs",
			requireAuth: false,
			icon: "fa-solid fa-book",
		},
		{
			text: "Profile",
			to: "/profile",
			requireAuth: true,
			icon: "fa-solid fa-address-card",
		},
		{
			text: "Wearers",
			to: "/my-wearers",
			requireAuth: true,
			icon: "fa-solid fa-person-cane",
		},
		{
			text: "Products",
			to: "/my-products",
			requireAuth: true,
			icon: "fa-solid fa-table-list",
		},
		{
			text: "ChangePassword",
			to: "/change-password",
			requireAuth: true,
			icon: "fa-solid fa-key",
		},
	];

	const navigationItems = computed(() => {
		return navigationItemsData.map((item) => ({
			text: t(`nav.${item.text}`),
			to: item.to,
			requireAuth: item.requireAuth,
			icon: item.icon,
		}));
	});

	const authNavigationItems = computed(() => {
		return navigationItems.value.filter(
			(item) => item.requireAuth && authStore.isAuthenticated
		);
	});

	const unauthNavigationItems = computed(() => {
		return navigationItems.value.filter((item) => !item.requireAuth);
	});

	function toggleMenu() {
		collapseMenu.value = !collapseMenu.value;
	}

	function closeMenu() {
		collapseMenu.value = false;
	}

	function toggleDropdown() {
		dropdownMenu.value = !dropdownMenu.value;
	}

	function closeDropdown() {
		dropdownMenu.value = false;
	}
</script>

<style scoped>
	.navbar-brand {
		@apply flex items-center bg-black gap-2 px-2 py-1 rounded-xl transition duration-300 ease-in-out transform hover:ring-blue-400 hover:ring-4 hover:shadow-xl;
	}

	.btn {
		@apply bg-black text-white py-2 shadow rounded focus:ring-blue-400 hover:ring-blue-400 hover:ring-4 hover:text-blue-400 transition duration-500 ease-in-out transform px-5;
	}

	.btn-logout {
		@apply bg-red-500 text-white py-2 shadow rounded focus:ring-red-400 hover:ring-red-400 hover:ring-4 transition duration-500 ease-in-out transform px-5;
	}

	.nav-link {
		@apply relative text-black hover:scale-110 p-1 rounded transition duration-300 ease-in-out transform;
	}

	.dropdown {
		@apply absolute p-2 mt-1 space-y-2 bg-white border rounded-lg shadow-lg top-full transition duration-300 ease-in-out transform;
	}

	.dropdown-item {
		@apply relative text-black hover:text-white hover:bg-blue-300 rounded-lg p-1 transition duration-300 ease-in-out transform;
	}

	.active {
		@apply text-white;
	}

	.dropdown-active {
		@apply text-white bg-blue-500;
	}

	.brand-active {
		@apply text-black;
	}
</style>
