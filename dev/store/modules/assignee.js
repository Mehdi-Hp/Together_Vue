import Vue from 'vue';

export default {
	state: {
		data: []
	},
	getters: {},
	mutations: {
		setAssignees(state, assignees) {
			state.data = assignees;
		}
	},
	actions: {
		getAllAssignees({ state, commit }) {
			return new Promise((resolve, reject) => {
				Vue.$axios
					.get('/conversationassignees')
					.then((response) => {
						commit('setAssignees', response.data);
						resolve(response.data);
					})
					.catch((error) => {
						reject(error);
					});
			});
		}
	}
};
