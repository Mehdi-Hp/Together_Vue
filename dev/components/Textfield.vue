<template>
	<div class="a-textfield">
		<input
			type="text"
			class="a-textfield__input"
			v-if="!textareaMode"
		>
		<textarea
			v-if="textareaMode"
			class="a-textfield__textarea"
		></textarea>
	</div>
</template>

<script>
export default {
	name: 'Textfield',
	props: ['textareaMode'],
	data() {
		return {};
	}
};
</script>
