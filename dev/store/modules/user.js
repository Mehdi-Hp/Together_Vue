import Vue from 'vue';
import jwtDecode from 'jwt-decode';

export default {
	namespaced: true,
	state: {
		employeeId: null,
		name: null,
		role: null,
		email: null
	},
	getters: {
		isAdmin(state) {
			return state.role.toLowerCase() === 'agent';
		},
		isEmployee(state) {
			return !!state.employeeId;
		}
	},
	mutations: {
		setInformation(state) {
			const token = Vue.ls.get('token');
			const decodedUser = jwtDecode(token.split(' ')[1]);
			Vue.$axios.defaults.headers.common.Authorization = token;
			state.role = decodedUser.Title;
			state.employeeId = decodedUser.EmployeeId;
			state.name = decodedUser.FullName;
			state.email = decodedUser.Email;
			return state;
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
						commit('setInformation');
						resolve(state);
					})
					.catch((error) => {
						this.$store.commit('error/set', {
							message: 'در تولید کلید ارتباط با سرور مشکلی پیش آمده'
						});
						reject(error);
					});
			});
		}
	}
};
