import Vue from 'vue';

export default {
	namespaced: true,
	state: {
		data: []
	},
	getters: {},
	mutations: {
		setAll(state, types) {
			state.data = types;
		}
	},
	actions: {
		getAll({ state, commit }) {
			return new Promise((resolve, reject) => {
				Vue.$axios
					.get('/conversationtypes')
					.then((response) => {
						commit('setAll', response.data);
						resolve(response.data);
					})
					.catch((error) => {
						console.log(error);
						reject(error);
					});
			});
		}
	}
};
