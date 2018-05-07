<template>
	<div class="m-event">
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: 'Event',
	props: ['data'],
	data() {
		return {};
	}
};
</script>

<style scoped lang="scss">
.m-event {
	display: flex;
	width: 100%;
	padding: 1em;
	margin-bottom: 1em;
	background-color: mix(white, black, 85%);

	&--not-settled {
		opacity: 0.3;
	}
}
</style>
