<template>
	<footer class="py-6 text-white bg-black">
		<div class="container flex flex-col items-center mx-auto">
			<div class="flex flex-col items-start justify-between w-full md:flex-row">
				<div class="flex flex-row items-center gap-5 p-4 mx-5 mb-5 text-black bg-white rounded-lg md:mb-0">
					<a class="hidden md:block" href="https://www.fiir.upb.ro/index.php/ro/">
						<img src="../assets/fiir.png" alt="Logo" class="object-contain w-24 h-24 mb-4" />
					</a>
					<div class="text-center">
						<h2 class="text-2xl font-bold">
							Universitatea Națională de Știință și Tehnologie POLITEHNICA București
						</h2>
						<h2 class="mb-3 text-2xl font-bold text-blue-900">
							Facultatea de Inginerie Industrială și Robotică
						</h2>
						<p class="font-bold text-center">2022-2024</p>
					</div>

					<a class="hidden md:block" href="https://upb.ro/">
						<img src="../assets/upb.png" alt="Logo"
							class="object-contain w-24 h-24 mb-4 bg-white rounded-full" />
					</a>
				</div>
				<div class="grid grid-cols-1 gap-3 mx-5 lg:grid-cols-2">
					<div class="mb-3 lg:mb-0">
						<h1 class="text-2xl font-bold">{{ translatedValues.paperTitle }}</h1>
						<p>{{ translatedValues.title }}</p>
					</div>
					<div>
						<h1 class="text-2xl font-bold">{{ translatedValues.coordinator }}</h1>
						<p class="mb-3 md:mb-2">Prof. Dr. Ing. Nicolae Ionescu</p>
						<h1 class="text-2xl font-bold">{{translatedValues.students}}</h1>
						<ul class="list-none list-inside">
							<li>Gabriela Bucur</li>
							<li>Andrei-Nicolae Drîmbă</li>
							<li>Ing. Tănase Alexandru</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="flex items-center justify-between w-full p-3 mt-3 bg-gray-900 sm:bg-black">
				<p class="font-bold">&copy; {{ currentYear }} FIND-ER® Project</p>
				<div class="flex items-center gap-4 p-2 bg-white rounded-2xl">
					<span class="font-bold text-black">Social: </span>
					<a class="text-blue-700 footer-link" target="_blank"
						href="https://www.linkedin.com/in/alexandru-t%C4%83nase-3114b91b4/"><i
							class="fa-brands fa-linkedin"></i></a>
					<a class="text-black footer-link" target="_blank" href="https://github.com/alextassy24"><i
							class="fa-brands fa-github"></i></a>
				</div>
			</div>
		</div>
	</footer>
</template>

<script setup>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";

const currentYear = ref(new Date().getFullYear());
const { t } = useI18n();

const translatedValues = computed(() => {
	return {
		paperTitle: t("footer.PaperTitle"),
		title: t("footer.Title"),
		coordinator: t("about.Coordinator"),
		students: t("about.Students"),
	};
});
</script>

<style scoped>
.footer-link {
	@apply text-2xl transition duration-300 ease-in-out hover:scale-125 hover:shadow-lg;
}
</style>
