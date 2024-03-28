<template>
	<Teleport to="body">
		<Transition name="modal-outer">
			<div
				v-show="modalActive"
				class="fixed top-0 left-0 z-40 flex items-center justify-center w-screen h-screen overflow-auto bg-black bg-opacity-60"
			>
				<Transition name="modal-inner">
					<div
						v-if="modalActive"
						class="max-w-screen-md p-1 rounded-lg"
					>
						<div class="flex justify-end mb-3">
							<span
								class="modal-close-btn"
								@click="$emit('close-modal')"
								><i class="fa-solid fa-xmark"></i
							></span>
						</div>
						<div
							v-if="isMediumScreenOrAbove"
							class="flex flex-col items-center"
						>
							<div
								class="flex items-center justify-center gap-3 mb-5"
							>
								<button
									class="btn-primary"
									@click="prevImage"
									:class="{
										'btn-disabled': photoIndex == 0,
									}"
									:disabled="photoIndex == 0"
								>
									<i class="fa-solid fa-chevron-left"></i>
								</button>
								<img
									:src="photoAddress"
									class="w-5/6 mx-auto rounded-xl"
								/>
								<button
									class="btn-primary"
									@click="nextImage"
									:class="{
										'btn-disabled':
											photoIndex ==
											modalImages.length - 1,
									}"
									:disabled="
										photoIndex == modalImages.length - 1
									"
								>
									<i class="fa-solid fa-chevron-right"></i>
								</button>
							</div>

							<span class="font-bold text-white"
								>{{ photoIndex + 1 }} /
								{{ modalImages.length }}</span
							>
						</div>
						<div
							v-if="isSmallScreen"
							class="flex flex-col items-center justify-center gap-3"
						>
							<img
								:src="photoAddress"
								class="w-5/6 mx-auto rounded-xl"
							/>
							<div class="flex items-center gap-10">
								<button
									class="btn-primary"
									@click="prevImage"
									:class="{
										'btn-disabled': photoIndex == 0,
									}"
									:disabled="photoIndex == 0"
								>
									<i class="fa-solid fa-chevron-left"></i>
								</button>
								<span class="font-bold text-white"
									>{{ photoIndex + 1 }} /
									{{ modalImages.length }}</span
								>
								<button
									class="btn-primary"
									@click="nextImage"
									:class="{
										'btn-disabled':
											photoIndex ==
											modalImages.length - 1,
									}"
									:disabled="
										photoIndex == modalImages.length - 1
									"
								>
									<i class="fa-solid fa-chevron-right"></i>
								</button>
							</div>
						</div>
					</div>
				</Transition>
			</div>
		</Transition>
	</Teleport>
</template>

<script setup>
	import {
		Teleport,
		Transition,
		ref,
		defineProps,
		defineEmits,
		watch,
	} from "vue";

	defineEmits(["close-modal"]);

	const props = defineProps({
		modalImageId: Number,
		modalImage: String,
		modalImages: Array,
		modalActive: Boolean,
		isSmallScreen: Boolean,
		isMediumScreenOrAbove: Boolean,
	});

	const photoIndex = ref(props.modalImageId);
	const photoAddress = ref(props.modalImage);

	watch(
		() => props.modalImageId,
		(newValue) => {
			photoIndex.value = newValue;
			// console.log(photoIndex.value);
		}
	);

	watch(
		() => props.modalImage,
		(newValue) => {
			photoAddress.value = newValue;
			// console.log(photoAddress.value);
		}
	);

	const prevImage = () => {
		if (photoIndex.value - 1 > 0) {
			photoIndex.value -= 1;
		} else {
			photoIndex.value = 0;
		}
		// console.log("Initial address: " + photoAddress.value);
		// console.log(photoAddress.value);
		photoAddress.value = props.modalImages[photoIndex.value].image;
		// console.log("Modified address: " + photoAddress.value);
		// console.log(photoAddress.value);
	};

	const nextImage = () => {
		if (photoIndex.value + 1 < props.modalImages.length - 1) {
			photoIndex.value += 1;
		} else {
			photoIndex.value = props.modalImages.length - 1;
		}
		// console.log("Initial address: " + photoAddress.value);
		// console.log(photoAddress.value);
		photoAddress.value = props.modalImages[photoIndex.value].image;
		// console.log("Modified address: " + photoAddress.value);
		// console.log(photoAddress.value);
	};
</script>

<style scoped>
	.modal-outer-enter-active,
	.modal-outer-leave-active {
		transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
	}

	.modal-outer-enter-from,
	.modal-outer-leave-to {
		opacity: 0;
	}

	.modal-inner-enter-active {
		transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
	}

	.modal-inner-leave-active {
		transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
	}

	.modal-inner-enter-from {
		opacity: 0;
		transform: scale(0.8);
	}

	.modal-inner-leave-to {
		transform: scale(0.8);
	}

	.modal-close-btn {
		@apply px-3 py-2 text-white transition duration-500 ease-in-out transform bg-green-500 rounded-full hover:cursor-pointer hover:text-black hover:scale-125;
	}
</style>
