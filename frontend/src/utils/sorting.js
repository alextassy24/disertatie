// utils/sorting.js
import { computed } from "vue";

export function useSortedArray(array, sortByRef, sortDirectionRef) {
	return computed(() => {
		return array.slice().sort((a, b) => {
			if (sortByRef.value === "name") {
				return sortDirectionRef.value === "ascending"
					? a.name.localeCompare(b.name)
					: b.name.localeCompare(a.name);
			} else if (sortByRef.value === "price") {
				return sortDirectionRef.value === "ascending"
					? a.price - b.price
					: b.price - a.price;
			}
		});
	});
}
