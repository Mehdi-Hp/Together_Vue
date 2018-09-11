export default {
	namespaced: true,
	state: {
		status: null,
		message: null,
		isCritical: false
	},
	getters: {
		state(state) {
			return !!state.message;
		},
		criticalState(state) {
			return state.isCritical;
		}
	},
	mutations: {
		set(state, { status, message, isCritical }) {
			state.status = status;
			state.message = message;
			state.isCritical = isCritical;
		},
		clear(state) {
			state.status = null;
			state.message = null;
			state.isCritical = false;
		}
	}
};
