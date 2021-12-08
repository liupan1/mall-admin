import VCharts from 'v-charts';
import Vue from 'vue';
import App from './App.vue';
import './assets/css/reset.less';
import './plugins/ant-design-vue';
import router from './router';
import store from './store';

Vue.use(VCharts)
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');