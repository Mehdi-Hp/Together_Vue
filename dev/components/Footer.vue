<template>
	<footer class="o-footer">
		<div class="o-footer__logo">
			<img
				class="o-footer__logo-image"
				src="../assets/images/orchid_logo--white.png"
				alt="orchid pharmed logo | لوگو ارکید فارمد"
			>
		</div>
		<ul class="o-footer__links">
			<li class="o-footer__link-holder">
				<a class="o-footer__link">
					Website
				</a>
			</li>
			<li class="o-footer__link-holder">
				<a class="o-footer__link">
					Instagram
				</a>
			</li>
			<li class="o-footer__link-holder">
				<a class="o-footer__link">
					Linkdin
				</a>
			</li>
			<li class="o-footer__link-holder">
				<a class="o-footer__link">
					Jobinja
				</a>
			</li>
		</ul>
	</footer>
</template>

<script>
export default {
	name: 'Footer',
	props: [],
	data() {
		return {};
	}
};
</script>

<style scoped lang="scss">
.o-footer {
	width: 100%;
	height: 230px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: $footer-background;
	padding: $gutter;

	&__logo {
		height: 100px;
		margin-bottom: $gutter--thin;
	}

	&__logo-image {
		max-height: 100%;
	}

	&__links {
		display: flex;
		justify-content: center;
		font-size: ms(-2);
	}

	&__link-holder {
		margin-left: 1em;
		border-left: 1px solid $white-5;
		padding-left: 1em;

		&:last-of-type {
			margin-left: 0;
			border-left: none;
		}
	}

	&__link {
		color: $white-2;
	}
}
</style>
