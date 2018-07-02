import Vue from 'vue';
import sort from 'fast-sort';

export default {
	state: {
		data: {},
		list: []
	},
	getters: {},
	mutations: {
		listConversations(state, conversations) {
			const sortedConversations = sort(conversations).asc((conversation) => {
				return conversation.time;
			});
			state.list = sortedConversations;
		},
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
		},
		sortConversationsList(state, { field, order }) {
			let sortedConversations;
			if (order === 'asc') {
				sortedConversations = sort(state.list).asc((conversation) => {
					return conversation.time;
				});
			} else {
				sortedConversations = sort(state.list).desc((conversation) => {
					return conversation.time;
				});
			}
			state.list = sortedConversations;
		}
	},
	actions: {
		createConversation({ state, commit }, { title, description, typeId, assigneeId }) {
			return new Promise((resolve, reject) => {
				Vue.$axios
					.post('/conversations', {
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
		getConversations({ state, commit }) {
			return new Promise((resolve, reject) => {
				Vue.$axios
					.get(`/conversations`)
					.then(({ data: { data: conversations } }) => {
						commit('listConversations', conversations);
					})
					.catch((response) => {});
			});
		},
		getConversation({ state, commit }, conversationId) {
			return new Promise((resolve, reject) => {
				Vue.$axios
					.get(`/conversations/${conversationId}`)
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
					.post('/conversations/messages', {
						text,
						replyToMessageId,
						mood: null,
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
					.patch(`conversations/${conversationId}`, {
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
					.patch(`conversations/${conversationId}`, {
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
		},
		markConversationAsRead({ state, commit }, { conversationId }) {
			Vue.$axios
				.patch(`conversations/${conversationId}`, {
					op: 'add',
					path: 'tag'
					// value: tagId
				})
				.then((response) => {})
				.catch(({ response }) => {
					console.error(response);
				});
		}
	}
};
