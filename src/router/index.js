import store from '@/store';
import getMenuRoutes from '@/util/permission';
import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Layout/Home.vue';
import Login from '../views/Layout/Login.vue';
import Logon from "../views/Layout/Logon.vue";
Vue.use(VueRouter);
const asyncRouterMap = [{
    path: '/product',
    name: 'Product',
    meta: {
        title: '商品',
        icon: 'inbox',
        hidden: false,
    },
    component: Home,
    children: [{
        path: 'list',
        name: 'ProductList',
        meta: {
            title: '商品列表',
            icon: 'unordered-list',
            hidden: false,
        },
        component: () =>
            import ('@/views/page/productList.vue'),
    }, {
        path: 'add',
        name: 'ProductAdd',
        meta: {
            title: '添加商品',
            icon: 'file-add',
            hidden: false,
        },
        component: () =>
            import ('@/views/page/productAdd.vue'),
    }, {
        path: 'edit/:id',
        name: 'ProductEdit',
        meta: {
            title: '编辑商品',
            icon: 'file-add',
            hidden: true,
        },
        component: () =>
            import ('@/views/page/productAdd.vue'),
    }, {
        path: 'category',
        name: 'Category',
        meta: {
            title: '类目管理',
            icon: 'project',
            hidden: true,
        },
        component: () =>
            import ('@/views/page/category.vue'),
    }],
}];

const routes = [{
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            title: '首页',
            hidden: false,
            icon: 'home',
        },
        children: [{
            path: 'index',
            name: 'Index',
            meta: {
                title: '统计',
                icon: 'number',
                hidden: false,
            },
            component: () =>
                import ('../views/page/index.vue'),
        }],
    },

    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            title: '登录',
            hidden: true,
        },
    },

    {
        path: '/logon',
        name: 'Logon',
        component: Logon,
        meta: {
            title: '注册',
            hidden: true,
        },
    },
];

const router = new VueRouter({
    mode: "history",
    routes,
});
let isAddRoutes = false;
router.beforeEach((to, from, next) => {
    if (to.path == '/logon') {
        return next()
    }
    if (to.path !== '/login') {
        if (store.state.user.appkey && store.state.user.username) {
            if (!isAddRoutes) {
                const menuRoutes = getMenuRoutes(store.state.user.role, asyncRouterMap);

                store.dispatch('changeMenuRoutes', routes.concat(menuRoutes)).then(() => {
                    menuRoutes.forEach((item) => {
                        router.addRoute(item)
                    })
                })
                isAddRoutes = true;
            }
            return next();
        }
        return next('/login');
    }
    return next();
});
export default router;