import { ref, computed, onMounted, onUnmounted } from "vue";

export function useScreenSize() {
	const screenWidth = ref(window.innerWidth);
	const breakpoints = {
		sm: 640,
		md: 768,
		lg: 1024,
		xl: 1280,
		xxl: 1536,
	};

	const checkScreenSize = () => {
		screenWidth.value = window.innerWidth;
	};
	const isSmallScreen = computed(() => screenWidth.value < breakpoints.md);
	const isMediumScreenOrAbove = computed(
		() => screenWidth.value >= breakpoints.md
	);
	const isLargeScreenOrAbove = computed(
		() => screenWidth.value >= breakpoints.lg
	);

	onMounted(() => {
		window.addEventListener("resize", checkScreenSize);
	});

	onUnmounted(() => {
		window.removeEventListener("resize", checkScreenSize);
	});

	return {
		isLargeScreenOrAbove,
		isSmallScreen,
		isMediumScreenOrAbove,
		screenWidth,
	};
}
