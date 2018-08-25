<template>
	<header class="o-header">
		<div class="o-header__content">
			<router-link
				class="o-header__logo"
				to="/"
			>
				<img
					class="o-header__logo-image"
					src="../assets/images/logo.png"
					alt="together app logo"
				/>
			</router-link>
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
	height: 15rem;
	background: $white-1;
	@include breakpoint(md) {
		height: 13rem;
	}
	@include breakpoint(sm) {
		height: 10rem;
	}
	@include breakpoint(xs) {
		height: 8rem;
	}

	&:before {
		content: '';
		position: absolute 0 0 0 0;
		background: url('../assets/images/top_circles.png');
		background-repeat: no-repeat;
		background-position: 50% 0;
		opacity: 0.8;
		pointer-events: none;
		background-size: $general-width + 240px;
		@include breakpoint(lg) {
			background-size: $general-width--lg + 240px;
		}
		@include breakpoint(md) {
			background-size: $md;
			background-position: 50% -40px;
		}
		@include breakpoint(sm) {
			background-size: $sm;
			background-position: 50% -80px;
		}
		@include breakpoint(580px) {
			background-size: 580px;
			background-position: 50% -80px;
		}
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
		@include breakpoint(lg) {
			max-width: $general-width--lg;
		}
		@include breakpoint(md) {
			max-width: $general-width--md;
		}
		@include breakpoint(sm) {
			max-width: 100%;
			justify-content: center;
		}
		@include breakpoint(xs) {
			padding-bottom: $gutter--thin;
		}
	}

	&__logo {
		height: 60px;
		z-index: g-index('land');
		margin-left: -1vw;
		margin-bottom: 0.5rem;
		@include breakpoint(lg) {
			margin-left: 0;
		}
		@include breakpoint(sm) {
			height: 65px;
			margin-bottom: 0;
		}
		@include breakpoint(xs) {
			height: 50px;
		}
	}

	&__logo-image {
		max-width: 100%;
		max-height: 100%;
	}
}
</style>
