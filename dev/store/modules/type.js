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
			return new Promise((resolve, reject) => {
				Vue.$axios
					.get('/conversationtypes')
					.then((response) => {
						commit('setTypes', response.data);
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
