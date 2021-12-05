import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Layout/Home.vue';
import Login from "../views/Layout/Login.vue";
Vue.use(VueRouter);

const routes = [{
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: "/login",
        name: "Login",
        component: Login
    },
    {
        path: '/about',
        name: 'About',

        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue'),
    },
];

const router = new VueRouter({
    mode: 'history',
    routes,
});

export default router;