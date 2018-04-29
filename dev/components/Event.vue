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
