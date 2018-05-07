<template>
	<header class="o-header">
		<div class="o-header__content">
			<div class="o-header__logo">
				<img
					class="o-header__logo-image"
					src="images/logo.png"
					alt="together app logo"
				/>
			</div>
		</div>
	</header>
</template>

<script>
import '../assets/images/logo.png';

export default {
	name: 'Header',
	props: [],
	data() {
		return {};
	}
};
</script>

<style scoped lang="scss">
.o-header {
	width: 100%;
	height: 200px;
	background: $white-1;

	&__content {
		width: 100%;
		height: 100%;
		max-width: $general-width;
		margin: 0 auto;
		display: flex;
		align-items: flex-end;
		justify-content: flex-end;
		padding: $gutter--thin 0;
	}

	&__logo {
		width: 300px;
		height: 70px;
	}

	&__logo-image {
		max-width: 100%;
		max-height: 100%;
	}
}
</style>
