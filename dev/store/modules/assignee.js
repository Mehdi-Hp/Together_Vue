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
			Vue.$axios
				.get('/conversationassignees')
				.then((response) => {
					commit('setAssignees', response.data);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}
};
