<script setup>
    import Navbar from "./components/Navbar.vue";
    import Footer from "./components/Footer.vue";
</script>

<template>
    <div class="app-container">
        <Navbar />
        <main class="flex-grow scroll-smooth">
            <router-view v-slot="{ Component }">
                <transition
                    name="fade"
                    mode="out-in"
                >
                    <component :is="Component" />
                </transition>
            </router-view>
        </main>
        <Footer />
    </div>
</template>

<style scoped>
    @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap");
    body {
        font-family: "Poppins", sans-serif;
    }
    .app-container {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    main {
        flex-grow: 1;
    }

    Footer {
        margin-top: auto;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.5s ease-out;
    }
    .bg-red-200 {
        background-color: #fcd5ce;
    }

    .text-red-400 {
        color: #ef4444;
    }

    .text-bold {
        font-weight: bold;
    }
</style>
