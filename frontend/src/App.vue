<script setup>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
</script>

<template class="scroll-smooth">
	<Navbar />
	<router-view></router-view>
	<Footer />
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap");
body {
	font-family: "Poppins", sans-serif;
}
</style>
