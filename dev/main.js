/* eslint-disable no-new */
/* eslint-disable arrow-body-style */
import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import SimpleVueValidation from 'simple-vue-validator';
import VueLocalStorage from 'vue-ls';
import App from './App.vue';
import Routes from './routes';
import store from './store/index';
import EventBus from './EventBus';

import Keynote from './components/Keynote.vue';

Vue.use(VueAxios, axios);
Object.defineProperty(Vue, '$axios', { value: axios });
Vue.$axios.defaults.baseURL = '/api';

Vue.use(SimpleVueValidation);
Vue.prototype.$validator = SimpleVueValidation.Validator;

Vue.prototype.$bus = EventBus;

Vue.use(VueLocalStorage);

Vue.use(VueRouter);
const router = new VueRouter({
	mode: 'history',
	routes: Routes,
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition;
		}
		return {
			x: 0,
			y: 0
		};
	}
});

Vue.component('Keynote', Keynote);

new Vue({
	el: '#app',
	render: (h) => h(App),
	store,
	router,
	performance: true,
	productionTip: false
});
