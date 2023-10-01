<template>
	<div class="mt-28">
		<!-- Hero Section -->
		<section class="px-10 py-16 text-white bg-black">
			<div class="container z-10 mx-auto text-justify">
				<h1 class="mb-8 text-4xl font-semibold text-center">
					Welcome to the Monitoring Bracelet Project
				</h1>
				<p class="mb-8 text-lg">
					Dedicated to improving the lives of individuals with special needs through
					innovative technology.
				</p>
			</div>
		</section>

		<section class="px-10 py-16 overflow-hidden bg-white">
			<div class="container z-10 mx-auto text-justify">
				<h2 class="mb-4 text-3xl font-semibold text-center">Our Mission</h2>
				<p class="mb-8 text-lg">
					We are on a mission to provide a reliable and user-friendly monitoring solution
					that enhances the quality of life for individuals with special needs and their
					caregivers.
				</p>
				<p class="mb-8 text-lg">
					Our mission is driven by a commitment to innovation, accessibility, and
					inclusivity. Through cutting-edge technology, we aim to empower individuals with
					special needs and provide peace of mind to their caregivers.
				</p>
				<router-link
					to="/about"
					class="px-6 py-3 text-lg font-semibold text-white transition-colors duration-300 ease-in-out bg-green-500 rounded-lg hover:bg-green-700"
				>
					Learn More
				</router-link>
			</div>
		</section>

		<!-- Technology Section -->
		<section class="px-10 py-16 bg-black">
			<div class="container mx-auto text-center">
				<h2 class="mb-4 text-3xl font-semibold text-white">Technology Stack</h2>
				<div class="grid grid-cols-1 gap-4 text-left sm:grid-cols-2">
					<div class="p-6 bg-white rounded-lg shadow-md">
						<h3 class="mb-2 text-xl font-semibold">Frontend Technologies</h3>
						<ul class="pl-6 list-disc">
							<li>Vite</li>
							<li>Vue.js</li>
							<li>Vue Router</li>
							<li>Pinia</li>
							<li>Axios</li>
							<li>Tailwind CSS</li>
						</ul>
					</div>
					<div class="p-6 bg-white rounded-lg shadow-md">
						<h3 class="mb-2 text-xl font-semibold">Backend Technologies</h3>
						<ul class="pl-6 list-disc">
							<li>ASP.NET Core 8.0</li>
							<li>PostgreSQL</li>
						</ul>
					</div>
				</div>
			</div>
		</section>

		<section class="px-10 py-16 bg-white">
			<div class="container mx-auto text-center">
				<h2 class="mb-4 text-3xl font-semibold">Web App Components</h2>
				<div class="grid grid-cols-1 gap-4 text-left md:grid-cols-2">
					<div
						v-for="component in webComponents"
						class="flex flex-col items-center gap-2 p-6 bg-gray-100 rounded-lg shadow-md md:flex-row"
					>
						<a :href="component.link" target="_blank">
							<img
								:src="component.icon"
								alt="Logo"
								class="object-contain w-24 h-24 mb-4"
							/>
						</a>
						<div>
							<h3 class="mb-2 text-xl font-semibold">{{ component.name }}</h3>
							<p class="mb-4">
								{{ component.text }}
							</p>
							<p><strong>Usage:</strong> {{ component.usage }}</p>
						</div>
					</div>
				</div>
			</div>
		</section>
		<!-- Components Section -->
		<section class="px-10 py-16 bg-gradient-to-r from-green-500 to-green-300">
			<div class="container mx-auto text-center">
				<h2 class="mb-4 text-3xl font-bold text-white">Key Components</h2>
				<div class="grid grid-cols-1 gap-4 text-left md:grid-cols-3">
					<!-- Server Component -->
					<div
						v-for="component in keyComponents"
						class="p-6 bg-white rounded-lg shadow-xl"
					>
						<h3 class="mb-2 text-xl font-semibold">{{ component.name }}</h3>
						<p class="mb-4">
							{{ component.content }}
						</p>
						<p><strong>Usage:</strong> {{ component.usage }}</p>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup>
