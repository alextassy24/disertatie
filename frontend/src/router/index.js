import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Faq from "../views/Faq.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import ChangePassword from "../views/ChangePassword.vue";
import ViewData from "../views/ViewData.vue";
import RegisterProduct from "../views/RegisterProduct.vue";
import MyProducts from "../views/MyProducts.vue";
import MyProfile from "../views/MyProfile.vue";
import MyWearers from "../views/MyWearers.vue";

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
        path: "/change-password",
        name: "change-password",
        component: ChangePassword,
    },
    {
        path: "/view-data",
        name: "view-data",
        component: ViewData,
    },
    {
        path: "/register-product",
        name: "register-product",
        component: RegisterProduct,
    },
    {
        path: "/my-products",
        name: "my-products",
        component: MyProducts,
    },
    {
        path: "/profile",
        name: "profile",
        component: MyProfile,
    },
    {
        path: "/my-wearers",
        name: "my-wearers",
        component: MyWearers,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: 'active',
    linkExactActiveClass: 'active'
});

export default router;
