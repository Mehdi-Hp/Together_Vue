import Vue from 'vue';
import sort from 'fast-sort';

export default {
	namespaced: true,
	state: {
		data: {},
		list: []
	},
	getters: {},
	mutations: {
		setAll(state, conversations) {
			const sortedConversations = sort(conversations).asc((conversation) => {
				return conversation.time;
			});
			state.list = sortedConversations;
		},
		add(state, conversation) {
			state.data = conversation;
		},
		addTag(state, tagId) {
			const tagIndexToSelect = state.data.tags.findIndex((tag) => {
				return tag.id === tagId;
			});
			state.data.tags[tagIndexToSelect].isSelected = true;
		},
		removeTag(state, tagId) {
			const tagIndexToUnselect = state.data.tags.findIndex((tag) => {
				return tag.id === tagId;
			});
			state.data.tags[tagIndexToUnselect].isSelected = false;
		}
	},
	actions: {
		create({ state, commit }, { title, description, typeId, assigneeId, mood, captcha }) {
			return new Promise((resolve, reject) => {
				commit('error/clear');
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
						commit('add', {
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
						commit('error/set', {
							status: '۵۰۰',
							message: 'متاسفانه مشکلی برای ساختن گفت وگو پیش آمده.'
						});
						reject(error);
					});
			});
		},
		getAll({ state, commit }) {
			return new Promise((resolve, reject) => {
				Vue.$axios
					.get(`/conversations`)
					.then(({ data: { data: conversations } }) => {
						commit('setAll', conversations);
					})
					.catch((response) => {});
			});
		},
		getOne({ state, commit }, conversationId) {
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
						commit('add', newConversation);
						resolve(newConversation);
					})
					.catch((response) => {
						commit('error/set', {
							status: '۵۰۰',
							message: 'متاسفانه پیام شما ارسال نشد.'
						});
						reject(response);
					});
			});
		},
		addMessage({ state, commit }, { text, replyToMessageId, mood, conversationId }) {
			commit('error/clear');
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
						commit('error/set', {
							status: '۵۰۰',
							message: 'متاسفانه پیام شما ارسال نشد.'
						});
						console.error(error);
						reject(error.data);
					});
			});
		},
		addTag({ state, commit }, { tagId, conversationId }) {
			commit('error/clear');
			return new Promise((resolve, reject) => {
				const tagIndexToSelect = state.data.tags.findIndex((tag) => {
					return tag.id === tagId;
				});
				commit('addTag', tagId);
				state.data.tags[tagIndexToSelect].isAdding = true;
				Vue.$axios
					.patch(`conversations/${conversationId}`, {
						op: 'add',
						path: 'tag',
						value: tagId
					})
					.then((response) => {
						setTimeout(() => {
							state.data.tags[tagIndexToSelect].isAdding = false;
							resolve(conversationId);
						}, 1000);
					})
					.catch((response) => {
						setTimeout(() => {
							commit('error/set', {
								status: '۵۰۰',
								message: 'مشکلی در برچسب زدن بوجود آمده.'
							});
							console.error(response);
							commit('removeTag', tagId);
							state.data.tags[tagIndexToSelect].isAdding = false;
							reject(response);
						}, 1000);
					});
			});
		},
		removeTag({ state, commit }, { tagId, conversationId }) {
			commit('error/clear');
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
							commit('removeTag', tagId);
							state.data.tags[tagIndexToUnselect].isRemoving = false;
							resolve(conversationId);
						}, 1000);
					})
					.catch(({ response }) => {
						commit('error/set', {
							status: '۵۰۰',
							message: 'مشکلی در حذف برچسب بوجود آمده'
						});
						state.data.tags[tagIndexToUnselect].isRemoving = false;
						console.error(response);
					});
			});
		},
		markAsRead({ state, commit }, conversationId) {
			Vue.$axios
				.patch(`conversations/${conversationId}`, {
					op: 'replace',
					path: 'state',
					value: 'read'
				})
				.then((response) => {})
				.catch(({ response }) => {
					commit('error/set', {
						message: 'ارتباط نامطمئن با سرور'
					});
					console.error(response);
				});
		}
	}
};
