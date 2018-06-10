import Vue from 'vue';
import Vuex from 'vuex';
import type from './modules/type';
import assignee from './modules/assignee';
import conversation from './modules/conversation';

Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
		type,
		assignee,
		conversation
	},
	root: true
});

export default store;
