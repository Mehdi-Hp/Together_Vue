<template>
	<section class="l-new-conversation">
		<keynote class="l-new-conversation__keynote">
			<template slot="title">
				گفت‌وگوی جدید
			</template>
			<template slot="desc--significant">
				شناسایی شما از طریق این سامانه امکان پذیر نیست و از شما هیچگونه اطلاعاتی دریافت نمی شود و صرفا به شما یک کد رهگیری داده خواهد شد که تا بتوانید پاسخ خود را مشاهده کنید
			</template>
			<template slot="desc">
				شما می توانید پیام خود را با کامپیوتر شخصی یا غیر شخصی، با اینترنت عمومی یا VPN رمزنگاری شده، به هر صورتی که تمایل داشته باشید ارسال کنید.
				<br />
				به منظور اینکه مطلب طرح شده قبل از مشاهده مدیرعامل مورد تحقیق قرار بگیرد شما می توانید پیام خود را از طریق یکی از افراد مورد اعتماد مدیرعامل به ایشان برسانید.
			</template>
			<template slot="desc--non-significant">
				برای اعتماد سازی بیشتر، و به حداقل رساندن تعارض با منافع شما، چند بررسی کننده برای این کار انتخاب شده است.
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
import { mapGetters } from 'vuex';
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
		...mapGetters({
			isEmployee: 'user/isEmployee'
		}),
		types() {
			return this.$store.state.type.data;
		},
		assignees() {
			return this.$store.state.assignee.data;
		}
	},
	created() {
		if (this.isEmployee) {
			this.$router.push('/conversations');
		}
	},
	mounted() {
		if (this.isEmployee) {
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
				.dispatch('conversation/create', message)
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
