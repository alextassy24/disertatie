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
import ViewData from "../views/ViewData.vue";
import RegisterProduct from "../views/RegisterProduct.vue";
import RegisterWearer from "../views/RegisterWearer.vue";
import MyProducts from "../views/MyProducts.vue";
import Product from "../views/Product.vue";
import MyProfile from "../views/MyProfile.vue";
import MyWearers from "../views/MyWearers.vue";
import Wearer from "../views/Wearer.vue";

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
        path: "/products/:id",
        name: "products",
        component: Product,
    },
    {
        path: "/profile",
        name: "profile",
        component: MyProfile,
    },
    {
        path: "/register-wearer",
        name: "register-wearer",
        component: RegisterWearer,
    },
    {
        path: "/my-wearers",
        name: "my-wearers",
        component: MyWearers,
    },
    {
        path: "/wearers/:id",
        name: "wearers",
        component: Wearer,
    },
    {
        path:"/confirm-email",
        name:"confirm-email",
        component:ConfirmEmail,
        props:(route)=>({token:route.query.token})
    },
    {
        path:"/recover-password",
        name:"recover-password",
        component:RecoverPassword,
        props:(route)=>({token:route.query.token})
    },
    {
        path:"/resend-email-confirmation",
        name:"resend-email-confirmation",
        component:ResendEmailConfirmation,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: 'active',
    linkExactActiveClass: 'active'
});

export default router;
