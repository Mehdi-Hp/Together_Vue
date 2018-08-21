<template>
	<div
		class="a-error"
		:class="{
			'a-error--is-showing': hasError
		}"
	>
		<div class="a-error__inner">
			<span
				class="a-error__status"
				:class="{
					'a-error__status--is-showing': hasError
				}"
				v-if="error.status"
			>
				{{ error.status }}
			</span>
			<span
				class="a-error__message"
				:class="{
					'a-error__message--is-showing': hasError
				}"
			>
				{{ error.message || 'متاسفیم. مشکلی در سمت سرور پیش آمده.' }}
			</span>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'Error',
	props: [],
	data() {
		return {
			// hasError: true
		};
	},
	computed: {
		...mapGetters(['error', 'hasError'])
	}
};
</script>

<style scoped lang="scss">
.a-error {
	display: flex;
	justify-content: center;
	width: 100%;
	background-color: $red;
	color: $white-1;
	transition-property: transform, opacity;
	transition-duration: 0.15s;
	opacity: 0;
	transform-origin: top;
	transform: scaleY(0);
	transition-timing-function: cubic-bezier(0.77, 0.4, 0.54, 1.61);
	overflow: hidden;
	position: fixed;
	top: 0;
	z-index: g-index('mountain');
	box-shadow: 0px 6px 25px 1px rgba(0, 0, 0, 0.15);

	&--is-showing {
		opacity: 1;
		transform: scaleY(1);
	}

	&__inner {
		display: flex;
		justify-content: center;
		align-items: center;
		width: $general-width;
		margin: 0 auto;
		padding: 0.75em;
		perspective: 200px;
	}

	&__status {
		margin-left: 1em;
		padding: 0.5em;
		background-color: transparentize(black, 0.9);
		border-radius: 5px;
		transition-property: transform, opacity;
		transition-duration: 0.15s;
		transition-delay: 0.075s;
		opacity: 0;
		transform: scale(0);
		transition-timing-function: cubic-bezier(0.77, 0.4, 0.54, 1.61);
		position: relative;
		font-weight: bold;

		&--is-showing {
			opacity: 1;
			transform: scale(1);
		}
	}

	&__message {
		transition-property: transform, opacity;
		transition-duration: 0.15s;
		opacity: 0;
		transform: scale(0.8);
		transition-delay: 0.17s;
		transition-timing-function: cubic-bezier(0.77, 0.4, 0.54, 1.61);

		&--is-showing {
			opacity: 1;
			transform: scale(1);
		}
	}
}
</style>
