<template>
	<div
		class="flex items-center gap-3 mx-2 mt-1 mb-4 text-lg"
		:class="link ? 'justify-between' : 'justify-end'"
	>
		<div>
			<label>{{ translatedValues.show }}</label>
			<select
				class="p-1 mx-2 bg-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
				v-model="itemsPerPage"
			>
				<option value="5">5</option>
				<option value="10">10</option>
				<option value="20">20</option>
				<option value="50">50</option>
			</select>
			<label>{{ translatedValues.perPage }}</label>
		</div>
		<div>
			<router-link
				v-if="link"
				:to="link"
				class="flex items-center gap-2 btn"
			>
				<i class="fa-solid fa-plus"></i>
				<span class="hidden lg:inline">{{ translatedValues.add }}</span>
			</router-link>
		</div>
	</div>
	<div class="overflow-x-scroll shadow lg:overflow-x-hidden rounded-xl">
		<!-- Table -->
		<table class="min-w-full divide-y divide-gray-200">
			<!-- Table headers -->
			<thead>
				<tr class="text-white bg-black">
					<th
						v-for="(header, index) in headers"
						:key="index"
					>
						{{ header }}
					</th>
					<th></th>
				</tr>
			</thead>
			<!-- Table body -->
			<transition-group
				name="fade"
				tag="tbody"
				class="text-center"
			>
				<tr
					v-for="(item, index) in paginatedItems"
					:key="index"
				>
					<td
						v-for="(value, key) in item"
						:key="key"
					>
						{{ value }}
					</td>
					<td
						class="flex flex-col items-center justify-center gap-3 lg:flex-row"
					>
						<router-link
							v-if="itemPage"
							:to="`/${itemPage}/${item.id}`"
							class="btn-primary"
							tag="button"
						>
							<i class="fa-solid fa-eye"></i>
						</router-link>
						<button
							v-else
							class="btn-primary"
							@click="action(item.id)"
						>
							<i class="fa-solid fa-eye"></i>
						</button>
						<button
							v-if="deleteBtn"
							class="btn-danger"
							@click="action(item.id)"
						>
							<i class="fa-solid fa-trash-can"></i>
						</button>
					</td>
				</tr>
			</transition-group>
		</table>
	</div>
	<!-- Pagination buttons -->
	<div class="flex items-center justify-between m-3 mt-5">
		<div class="flex gap-3">
			<button
				class="flex items-center gap-1"
				@click="goToPage(1)"
				:class="currentPage == 1 ? 'btn-disabled' : 'pagination-btn'"
			>
				<i class="fa-solid fa-backward-fast"></i>
				<span class="hidden lg:block">{{ translatedValues.firstBtn }}</span>
			</button>
			<button
				class="flex items-center gap-1"
				@click="goToPage(currentPage - 1)"
				:disabled="currentPage == 1"
				:class="currentPage == 1 ? 'btn-disabled' : 'pagination-btn'"
			>
				<i class="fa-solid fa-backward-step"></i>
				<span class="hidden lg:block">{{ translatedValues.previousBtn }}</span>
			</button>
		</div>
		<div class="hidden lg:inline-block">
			<span>{{ translatedValues.tablePage }}</span>
			{{ currentPage }} {{ translatedValues.tableOf }} {{ totalPages }}
		</div>
		<div class="flex gap-3">
			<button
				class="flex items-center gap-1"
				@click="goToPage(currentPage + 1)"
				:class="currentPage == totalPages ? 'btn-disabled' : 'pagination-btn'"
				:disabled="currentPage == totalPages"
			>
				<span class="hidden lg:block">{{ translatedValues.nextBtn }}</span>
				<i class="fa-solid fa-forward-step"></i>
			</button>
			<button
				class="flex items-center gap-1"
				@click="goToPage(totalPages)"
				:disabled="currentPage == totalPages"
				:class="currentPage == totalPages ? 'btn-disabled' : 'pagination-btn'"
			>
				<span class="hidden lg:block">{{ translatedValues.lastBtn }}</span>
				<i class="fa-solid fa-forward-fast"></i>
			</button>
		</div>
	</div>

	<div class="block text-center lg:hidden">
		<span>{{ translatedValues.tablePage }}</span>
		{{ currentPage }} {{ translatedValues.tableOf }} {{ totalPages }}
	</div>
</template>

<script setup>
	import { ref, computed } from "vue";
	import { useI18n } from "vue-i18n";

	const props = defineProps({
		headers: {
			type: Array,
			required: true,
		},
		items: {
			type: Array,
			required: true,
		},
		page: {
			type: String,
			required: false,
		},
		action: {
			type: Function,
			required: true,
		},
		link: {
			type: String,
			required: false,
		},
		itemPage: {
			type: String,
			required: false,
		},
		viewModal: {
			type: Boolean,
			required: false,
		},
		deleteBtn: {
			type: Boolean,
			required: false,
		},
	});

	const { t } = useI18n();
	const currentPage = ref(1);
	const itemsPerPage = ref(5);

	const paginatedItems = computed(() => {
		const startIndex = (currentPage.value - 1) * itemsPerPage.value;
		const endIndex = startIndex + itemsPerPage.value;
		return props.items.slice(startIndex, endIndex);
	});

	const totalPages = computed(() =>
		Math.ceil(props.items.length / itemsPerPage.value)
	);

	const goToPage = (page) => {
		if (page >= 1 && page <= totalPages.value) {
			currentPage.value = page;
		}
	};

	const translatedValues = computed(() => {
		return {
			deleteItem: props.page ? t(`${props.page}.DeleteItem`) : null,
			tablePage: t("view-data.TablePage"),
			tableOf: t("view-data.TableOf"),
			firstBtn: t("view-data.FirstBtn"),
			previousBtn: t("view-data.PreviousBtn"),
			nextBtn: t("view-data.NextBtn"),
			lastBtn: t("view-data.LastBtn"),
			show: t("view-data.Show"),
			perPage: props.page ? t(`${props.page}.PerPage`) : null,
			add: t("utils.Add"),
		};
	});
</script>

<style scoped>
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.5s;
	}

	.fade-enter,
	.fade-leave-to {
		opacity: 0;
	}
</style>
