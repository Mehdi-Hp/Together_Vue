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
						categoryId: typeId,
						assigneeId
					})
					.then(({ data: { id: { conversationId } } }) => {
						commit('addConversation', {
							title,
							description,
							typeId,
							assigneeId,
							conversationId
						});
					})
					.catch(({ response }) => {
						console.error(response);
					});
			});
		},
		getConversation({ state, commit }, conversationId) {
			return new Promise((resolve, reject) => {
				Vue.$axios
					.get(`/conversation/${conversationId}`)
					.then(({ data: { id, number, subject, type, state, tags, assignee, creationDate, events } }) => {
						const newConversation = {
							id,
							number,
							creationDate,
							title: subject,
							state,
							type,
							assignee,
							tags,
							events
						};
						commit('addConversation', newConversation);

						resolve(newConversation);
					})
					.catch((error) => {
						reject(error);
					});
			});
		},
		createMessage({ state, commit, dispatch }, { text, replyToMessageId, mood, conversationId }) {
			return new Promise((resolve, reject) => {
				Vue.$axios
					.post('/conversation/message', {
						text,
						replyToMessageId,
						mood,
						conversationId
					})
					.then((response) => {
						console.table(response.data);
						resolve(response.data);
					})
					.catch((error) => {
						console.error(error);
						reject(error.response);
					});
			});
		}
	}
};
