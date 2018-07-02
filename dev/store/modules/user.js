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
		setUser(state, { role, employeeId, name, email }) {
			state.role = role.toLowerCase();
			state.employeeId = employeeId;
			state.name = name;
			state.email = email;
		}
	},
	actions: {}
};
