<template>
	<main class="p-app">
		<v-header class="p-app__header"></v-header>
		<router-view class="p-app__content"></router-view>
		<v-footer class="p-app__footer">
		</v-footer>
	</main>
</template>

<script>
import './assets/notcss/00_base/base.scss';
import VHeader from './components/Header.vue';
import VFooter from './components/Footer.vue';

export default {
	name: 'App',
	components: {
		VHeader,
		VFooter
	},
	data() {
		return {};
	},
	mounted() {
		this.axios.defaults.headers.common.Authorization = this.$ls.get('token');

		this.axios.interceptors.response.use(
			(response) => {
				return response;
			},
			({ response }) => {
				if (response.status === 401) {
					console.log('Unauthorized!');
					this.$ls.remove('token');
					const {
						currentRoute: { fullPath }
					} = this.$router;
					this.$router.push({
						name: 'login',
						params: {
							currentRoute: fullPath
						}
					});
				} else {
					console.log('Authorized!');
				}
			}
		);
	}
};
</script>

<style scoped lang="scss">
.p-app {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	background-color: shade(white, 2%);

	&__header {
	}

	&__content {
		display: flex;
		flex-direction: column;
		min-height: calc(100vh - 400px);
		width: 100%;
		max-width: $general-width;
		padding: $gutter--fat;
		color: $text-black;
	}

	&__footer {
	}
}
</style>
