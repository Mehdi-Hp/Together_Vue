import Vue from 'vue';

export default {
	state: {
		data: []
	},
	getters: {},
	mutations: {
		setCategories(state, categories) {
			state.data = categories;
		}
	},
	actions: {
		getAllCategories({ state, commit }) {
			Vue.$axios
				.get('/conversationcategory')
				.then((response) => {
					commit('setCategories', response.data);
				})
				.catch((error) => {
					console.log(error.response);
				});
		}
	}
};
