import Vue from 'vue';
import Vuex from 'vuex';
import { getUserCookie, removeUserCookie, setCookie } from '../util/userCookie';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        collapsed: false,
        user: getUserCookie(),
        menuRoutes: [],
    },
    mutations: {
        changeCollapsed(state) {
            state.collapsed = !state.collapsed;
        },
        setUserInfo(state, userInfo) {
            state.user = userInfo;
        },
        logout(state) {
            state.user = {
                username: '',
                appkey: '',
                role: '',
                email: '',
            };
        },
        changeMenuRoutes(state, routes) {
            state.menuRoutes = routes;
        },
    },
    actions: {
        changeCollapsed({ commit }) {
            commit('changeCollapsed');
        },
        setUserInfo({ commit }, userInfo) {
            if (userInfo.role == "") {
                userInfo.role = "admin"
            }
            commit('setUserInfo', userInfo);
            setCookie(userInfo);
        },
        logout({ commit }) {
            commit('logout');
            removeUserCookie();
        },
        changeMenuRoutes({ commit }, routes) {
            commit('changeMenuRoutes', routes);
        },
    },
    modules: {},
});