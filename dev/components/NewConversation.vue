<template>
	<section class="l-new-conversation">
		<keynote class="l-new-conversation__keynote">
			<template slot="title">
				گفت‌وگوی جدید
			</template>
			<template slot="desc">
				شناسایی شما از طریق این سامانه امکان پذیر نیست و از شما هیچگونه اطلاعاتی دریافت نمی شود و صرفا به شما یک کد رهگیری داده خواهد شد که تا بتوانید پاسخ خود را مشاهده کنید
				<br />
				حتی می توانید خارج از شرکت و با استفاده از کامپیوتر کافی نت یا vpn پیام خود را ثبت نمایید.
				<br />
				به منظور اینکه مطلب طرح شده قبل از مشاهده مدیرعامل مورد تحقیق قرار بگیرد شما می توانید پیام خود را از طریق یکی از افراد مورد اعتماد مدیرعامل به ایشان برسانید.
				<br />
				دلیل ایجاد چند گزینه برای این انتقال پیام، اعتماد شما است  تا فردی را انتخاب کنید که با موضوع مطرح شده از طرف شما تعارض منافع نداشته باشد.
			</template>
		</keynote>

		<message-sender
			class="l-new-conversation__message-sender"
			mode="expand"
			@send="createConversation"
			:is-busy="isBusy"
			:error="hasError"
			:is-done="isDone"
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
			isBusy: false,
			isDone: false,
			hasError: false
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
			return this.$store
				.dispatch('createConversation', message)
				.then((conversationId) => {
					this.isBusy = false;
					this.hasError = false;
					this.isDone = true;
					this.$ls.remove('message_sender_data');
					this.$router.push({
						name: 'created',
						params: {
							conversationId
						}
					});
				})
				.catch((error) => {
					this.isBusy = false;
					this.isDone = false;
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
	margin-bottom: $gutter--fat;

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
