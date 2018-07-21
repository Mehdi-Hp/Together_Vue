<template>
	<form
		class="l-go"
		@submit.prevent
	>
		<field
			class="l-go__field"
			name="code"
			placeholder="کد گفت وگو"
			type="code"
			direction="ltr"
			@input="(newValue) => { code = newValue }"
		></field>
		<v-button
			class="l-go__submit"
			mode="normal"
			@click="go"
			@keydown.enter.prevent="go"
		>
			پیدا کردن گفت وگو
		</v-button>
	</form>
</template>

<script>
import Field from './Field.vue';
import VButton from './Button.vue';

export default {
	name: 'GoToConversation',
	components: {
		Field,
		VButton
	},
	props: [],
	data() {
		return {
			code: null
		};
	},
	methods: {
		go() {
			if (this.code) {
				this.$router.push(`/conversations/${this.code}`);
			}
		}
	}
};
</script>

<style scoped lang="scss">
.l-go {
	display: flex;
	align-items: center;

	&__field {
		width: 300px;
	}

	&__submit {
		width: 200px;
		margin-top: $gutter--thin;
	}
}
</style>
