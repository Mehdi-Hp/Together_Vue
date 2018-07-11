<template>
	<main class="p-app">
		<v-header class="p-app__header"></v-header>
		<navigation class="p-app__navigation" />
		<router-view
			v-if="!error.hasError"
			class="p-app__content"
		>
		</router-view>
		<error
			class="p-app__error"
			v-if="error.hasError"
			:status="error.status"
			:message="error.message"
		>
		</error>
		<v-footer class="p-app__footer">
		</v-footer>
	</main>
</template>

<script>
import jwtDecode from 'jwt-decode';
import './assets/notcss/00_base/base.scss';
import './assets/images/emoji--pure.png';
import Error from './components/Error.vue';
import Navigation from './components/Navigation.vue';
import VHeader from './components/Header.vue';
import VFooter from './components/Footer.vue';

const PersianDate = require('persian-date');

export default {
	name: 'App',
	components: {
		Navigation,
		VHeader,
		VFooter,
		Error
	},
	data() {
		return {
			error: {
				hasError: true
			}
		};
	},
	watch: {
		$route(from, to) {
			if (this.error.hasError) {
				this.error.hasError = false;
			}
		}
	},
	created() {
		this.error.hasError = false;
	},
	mounted() {
		this.initCalendar();

		this.axios.defaults.headers.common.Authorization = this.$ls.get('token');

		this.axios.interceptors.response.use(
			(response) => {
				return response;
			},
			({ response }) => {
				if (response.status === 401) {
					console.log('Unauthorized!');
					this.$ls.remove('token');
					this.$store.dispatch('getToken');
				} else {
					this.$bus.$emit('error', {
						status: response.status,
						message: response.message
					});
				}
				return Promise.reject(response);
			}
		);

		this.$ls.remove('token');
		if (this.$ls.get('token')) {
			const decodedUser = jwtDecode(this.$ls.get('token').split(' ')[1]);
			this.$store.commit('setUser', {
				name: decodedUser.FullName,
				email: decodedUser.Email,
				employeeId: decodedUser.EmployeeId,
				role: decodedUser.Title
			});
			this.getNessecaryData();
		} else {
			this.$store
				.dispatch('getToken')
				.then(() => {
					this.getNessecaryData();
				})
				.catch((error) => {
					this.$bus.$emit('error', {
						status: 500,
						message: error
					});
				});
		}

		this.$bus.$on('error', ({ status, message }) => {
			console.log(status);
			this.error = {
				hasError: true,
				status,
				message
			};
		});
	},
	methods: {
		initCalendar() {
			PersianDate.toLocale('fa');
		},
		getNessecaryData() {
			this.$store.dispatch('getAllTypes');
			this.$store.dispatch('getAllAssignees');
		}
	}
};
</script>

<style scoped lang="scss">
.p-app {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	min-height: 100vh;
	background-color: shade(white, 2%);

	&__header {
	}

	&__navigation {
		margin-top: $gutter;
		margin-bottom: $gutter;
	}

	&__content {
		display: flex;
		flex-direction: column;
		min-height: calc(100vh - 30rem);
		width: 100%;
		max-width: $general-width;
		padding: $gutter;
		padding-bottom: $gutter--fat;
		color: $black-4;
	}

	&__error {
		@extend .p-app__content;
	}

	&__footer {
	}
}
</style>
