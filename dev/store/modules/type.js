import Vue from 'vue';

export default {
	state: {
		data: []
	},
	getters: {},
	mutations: {
		setTypes(state, types) {
			state.data = types;
		}
	},
	actions: {
		getAllTypes({ state, commit }) {
			Vue.$axios
				.get('/conversationtype')
				.then((response) => {
					commit('setTypes', response.data);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}
};
