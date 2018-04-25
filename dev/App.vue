<template>
	<main class="p-app">
		<router-view class="p-app__content"></router-view>
	</main>
</template>

<script>
import './assets/notcss/00_base/base.scss';
import './assets/notcss/01_atom/atoms.scss';
import './assets/notcss/02_molecule/molecules.scss';
import './assets/notcss/03_organism/organisms.scss';
import './assets/notcss/04_layout/layouts.scss';
import './assets/notcss/05_page/p-app.scss';

export default {
	name: 'App',
	data() {
		return {};
	}
};
</script>
