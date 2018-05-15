<template>
	<button
		class="a-button"
		:class="{
			'a-button--normal': mode === 'normal'
		}"
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

	&--normal {
		background: linear-gradient(to top, $green 0%, $green-light 100%);
	}
}
</style>
