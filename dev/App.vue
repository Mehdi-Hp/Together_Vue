<template>
	<main class="p-app">
		<v-header class="p-app__header"></v-header>
		<error class="p-app__error" />
		<navigation class="p-app__navigation" />
		<div
			class="p-app__content-holder"
			v-if="!isLoading && !hasCriticalError"
		>
			<router-view
				class="p-app__content"
				v-if="hasNeseccaryData"
			>
			</router-view>
		</div>
		<icon-loader
			class="p-app__load-icon"
			v-if="isLoading"
			:animate="isLoading"
		/>
		<icon-cross
			class="p-app__error-icon"
			v-if="hasCriticalError"
		/>
		<v-footer class="p-app__footer">
		</v-footer>
	</main>
</template>

<script>
import './assets/notcss/00_base/base.scss';
import './assets/images/emoji--pure.png';
import Error from './components/Error.vue';
import Navigation from './components/Navigation.vue';
import VHeader from './components/Header.vue';
import VFooter from './components/Footer.vue';
import IconLoader from './components/icons/MaterialLoadSpinner.vue';
import IconCross from './components/icons/Cross.vue';

const PersianDate = require('persian-date');

export default {
	name: 'App',
	components: {
		Navigation,
		VHeader,
		VFooter,
		IconLoader,
		IconCross,
		Error
	},
	data() {
		return {
			hasFreshToken: false
		};
	},
	computed: {
		isLoading() {
			return !this.hasNeseccaryData && !this.hasFreshToken;
		},
		hasNeseccaryData() {
			return !!this.$store.state.user.name && !!this.$store.state.assignee.data.length && !!this.$store.state.type.data.length;
		},
		hasCriticalError() {
			return this.$store.getters.hasCriticalError;
		}
	},
	mounted() {
		this.initToken()
			.then(() => {
				this.getNessecaryData();
			})
			.catch((error) => {
				console.error(error);
			});
		this.initAxios();
		this.initCalendar();
	},
	methods: {
		initToken() {
			if (this.$ls.get('token')) {
				this.$store.commit('setUser');
				if (!this.$store.getters.isEmployee) {
					return this.getToken()
						.then(() => {
							this.hasFreshToken = true;
						})
						.catch(() => {});
				}
				return Promise.resolve();
			}
			return this.getToken()
				.then(() => {
					this.hasFreshToken = true;
				})
				.catch(() => {});
		},
		initAxios() {
			this.axios.interceptors.response.use(null, (error) => {
				if (error.config && error.response && error.response.status === 401) {
					console.warn('Unauthorized!');
					this.$store.commit('error', {
						status: '۴۰۱',
						message: 'کلید شما باطل شده. لطفا صفحه را رفرش کنید.'
					});
					if (this.$store.getters.isEmployee) {
						this.$ls.remove('token');
						this.$router.go('/login');
						return Promise.resolve();
					}
					this.getToken()
						.then(() => {
							error.config.baseURL = undefined;
							// this.axios.request(error.config).then((response) => {
							// });
						})
						.catch(() => {});
				}
				return Promise.reject(error.response);
			});
		},
		initCalendar() {
			PersianDate.toLocale('fa');
		},
		getToken() {
			return this.$store.dispatch('getToken');
		},
		getNessecaryData() {
			Promise.all([this.$store.dispatch('getAllTypes'), this.$store.dispatch('getAllAssignees')]).catch(() => {
				this.$store.commit('error', {
					message: 'متاسفیم! ارتباط اولیه با سرور برقرار نشد.',
					isCritical: true
				});
			});
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

	&__error {
	}

	&__navigation {
		margin-top: $gutter;
		margin-bottom: $gutter;
	}

	&__content-holder {
		display: flex;
		size: 100%;
		flex-grow: 1;
		align-items: center;
		justify-content: center;
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
		position: relative;
		@include breakpoint(lg) {
			max-width: $general-width--lg;
		}
		@include breakpoint(md) {
			max-width: $general-width--md;
		}
		@include breakpoint(sm) {
			max-width: $general-width--sm;
			padding: $gutter;
		}
	}

	&__load-icon {
		color: $green;
		position: absolute 0 0 0 0;
		margin: auto;
	}

	&__error-icon {
		color: $red;
		stroke-width: 4px;
		position: absolute 0 0 0 0;
		margin: auto;
		padding: 1em;
		size: 1.7em;
		border-radius: 50%;
		padding: 0.5em;
		background-color: $white-3;
	}

	&__footer {
	}
}
</style>
