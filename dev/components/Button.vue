<template>
	<button
		class="a-button"
		:class="{
			'a-button--normal': mode === 'normal'
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
	transition-property: box-shadow, transform;
	transition-duration: 0.15s;
	transition-timing-function: ease-in-out;

	&:hocus {
		box-shadow: 0px 6px 40px 3px rgba(0, 0, 0, 0.2);
	}

	&:active {
		box-shadow: 0px 6px 25px 0 rgba(0, 0, 0, 0.15);
		transform: scale(0.99);
	}

	&--normal {
		background: linear-gradient(to top, $green 0%, $green-light 100%);

		&:hocus {
			background: linear-gradient(to top, shade($green, 10%) 0%, shade($green-light, 10%) 100%);
		}
	}
}
</style>
