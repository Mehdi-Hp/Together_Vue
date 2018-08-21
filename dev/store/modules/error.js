export default {
	state: {
		status: null,
		message: null,
		isCritical: false
	},
	getters: {
		error(state) {
			return {
				status: state.status,
				message: state.message
			};
		},
		hasError(state) {
			return !!state.message;
		},
		hasCriticalError(state) {
			return state.isCritical;
		}
	},
	mutations: {
		error(state, { status, message, isCritical }) {
			state.status = status;
			state.message = message;
			state.isCritical = isCritical;
		},
		clearError(state) {
			state.status = null;
			state.message = null;
			state.isCritical = false;
		}
	}
};
