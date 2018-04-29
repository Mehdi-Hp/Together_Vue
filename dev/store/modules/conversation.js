import Vue from 'vue';

export default {
	state: {
		data: {}
	},
	getters: {},
	mutations: {
		addConversation(state, payload) {
			state.data = payload;
		}
	},
	actions: {
		createConversation({ state, commit }, { title, description, typeId, assigneeId }) {
			return new Promise((resolve, reject) => {
				Vue.$axios
					.post('/conversation', {
						title,
						description,
						typeId,
						assigneeId
					})
					.then(({ data: conversationId }) => {
						commit('addConversation', {
							title,
							description,
							typeId,
							assigneeId,
							conversationId
						});
					})
					.catch((error) => {
						console.error(error);
					});
			});
		},
		getConversation({ state, commit }, conversationId) {
			return new Promise((resolve, reject) => {
				Vue.$axios
					.get(`/conversation/${conversationId}`)
					.then(({ title, description, typeId, assigneeId, conversationId }) => {
						commit('addConversation', {
							title,
							description,
							typeId,
							assigneeId,
							conversationId
						});
					})
					.catch((error) => {
						console.error(error);
					});
			});
		}
	}
};
