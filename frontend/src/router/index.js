import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Faq from "../views/Faq.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import ViewData from "../views/ViewData.vue";

const routes = [
	{
		path: "/",
		name: "home",
		component: Home,
	},
	{
		path: "/about",
		name: "about",
		component: About,
	},
	{
		path: "/faq",
		name: "faq",
		component: Faq,
	},
	{
		path: "/login",
		name: "login",
		component: Login,
	},
	{
		path: "/register",
		name: "register",
		component: Register,
	},
	{
		path: "/forgot-password",
		name: "forgot-password",
		component: ForgotPassword,
	},
	{
		path: "/view-data",
		name: "view-data",
		component: ViewData,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
