<template>
	<nav
		class="fixed top-0 left-0 right-0 z-20 p-4 font-bold text-black shadow-lg bg-gradient-to-r from-green-300 to-green-500"
	>
		<div class="container flex items-center justify-between mx-auto">
			<div class="flex items-center gap-1">
				<router-link to="/" class="flex items-center gap-2">
					<img src="../assets/fiir.png" class="w-auto h-[5rem]" alt="Logo" />
					<span class="text-2xl">Monitoring Device</span>
				</router-link>
			</div>
			<button class="block md:hidden" @click="toggleMenu">
				<i class="fa-solid fa-bars"></i>
			</button>
			<div class="hidden md:block">
				<ul class="flex space-x-4">
					<li v-for="item in navigationItems" :key="item.text">
						<router-link :to="item.to" @click="closeMenu">{{ item.text }}</router-link>
					</li>
					<li>
						<router-link
							class="p-3 text-white bg-black rounded-lg hover:bg-gray-700"
							to="/login"
						>
							Login
						</router-link>
					</li>
				</ul>
			</div>
		</div>
		<div v-if="collapseMenu" class="block md:hidden">
			<ul class="flex flex-col gap-5">
				<li v-for="item in navigationItems" :key="item.text">
					<router-link :to="item.to" @click="closeMenu">{{ item.text }}</router-link>
				</li>
				<li>
					<router-link
						class="p-3 text-white bg-black rounded-lg hover:bg-gray-700"
						to="/login"
						@click="closeMenu"
					>
						Login
					</router-link>
				</li>
			</ul>
		</div>
	</nav>
</template>

<script setup>
import { ref } from "vue";
const collapseMenu = ref(false);

const navigationItems = [
	{ text: "Home", to: "/" },
	{ text: "About", to: "/about" },
	{ text: "FAQ", to: "/faq" },
	{ text: "View Data", to: "/view-data" },
];

function toggleMenu() {
	collapseMenu.value = !collapseMenu.value;
}

function closeMenu() {
	collapseMenu.value = false;
}
</script>
