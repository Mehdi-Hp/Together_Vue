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
	}
};
</script>

<style scoped lang="scss">
.p-app {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;

	&__header {
	}

	&__content {
		display: flex;
		flex-direction: column;
		min-height: calc(100vh - 400px);
		width: 100%;
		max-width: $general-width;
		padding: $gutter--fat 0 $gutter--fater 0;
		color: $text-black;
	}

	&__footer {
	}
}
</style>
