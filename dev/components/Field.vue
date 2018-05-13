<template>
	<div class="a-field">
		<label
			class="a-field__label"
			:for="name"
		>
			{{ label }}
		</label>
		<input
			class="a-field__input"
			:class="{
				'a-field__input--ltr': direction === 'ltr'
			}"
			:name="name"
			:id="name"
			:type="type"
			v-model="text"
			v-focus="isFocused"
			@focus="isFocused = true"
			@blur="isFocused = false"
			@input="$emit('input', text)"
		/>
	</div>
</template>

<script>
import { mixin as focusMixin } from 'vue-focus';

export default {
	name: 'Field',
	mixins: [focusMixin],
	props: ['name', 'label', 'type', 'direction'],
	data() {
		return {
			text: null,
			isFocused: false
		};
	},
	methods: {}
};
</script>

<style scoped lang="scss">
.a-field {
	display: flex;
	flex-direction: column;
	font-size: ms(-1);

	&__label {
		color: mix(white, black, 50%);
		margin-bottom: 0.25rem;
		transition: color;
		transition-duration: 0.15s;
		transition-timing-function: ease-in-out;

		&--is-active {
			color: $main-color;
		}
	}

	&__input {
		width: 300px;
		padding: 0.25rem;
		border: 1px solid mix(white, black, 60%);
		transition: border-color;
		transition-duration: 0.15s;
		transition-timing-function: ease-in-out;

		&--is-active {
			border-color: $main-color;
		}

		&--ltr {
			direction: ltr;
			text-align: left;
		}
	}
}
</style>
