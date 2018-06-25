<template>
	<section class="l-new-conversation">
		<keynote class="l-new-conversation__keynote">
			<template slot="title">
				گفت‌وگوی جدید
			</template>
			<template slot="desc">
				از اینجا می‌توانید گفت‌وگوی جدیدی را شروع کنید. این مکالمه کاملا رمزنگاری خواهد شد و فقط مدیر و فردی که لینک تولید شده را دارد به محتوای آن دسترسی دارد.
			</template>
		</keynote>

		<form
			class="l-new-conversation__content"
			@submit.prevent
		>
			<messages
				class="l-new-conversation__messages"
				field-only="true"
			>
			</messages>
		</form>
	</section>
</template>

<script>
import Keynote from './Keynote.vue';
import Textfield from './Textfield.vue';
import Messages from './Messages.vue';

export default {
	name: 'NewAdvice',
	components: {
		Keynote,
		Textfield,
		Messages
	},
	data() {
		return {
			title: null,
			description: null,
			typeId: null,
			assigneeId: null
		};
	},
	computed: {
		types() {
			return this.$store.state.type.data;
		},
		assignees() {
			return this.$store.state.assignee.data;
		}
	},
	created() {
		this.$store.dispatch('getAllTypes');
		this.$store.dispatch('getAllAssignees');
	},
	methods: {
		createConversation() {
			this.$validate();
			if (!this.validation.errors.length) {
				this.$store
					.dispatch('createConversation', {
						title: this.title,
						description: this.description,
						typeId: this.typeId,
						assigneeId: this.assigneeId
					})
					.then((conversationId) => {
						this.$router.push({
							name: 'created',
							params: {
								conversationId
							}
						});
					})
					.catch((error) => {
						console.error(error);
					});
			} else {
				console.error(this.validation.errors);
			}
		}
	},
	validators: {
		title: {
			cache: true,
			debounce: 200,
			validator(value) {
				return this.$validator.value(value).required();
			}
		},
		description: {
			validator(value) {
				return this.$validator.value(value).required();
			}
		},
		typeId: {
			validator(value) {
				return this.$validator.value(value).required();
			}
		},
		assigneeId: {
			validator(value) {
				return this.$validator.value(value).required();
			}
		}
	}
};
</script>

<style scoped lang="scss">
.l-new-conversation {
	display: flex;
	flex-direction: column;

	&__keynote {
		margin-bottom: $gutter--fater;
	}

	&__content {
	}

	&__messages {
		overflow: visible;
		margin-bottom: $gutter--fater;
	}

	&__form {
		width: 100%;
		overflow-y: scroll;
	}
}
</style>
