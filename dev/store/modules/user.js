export default {
	state: {
		employeeId: null,
		name: null,
		role: null,
		email: null
	},
	getters: {},
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
