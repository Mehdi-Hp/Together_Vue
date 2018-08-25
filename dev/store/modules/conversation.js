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
		createConversation({ state, commit }, { title, description, typeId, assigneeId, mood, captcha }) {
			return new Promise((resolve, reject) => {
				commit('clearError');
				console.table({
					title,
					description,
					categoryId: typeId,
					assigneeId,
					mood,
					captcha
				});
				Vue.$axios
					.post('/conversations', {
						title,
						description,
						categoryId: typeId,
						assigneeId,
						mood,
						captcha
					})
					.then(({ data: { id: conversationId } }) => {
						commit('addConversation', {
							title,
							description,
							typeId,
							assigneeId,
							mood,
							conversationId
						});
						resolve(conversationId);
					})
					.catch((error) => {
						commit('error', {
							status: '۵۰۰',
							message: 'متاسفانه مشکلی برای ساختن گفت وگو پیش آمده.'
						});
						reject(error);
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
		getConversation({ state, ncommit }, conversationId) {
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
						commit('error', {
							status: '۵۰۰',
							message: 'متاسفانه پیام شما ارسال نشد.'
						});
						reject(response);
					});
			});
		},
		createMessage({ state, commit, dispatch }, { text, replyToMessageId, mood, conversationId }) {
			commit('clearError');
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
						mood,
						conversationId
					})
					.then((response) => {
						console.table(response.data);
						resolve(response.data);
					})
					.catch((error) => {
						commit('error', {
							status: '۵۰۰',
							message: 'متاسفانه پیام شما ارسال نشد.'
						});
						console.error(error);
						reject(error.data);
					});
			});
		},
		addConversationTag({ state, commit }, { tagId, conversationId }) {
			commit('clearError');
			return new Promise((resolve, reject) => {
				const tagIndexToSelect = state.data.tags.findIndex((tag) => {
					return tag.id === tagId;
				});
				commit('addConversationTag', tagId);
				state.data.tags[tagIndexToSelect].isAdding = true;
				Vue.$axios
					.patch(`conversations/${conversationId}`, {
						op: 'add',
						path: 'tag',
						value: tagId
					})
					.then((response) => {
						setTimeout(() => {
							commit('addConversationTag', tagId);
							state.data.tags[tagIndexToSelect].isAdding = false;
							resolve(conversationId);
						}, 1000);
					})
					.catch((response) => {
						setTimeout(() => {
							commit('error', {
								status: '۵۰۰',
								message: 'مشکلی در برچسب زدن بوجود آمده.'
							});
							console.error(response);
							state.data.tags[tagIndexToSelect].isAdding = false;
							reject(response);
						}, 1000);
					});
			});
		},
		removeConversationTag({ state, commit }, { tagId, conversationId }) {
			commit('clearError');
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
						setTimeout(() => {
							commit('removeConversationTag', tagId);
							state.data.tags[tagIndexToUnselect].isRemoving = false;
							resolve(conversationId);
						}, 1000);
					})
					.catch(({ response }) => {
						commit('error', {
							status: '۵۰۰',
							message: 'مشکلی در حذف برچسب بوجود آمده'
						});
						state.data.tags[tagIndexToUnselect].isRemoving = false;
						console.error(response);
					});
			});
		},
		markConversationAsRead({ state, commit }, conversationId) {
			Vue.$axios
				.patch(`conversations/${conversationId}`, {
					op: 'replace',
					path: 'state',
					value: 'read'
				})
				.then((response) => {})
				.catch(({ response }) => {
					commit('error', {
						message: 'ارتباط نامطمئن با سرور'
					});
					console.error(response);
				});
		}
	}
};
