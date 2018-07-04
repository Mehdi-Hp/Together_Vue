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

		<message-sender
			class="l-new-conversation__message-sender"
			mode="expand"
			@send="createConversation"
			:is-busy="isBusy"
		/>
	</section>
</template>

<script>
import Keynote from './Keynote.vue';
import Textfield from './Textfield.vue';
import Messages from './Messages.vue';
import MessageSender from './MessageSender.vue';

export default {
	name: 'NewAdvice',
	components: {
		Keynote,
		Textfield,
		Messages,
		MessageSender
	},
	data() {
		return {
			isBusy: false
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
	mounted() {
		if (this.$store.getters.isEmployee) {
			this.$bus.$emit('error', {
				status: 403,
				message: 'شما نمی‌توانید گفت‌وگویی را ایجاد کنید.'
			});
		}
	},
	methods: {
		createConversation(message) {
			this.isBusy = true;
			this.$store
				.dispatch('createConversation', message)
				.then((conversationId) => {
					this.isBusy = true;
					console.log(conversationId);
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
		}
	}
};
</script>

<style scoped lang="scss">
.l-new-conversation {
	display: flex;
	flex-direction: column;

	&__keynote {
	}

	&__content {
	}

	&__messages {
		overflow: visible;
	}

	&__form {
		width: 100%;
		overflow-y: scroll;
	}
}
</style>
