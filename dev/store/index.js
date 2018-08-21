import Vue from 'vue';
import Vuex from 'vuex';
import type from './modules/type';
import assignee from './modules/assignee';
import conversation from './modules/conversation';
import user from './modules/user';
import error from './modules/error';

Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
		type,
		assignee,
		conversation,
		user,
		error
	},
	root: true
});

export default store;
