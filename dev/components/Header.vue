<template>
	<header class="o-header">
		<div class="o-header__content">
			<div class="o-header__logo">
				<img
					class="o-header__logo-image"
					src="../assets/images/logo.png"
					alt="together app logo"
				/>
			</div>
		</div>
	</header>
</template>

<script>
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
	height: 230px;
	background: $white-1;

	&:before {
		content: '';
		position: absolute 0 0 0 0;
		background: url('../assets/images/top_circles.png');
		background-repeat: no-repeat;
		background-size: 46vw;
		background-position: 40% 0;
		opacity: 0.8;
		pointer-events: none;
	}

	&__content {
		width: 100%;
		height: 100%;
		max-width: $general-width;
		margin: 0 auto;
		display: flex;
		align-items: flex-end;
		justify-content: flex-end;
		padding: $gutter 0;
	}

	&__logo {
		height: 60px;
		z-index: g-index('land');
		margin-left: -3vw;
	}

	&__logo-image {
		max-width: 100%;
		max-height: 100%;
	}
}
</style>
