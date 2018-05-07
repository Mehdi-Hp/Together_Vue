<template>
	<main class="p-app">
		<v-header></v-header>
		<router-view class="p-app__content"></router-view>
		<footer class="p-app__footer">
		</footer>
	</main>
</template>

<script>
import './assets/notcss/00_base/base.scss';
import VHeader from './components/Header.vue';

export default {
	name: 'App',
	components: {
		VHeader
	},
	data() {
		return {};
	}
};
</script>

<style scoped lang="scss">
.p-app {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;

	&__content {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		width: 100%;
		max-width: $general-width;
	}

	&__footer {
		width: 100%;
		max-width: $general-width;
		height: 200px;
	}
}
</style>
