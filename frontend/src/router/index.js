import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Faq from "../views/Faq.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import ChangePassword from "../views/ChangePassword.vue";
import RecoverPassword from "../views/RecoverPassword.vue";
import ConfirmEmail from "../views/ConfirmEmail.vue";
import ResendEmailConfirmation from "../views/ResendEmailConfirmation.vue";
import RegisterProduct from "../views/RegisterProduct.vue";
import RegisterWearer from "../views/RegisterWearer.vue";
import MyProducts from "../views/MyProducts.vue";
import Product from "../views/Product.vue";
import MyProfile from "../views/MyProfile.vue";
import MyWearers from "../views/MyWearers.vue";
import Wearer from "../views/Wearer.vue";
import NotFound from "../views/NotFound.vue";
import Docs from "../views/Docs.vue";

const routes = [
	{
		path: "/",
		name: "home",
		component: Home,
		meta: {
			title: "Home",
		},
	},
	{
		path: "/about",
		name: "about",
		component: About,
		meta: {
			title: "About",
		},
	},
	{
		path: "/faq",
		name: "faq",
		component: Faq,
		meta: {
			title: "FAQ",
		},
	},
	{
		path: "/docs",
		name: "docs",
		component: Docs,
		meta: {
			title: "Docs",
		},
	},
	{
		path: "/login",
		name: "login",
		component: Login,
		meta: {
			title: "Login",
		},
	},
	{
		path: "/register",
		name: "register",
		component: Register,
		meta: {
			title: "Register",
		},
	},
	{
		path: "/forgot-password",
		name: "forgot-password",
		component: ForgotPassword,
		meta: {
			title: "Forgot Password",
		},
	},
	{
		path: "/change-password",
		name: "change-password",
		component: ChangePassword,
		meta: {
			title: "Change Password",
		},
	},
	// {
	// 	path: "/view-data",
	// 	name: "view-data",
	// 	component: ViewData,
	// },
	{
		path: "/register-product",
		name: "register-product",
		component: RegisterProduct,
		meta: {
			title: "Register Product",
		},
	},
	{
		path: "/my-products",
		name: "my-products",
		component: MyProducts,
		meta: {
			title: "My Products",
		},
	},
	{
		path: "/products/:id",
		name: "products",
		component: Product,
		meta: {
			title: "Product",
		},
	},
	{
		path: "/profile",
		name: "profile",
		component: MyProfile,
		meta: {
			title: "My Profile",
		},
	},
	{
		path: "/register-wearer",
		name: "register-wearer",
		component: RegisterWearer,
		meta: {
			title: "Register Wearer",
		},
	},
	{
		path: "/my-wearers",
		name: "my-wearers",
		component: MyWearers,
		meta: {
			title: "My Wearers",
		},
	},
	{
		path: "/wearers/:id",
		name: "wearers",
		component: Wearer,
		meta: {
			title: "Wearer",
		},
	},
	{
		path: "/confirm-email",
		name: "confirm-email",
		component: ConfirmEmail,
		props: (route) => ({ token: route.query.token }),
		meta: {
			title: "Confirm Email",
		},
	},
	{
		path: "/recover-password",
		name: "recover-password",
		component: RecoverPassword,
		props: (route) => ({ token: route.query.token }),
		meta: {
			title: "Recover Password",
		},
	},
	{
		path: "/resend-email-confirmation",
		name: "resend-email-confirmation",
		component: ResendEmailConfirmation,
		meta: {
			title: "Resend Email Confirmation",
		},
	},
	{
		path: "/:catchAll(.*)",
		name: "NotFound",
		component: NotFound,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
	linkActiveClass: "active",
	linkExactActiveClass: "active",
	scrollBehavior(to, from, savedPosition) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve({ left: 0, top: 0 });
			}, 500);
		});
	},
});

router.beforeEach((to, from) => {
	document.title = to.meta?.title ?? "Disertație";
});

export default router;
