import Vue from 'vue';
import Vuex from 'vuex';
import type from './modules/type';
import assignee from './modules/assignee';

Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
		type,
		assignee
	},
	root: true
});

export default store;
