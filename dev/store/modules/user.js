import Vue from 'vue';

export default {
	state: {
		employeeId: null,
		name: null,
		role: null,
		email: null
	},
	getters: {
		isAdmin(state) {
			return state.role === 'agent';
		},
		isEmployee(state) {
			return !!state.employeeId;
		}
	},
	mutations: {
		setUser(state, { role, employeeId, name }) {
			state.role = role.toLowerCase();
			state.employeeId = employeeId;
			state.name = name;
		}
	},
	actions: {
		getToken({ state, commit }, payload = {}) {
			return new Promise((resolve, reject) => {
				Vue.axios
					.get('/signin', {
						params: {
							email: payload.email,
							password: payload.password
						}
					})
					.then(({ data: { token, employeeId, fullName, role } }) => {
						console.table({ token, employeeId, fullName, role });
						Vue.ls.set('token', `Bearer ${token}`);
						commit('setUser', {
							employeeId,
							name: fullName,
							role
						});
						Vue.axios.defaults.headers.common.Authorization = `Bearer ${token}`;
					})
					.catch((error) => {
						console.error(error);
					});
			});
		}
	}
};
