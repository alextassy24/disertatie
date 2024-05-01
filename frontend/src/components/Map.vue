<template>
	<div
		ref="mapContainer"
		class="map-container"
	></div>
</template>

<script setup>
	import { onMounted, ref, watch } from "vue";

	const props = defineProps({
		latitude: {
			type: Number,
			required: true,
		},
		longitude: {
			type: Number,
			required: true,
		},
	});

	const mapContainer = ref(null);
	let map = null;
	let marker = null;

	const loadMap = () => {
		if (!map && mapContainer.value) {
			// Initialize the map
			map = new google.maps.Map(mapContainer.value, {
				center: { lat: props.latitude, lng: props.longitude },
				zoom: 8,
			});

			// Place the marker
			marker = new google.maps.Marker({
				position: { lat: props.latitude, lng: props.longitude },
				map: map,
				title: "Location",
			});
		} else if (map && marker) {
			// Update the marker position
			const latLng = new google.maps.LatLng(
				props.latitude,
				props.longitude
			);
			marker.setPosition(latLng);
			map.setCenter(latLng);
		}
	};

	onMounted(loadMap);
	watch(() => [props.latitude, props.longitude], loadMap, {
		immediate: true,
	});
</script>

<style scoped>
	.map-container {
		height: 500px; /* Adjust height as needed */
		width: 100%; /* Adjust width as needed */
	}
</style>