import { ref } from "vue";

const getImageURL = (name) => {
	return new URL(`../assets/${name}.png`, import.meta.url).href;
};

const webComponents = ref([
	{
		icon: getImageURL("vite"),
		name: "Vite",
		text: "Vite is our build tool of choice for the web app. It provides fast development and optimized production builds, making our app load quickly and efficiently.",
		usage: "Build tool for web app.",
		link: "https://vitejs.dev/",
	},
	{
		icon: getImageURL("vue"),
		name: "Vue",
		text: "Vue.js is the core framework for building our web app's user interface. It enables us to create dynamic and interactive components with ease.",
		usage: "User interface development.",
		link: "https://vuejs.org/",
	},
	{
		icon: getImageURL("vue-router"),
		name: "Vue-Router",
		text: "Vue Router is used for client-side routing in our web app. It enables seamless navigation between different views and pages.",
		usage: "Client-side routing.",
		link: "https://router.vuejs.org/",
	},
	{
		icon: getImageURL("pinia"),
		name: "Pinia",
		text: "Pinia is our state management library for Vue.js. It helps us manage and share application-level state across components.",
		usage: "State management.",
		link: "https://pinia.vuejs.org/",
	},
	{
		icon: getImageURL("axios"),
		name: "Axios",
		text: "Axios is used for making HTTP requests from our web app to the backend server, enabling data retrieval and updates.",
		usage: "HTTP requests and data communication.",
		link: "https://axios-http.com/",
	},
	{
		icon: getImageURL("tailwind"),
		name: "Tailwind CSS",
		text: "Tailwind CSS provides a utility-first CSS framework that streamlines styling and ensures a consistent design across our web app.",
		usage: "Styling and design.",
		link: "https://tailwindcss.com/",
	},
	{
		icon: getImageURL("aspnet"),
		name: "ASP.NET Core API",
		text: "ASP.NET Core is the framework chosen for building the backend API of our application. It provides a robust and scalable platform for developing web APIs.",
		usage: "Backend API development.",
		link: "https://learn.microsoft.com/en-us/aspnet/core/?view=aspnetcore-8.0",
	},
	{
		icon: getImageURL("postgres"),
		name: "PostgreSQL",
		text: "PostgreSQL is the chosen relational database management system (RDBMS) for storing and managing the data used by our application.",
		usage: "Data storage and management.",
		link: "https://www.postgresql.org/",
	},
]);

const keyComponents = ref([
	{
		name: "Server",
		content:
			"The server component is the backbone of our system. It handles data storage, communication with the bracelet, and database operations. It's used for storing and retrieving vital data collected by the monitoring bracelet.",
		usage: "Data storage, communication hub.",
	},
	{
		name: "Case",
		content:
			"The case is the physical enclosure that houses the electronic components of the monitoring bracelet. It's designed to be durable and comfortable for the wearer, ensuring the safety of the components.",
		usage: "Protection and comfort for components.",
	},
	{
		name: "GSM Module",
		content:
			"The GSM module enables communication between the bracelet and the app's backend server. It allows for real-time data transmission and remote control features.",
		usage: "Real-time data transmission, remote control.",
	},
	{
		name: "GPS Module",
		content:
			"The GPS module provides location tracking capabilities for the monitoring bracelet. It helps caregivers and users keep track of the wearer's whereabouts.",
		usage: "Location tracking.",
	},
	{
		name: "Bluetooth Module",
		content:
			"The Bluetooth module, if integrated, enables connectivity with other devices, such as smartphones or tablets, for data synchronization and control.",
		usage: "Device connectivity and data synchronization (optional).",
	},
	{
		name: "Battery",
		content:
			"The battery is the power source for the monitoring bracelet. It provides the necessary energy to keep the bracelet functioning for extended periods.",
		usage: "Power source for the bracelet.",
	},
]);
</script>
