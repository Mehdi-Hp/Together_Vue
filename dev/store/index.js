import Vue from 'vue';
import Vuex from 'vuex';
import category from './modules/category';
import assignee from './modules/assignee';

Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
		category,
		assignee
	},
	root: true
});

export default store;
