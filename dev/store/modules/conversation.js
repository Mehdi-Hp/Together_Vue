import Vue from 'vue';

export default {
	state: {
		data: {}
	},
	getters: {},
	mutations: {
		addConversation(state, conversation) {
			state.data = conversation;
		},
		addConversationTag(state, tagId) {
			const tagIndexToSelect = state.data.tags.findIndex((tag) => {
				return tag.id === tagId;
			});
			state.data.tags[tagIndexToSelect].isSelected = true;
		},
		removeConversationTag(state, tagId) {
			const tagIndexToUnselect = state.data.tags.findIndex((tag) => {
				return tag.id === tagId;
			});
			state.data.tags[tagIndexToUnselect].isSelected = false;
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
					.then(({ data: { id: conversationId } }) => {
						commit('addConversation', {
							title,
							description,
							typeId,
							assigneeId,
							conversationId
						});
						resolve(conversationId);
					})
					.catch(({ response }) => {
						console.error(response);
						reject(response);
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
						newConversation.events.forEach((event) => {
							event.error = null;
							event.notSettledYet = false;
						});
						newConversation.tags.forEach((tag) => {
							tag.isRemoving = false;
						});
						commit('addConversation', newConversation);
						resolve(newConversation);
					})
					.catch((response) => {
						reject(response);
					});
			});
		},
		createMessage({ state, commit, dispatch }, { text, replyToMessageId, mood, conversationId }) {
			return new Promise((resolve, reject) => {
				console.table({
					text,
					replyToMessageId,
					mood,
					conversationId
				});
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
						reject(error.data);
					});
			});
		},
		addConversationTag({ state, commit }, { tagId, conversationId }) {
			return new Promise((resolve, reject) => {
				Vue.$axios
					.patch(`conversation/${conversationId}`, {
						op: 'add',
						path: 'tag',
						value: tagId
					})
					.then((response) => {
						console.log(response);
						commit('addConversationTag', tagId);
						resolve(conversationId);
					})
					.catch(({ response }) => {
						console.error(response);
					});
			});
		},
		removeConversationTag({ state, commit }, { tagId, conversationId }) {
			return new Promise((resolve, reject) => {
				const tagIndexToUnselect = state.data.tags.findIndex((tag) => {
					return tag.id === tagId;
				});
				state.data.tags[tagIndexToUnselect].isRemoving = true;
				Vue.$axios
					.patch(`conversation/${conversationId}`, {
						op: 'remove',
						path: 'tag',
						value: tagId
					})
					.then((response) => {
						console.log(response);
						setTimeout(() => {
							commit('removeConversationTag', tagId);
							state.data.tags[tagIndexToUnselect].isRemoving = false;
							resolve(conversationId);
						}, 1000);
					})
					.catch(({ response }) => {
						console.error(response);
					});
			});
		}
	}
};
