<template>
	<div class="mt-28">
		<Hero :title="title" :subtitle="subtitle" />
		<section class="px-10 py-16 bg-gray-100">
			<div>
				<h1 class="mb-5 text-2xl font-bold">Last known positions</h1>
				<table class="min-w-full text-center divide-y divide-gray-200">
					<thead>
						<tr>
							<th class="table-header">Index</th>
							<th class="table-header">Date</th>
							<th class="table-header">Time</th>
							<th class="table-header">Latitude</th>
							<th class="table-header">Longitude</th>
							<th class="table-header">Actions</th>
						</tr>
					</thead>
					<tbody class="bg-white divide-y divide-gray-200">
						<tr>
							<td class="table-data">1</td>
							<td class="table-data">24.04.2023</td>
							<td class="table-data">19:23</td>
							<td class="table-data">44.4409° N</td>
							<td class="table-data">26.0493° E</td>
							<td class="flex flex-row gap-2">
								<button class="edit-btn">Edit</button>
								<button class="remove-btn">Remove</button>
							</td>
						</tr>
						<tr>
							<td class="table-data">2</td>
							<td class="table-data">24.04.2023</td>
							<td class="table-data">19:28</td>
							<td class="table-data">44.4409° N</td>
							<td class="table-data">26.0493° E</td>
							<td class="flex flex-row gap-2">
								<button class="edit-btn">Edit</button>
								<button class="remove-btn">Remove</button>
							</td>
						</tr>
						<tr>
							<td class="table-data">3</td>
							<td class="table-data">24.04.2023</td>
							<td class="table-data">19:33</td>
							<td class="table-data">44.4409° N</td>
							<td class="table-data">26.0493° E</td>
							<td class="flex flex-row items-center gap-2">
								<button class="edit-btn">Edit</button>
								<button class="remove-btn">Remove</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>
	</div>
</template>

<script setup>
import { ref } from "vue";
import Hero from "../components/Hero.vue";

const title = ref("View real time positioning");
const subtitle = ref("");
</script>

<style scoped>
.edit-btn {
	@apply bg-blue-500 text-white py-2 shadow rounded focus:ring-blue-400 hover:ring-blue-400 hover:ring-4  transition duration-500 ease-in-out transform px-5;
}
.remove-btn {
	@apply bg-red-500 text-black py-2 shadow rounded focus:ring-red-400 hover:ring-red-400 hover:ring-4 transition duration-500 ease-in-out transform px-5;
}
.table-header {
	@apply px-6 py-3 text-xs font-medium leading-4 tracking-wider text-gray-500 uppercase bg-gray-50;
}
.table-data {
	@apply px-6 py-4;
}
</style>
