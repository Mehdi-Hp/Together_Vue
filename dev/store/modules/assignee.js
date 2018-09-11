import Vue from 'vue';

export default {
	namespaced: true,
	state: {
		data: []
	},
	getters: {},
	mutations: {
		setAll(state, assignees) {
			state.data = assignees;
		}
	},
	actions: {
		getAll({ state, commit }) {
			return new Promise((resolve, reject) => {
				Vue.$axios
					.get('/conversationassignees')
					.then((response) => {
						commit('setAll', response.data);
						resolve(response.data);
					})
					.catch((error) => {
						reject(error);
					});
			});
		}
	}
};
