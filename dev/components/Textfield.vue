<template>
	<div
		class="a-textfield"
		:class="{
			'a-textfield--is-focused': isFocused,
			'a-textfield--is-full': content
		}"
	>
		<input
			:type="type"
			:name="name"
			class="a-textfield__input"
			:class="{
				'a-textfield__input--is-focused': isFocused,
				'a-textfield__input--is-full': content
			}"
			@keyup="onKeyup"
			v-model="content"
			@input="inputChange"
			:autocomplete="name"
		>
		<label
			:for="name"
			class="a-textfield__label"
			:class="{
				'a-textfield__label--is-focused': isFocused,
				'a-textfield__label--is-full': content
			}"
		>
			{{ text }}
		</label>
	</div>
</template>

<script>
export default {
	name: 'Textfield',
	props: ['name', 'text', 'type', 'error'],
	data() {
		return {
			isFocused: false,
			content: null
		};
	},
	methods: {
		onFocus() {
			this.isFocused = true;
			this.$emit('inputFocus');
		},
		onBlur() {
			this.isFocused = false;
			this.$emit('inputBlur');
		},
		onKeyup() {
			this.$emit('inputKeyup');
		},
		inputChange() {
			this.$emit('inputChange', this.content);
		}
	}
};
</script>
