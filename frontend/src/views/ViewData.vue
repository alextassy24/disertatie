<template>
	<div class="mt-28">
		<Hero :title="translatedValues.title" />
		<section class="px-10 py-16 bg-gray-100">
			<div
				class="flex flex-col items-center gap-20 lg:flex-row lg:justify-center lg:items-start"
			>
				<div>
					<div class="flex items-center justify-between">
						<h1 class="mb-5 text-2xl font-bold">
							{{ translatedValues.knownPositions }}
						</h1>
						<div class="flex items-center gap-3">
							<label>{{ translatedValues.show }}</label>
							<select>
								<option value="5">5</option>
								<option value="10">10</option>
								<option value="20">20</option>
								<option value="50">50</option>
							</select>
							<label>{{ translatedValues.perPage }}</label>
						</div>
					</div>

					<table class="text-center divide-y divide-gray-200">
						<thead>
							<tr>
								<th class="table-header">Index</th>
								<th class="table-header">{{ translatedValues.tableDate }}</th>
								<th class="table-header">{{ translatedValues.tableTime }}</th>
								<th class="table-header">{{ translatedValues.tableLatitude }}</th>
								<th class="table-header">{{ translatedValues.tableLongitude }}</th>
								<th class="table-header">{{ translatedValues.tableActions }}</th>
							</tr>
						</thead>
						<tbody class="bg-white divide-y divide-gray-200">
							<tr class="align-middle">
								<td class="table-data">1</td>
								<td class="table-data">24.04.2023</td>
								<td class="table-data">19:23</td>
								<td class="table-data">44,4626° N</td>
								<td class="table-data">26,0737° E</td>
								<td class="table-data">
									<button class="view-btn">
										{{ translatedValues.tableBtn }}
									</button>
								</td>
							</tr>
							<tr class="align-middle">
								<td class="table-data">2</td>
								<td class="table-data">24.04.2023</td>
								<td class="table-data">19:28</td>
								<td class="table-data">44.4409° N</td>
								<td class="table-data">26.0493° E</td>
								<td class="table-data">
									<button class="view-btn">
										{{ translatedValues.tableBtn }}
									</button>
								</td>
							</tr>
							<tr class="align-middle">
								<td class="table-data">3</td>
								<td class="table-data">24.04.2023</td>
								<td class="table-data">19:33</td>
								<td class="table-data">44.4409° N</td>
								<td class="table-data">26.0493° E</td>
								<td class="table-data">
									<button class="view-btn">
										{{ translatedValues.tableBtn }}
									</button>
								</td>
							</tr>
							<tr class="align-middle">
								<td class="table-data">4</td>
								<td class="table-data">24.04.2023</td>
								<td class="table-data">19:38</td>
								<td class="table-data">44.4409° N</td>
								<td class="table-data">26.0493° E</td>
								<td class="table-data">
									<button class="view-btn">
										{{ translatedValues.tableBtn }}
									</button>
								</td>
							</tr>
							<tr class="align-middle">
								<td class="table-data">5</td>
								<td class="table-data">24.04.2023</td>
								<td class="table-data">19:43</td>
								<td class="table-data">44.4409° N</td>
								<td class="table-data">26.0493° E</td>
								<td class="table-data">
									<button class="view-btn">
										{{ translatedValues.tableBtn }}
									</button>
								</td>
							</tr>
						</tbody>
					</table>

					<div class="flex items-center justify-between mt-5">
						<div class="flex gap-3">
							<button class="flex items-center gap-1 pagination-btn">
								<i class="fa-solid fa-backward-fast"></i>
								<span>{{ translatedValues.firstBtn }}</span>
							</button>
							<button class="flex items-center gap-1 pagination-btn">
								<i class="fa-solid fa-backward-step"></i>
								<span>{{ translatedValues.previousBtn }}</span>
							</button>
						</div>
						<div>
							{{ translatedValues.tablePage }} x {{ translatedValues.tableOf }} y
						</div>
						<div class="flex gap-3">
							<button class="flex items-center gap-1 pagination-btn">
								<span>{{ translatedValues.nextBtn }}</span>
								<i class="fa-solid fa-forward-step"></i>
							</button>
							<button class="flex items-center gap-1 pagination-btn">
								<span>{{ translatedValues.lastBtn }}</span>
								<i class="fa-solid fa-forward-fast"></i>
							</button>
						</div>
					</div>
				</div>
				<div>
					<h1 class="mb-5 text-2xl font-bold">
						{{ translatedValues.realTimePostioning }}({{
							translatedValues.refreshing
						}}
						5 {{ translatedValues.seconds }})
					</h1>
					<iframe
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2847.56423417012!2d26.071485650230564!3d44.462606007630896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b202196f208795%3A0x1c10b3b1f9755fe1!2sInstitutul%20Na%C8%9Bional%20de%20Cercetare-Dezvoltare%20%C3%AEn%20Informatic%C4%83!5e0!3m2!1sro!2sro!4v1654581572288!5m2!1sro!2sro"
						frameborder="0"
						scrolling="no"
						marginheight="0"
						marginwidth="0"
						style="width: 100%; border-radius: 20px; height: 360px"
						allowfullscreen=""
					></iframe>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup>
import { ref, computed } from "vue";
import Hero from "../components/Hero.vue";

import { useI18n } from "vue-i18n";
const { t } = useI18n();

const translatedValues = computed(() => {
	return {
		title: t("view-data.Title"),
		realTimePostioning: t("view-data.RealTimePostioning"),
		refreshing: t("view-data.Refreshing"),
		seconds: t("view-data.Seconds"),
		knownPositions: t("view-data.KnownPositions"),
		show: t("view-data.Show"),
		perPage: t("view-data.PerPage"),
		tableDate: t("view-data.TableDate"),
		tableTime: t("view-data.TableTime"),
		tableLatitude: t("view-data.TableLatitude"),
		tableLongitude: t("view-data.TableLongitude"),
		tableActions: t("view-data.TableActions"),
		tableBtn: t("view-data.TableBtn"),
		tablePage: t("view-data.TablePage"),
		tableOf: t("view-data.TableOf"),
		firstBtn: t("view-data.FirstBtn"),
		previousBtn: t("view-data.PreviousBtn"),
		nextBtn: t("view-data.NextBtn"),
		lastBtn: t("view-data.LastBtn"),
	};
});
</script>

<style scoped>
.view-btn {
	@apply bg-green-500 text-white py-2 shadow rounded focus:ring-green-300 hover:ring-green-300 hover:ring-4  transition duration-500 ease-in-out transform px-5;
}
.pagination-btn {
	@apply bg-black text-white py-2 shadow rounded focus:ring-green-300 hover:ring-green-300 hover:text-green-300 hover:ring-4 transition duration-500 ease-in-out transform px-5;
}
.table-header {
	@apply px-6 py-3 text-xs font-medium leading-4 tracking-wider text-gray-500 uppercase bg-gray-50;
}
.table-data {
	@apply px-6 py-4;
}
tr:hover {
	@apply opacity-90;
}
</style>
