<template>
	<footer class="py-6 text-white bg-black">
		<div class="container flex flex-col items-center mx-auto">
			<div class="flex flex-col items-start justify-between w-full md:flex-row">
				<div
					class="flex flex-row items-center gap-5 p-4 mx-5 mb-5 text-black bg-white rounded-lg md:mb-0"
				>
					<a href="https://www.fiir.upb.ro/index.php/ro/">
						<img
							src="../assets/fiir.png"
							alt="Logo"
							class="object-contain w-24 h-24 mb-4"
						/>
					</a>
					<div>
						<h2 class="text-2xl font-bold">Universitatea Politehnica din București</h2>
						<h2 class="text-2xl font-bold">
							Facultatea de Inginerie Industrială și Robotică
						</h2>
						<p class="font-bold text-center">2022-2024</p>
					</div>

					<a href="https://upb.ro/">
						<img
							src="../assets/upb.png"
							alt="Logo"
							class="object-contain w-24 h-24 mb-4 bg-white rounded-full"
						/>
					</a>
				</div>

				<div class="grid grid-cols-1 mx-5 lg:grid-cols-2">
					<div class="mb-3 lg:mb-0">
						<h1 class="text-2xl font-bold">Titlul lucrării</h1>
						<p>Dispozitiv pentru localizarea persoanelor cu nevoi speciale</p>
					</div>
					<div>
						<h1 class="text-2xl font-bold">Profesor Coordonator</h1>
						<p class="mb-3 md:mb-2">Prof. Dr. Ing. Nicolae Ionescu</p>
						<h1 class="text-2xl font-bold">Studenti</h1>
						<ul class="list-none list-inside">
							<li>Gabriela Bucur</li>
							<li>Andrei Drimba</li>
							<li>ing. Tanase Alexandru</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="mt-4">
				<p>&copy; {{ currentYear }} Monitoring Bracelet Project</p>
			</div>
		</div>
	</footer>
</template>

<script setup>
import { ref } from "vue";

const currentYear = ref(new Date().getFullYear());
</script>

<style scoped></style>
