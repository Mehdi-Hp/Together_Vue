<template>
	<button
		class="a-button"
		:class="{
			'a-button--normal': mode === 'normal',
			'a-button--error': mode === 'error',
			'a-button--nonsignificant': mode === 'nonsignificant'
		}"
		@click="$emit('click')"
	>
		<slot>
		</slot>
	</button>
</template>

<script>
export default {
	name: 'Button',
	props: ['mode'],
	data() {
		return {};
	}
};
</script>

<style scoped lang="scss">
.a-button {
	border-radius: 20em;
	padding: 0.5em 2em;
	color: $white;
	box-shadow: 0px 6px 25px 1px rgba(0, 0, 0, 0.15);
	transition-property: box-shadow, transform, background;
	transition-duration: 0.15s;
	transition-timing-function: ease-in-out;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	font-weight: 500;

	&:hocus {
		box-shadow: 0px 8px 40px 3px rgba(0, 0, 0, 0.2);
	}

	&:active {
		box-shadow: 0px 8px 25px 0 rgba(0, 0, 0, 0.15);
		transform: scale(0.99);
	}

	&--normal {
		background: linear-gradient(to top, $green 0%, $green-light 100%);

		&:hocus {
			background: linear-gradient(to top, shade($green, 10%) 0%, shade($green-light, 10%) 100%);
		}
	}

	&--error {
		background: linear-gradient(to top, $red 0%, tint($red, 30%) 100%);
		color: white;

		&:hocus {
			background: linear-gradient(to top, shade($red, 10%) 0%, shade(tint($red, 30%), 10%) 100%);
		}
	}

	&--nonsignificant {
		background: $white-2;
		color: $black-2;

		&:hocus {
			background: $white-3;
		}
	}
}
</style>
