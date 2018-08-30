<template>
	<section class="l-error">
		<div class="l-error__sign">
			<span class="l-error__sign-text">۴۰۴</span>
			<icon-404 class="l-error__sign-icon" />
		</div>
		<div class="l-error__status">
			<span class="l-error__status-message">
				صفحه درخواستی شما پیدا نشد
			</span>
		</div>
	</section>
</template>

<script>
import Icon404 from './icons/404.vue';

export default {
	name: 'Error',
	components: {
		Icon404
	},
	props: ['status', 'message'],
	data() {
		return {};
	},
	computed: {}
};
</script>

<style scoped lang="scss">
.l-error {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	color: shade($red, 30%);

	&__sign {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: $gutter--fat;
	}

	&__sign-text {
		margin-left: $gutter;
		font-size: ms(4);
	}

	&__sign-icon {
		size: 8em;
		@include breakpoint(sm) {
			size: 6em;
		}
	}

	&__status {
		display: flex;
		flex-direction: column;
		font-size: ms(3);
		color: $black-4;
	}

	&__status-number {
		font-size: ms(3);
		text-decoration: underline;
		font-weight: 900;
	}

	&__status-message {
		font-weight: 300;
	}
}
</style>
