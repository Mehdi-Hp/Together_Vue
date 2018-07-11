<template>
	<section
		class="l-sent"
		v-if="conversationId"
	>
		<keynote class="l-sent__keynote">
			<template slot="title">
				گفت‌وگو ساخه شد
			</template>
			<template slot="desc">
				پیام شما به صورت ناشناس ارسال، و یک لینک منحصر به‌فرد به این منظور شاخته شد.
			</template>
		</keynote>

		<div class="l-sent__content">
			<div class="l-sent__message | l-sent__message--warning">
				<div class="l-sent__message-icon-holder">
					<icon-alert class="l-sent__message-icon" />

				</div>
				<p class="l-sent__message-text">
					قبل از بستن این تب، مطمئن شوید لینک گفت‌و‌گو را جایی ذخیره کرده‌اید.
					<br />
					در صورت از دست دادن لینک، راهی برای رسیدن به این گفت‌و‌گو نخواهید داشت.
				</p>
			</div>
			<div class="l-sent__link-holder">
				<router-link
					:to="`/conversations/${conversationId}`"
					class="l-sent__link"
				>
					{{ conversationId }}
				</router-link>
			</div>
			<a
				class="l-sent__bookmark"
				:href="`data:text/html;charset=utf-8;base64,${jsToRedirect}`"
				:download="`Together Conversation - ${conversationId}`"
			>
				دانلود فایل رسیدن به گفت‌وگو
			</a>
		</div>
	</section>
</template>

<script>
import { Base64 } from 'js-base64';
import Keynote from './Keynote.vue';
import IconAlert from './icons/Alert.vue';
import VButton from './Button.vue';

export default {
	name: 'CreatedConversation',
	components: {
		Keynote,
		IconAlert,
		VButton
	},
	props: ['conversationId'],
	data() {
		return {};
	},
	computed: {
		jsToRedirect() {
			let redirectScript = '<script>window.location.href = "http://together:8080/conversations/';
			redirectScript = `${redirectScript}${this.conversationId}"</scrip`;
			redirectScript = `${redirectScript}t>`;
			return Base64.encode(redirectScript);
		}
	},
	mounted() {
		if (!this.conversationId) {
			this.$router.push('/');
		}
	}
};
</script>

<style scoped lang="scss">
.l-sent {
	display: flex;
	flex-direction: column;

	&__keynote {
	}

	&__content {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	&__message {
		width: 100%;
		display: flex;
		font-size: ms(-1);
		font-weight: 500;
		box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.1);

		&--warning {
			color: white;
			background-color: $red;
			border-radius: 10px;
			overflow: hidden;
			line-height: 2;
		}
	}

	&__message-icon-holder {
		margin-left: 0.5em;
		padding: $gutter--thin $gutter;
		background-color: tint($red, 10%);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	&__message-icon {
		size: 3em;
	}

	&__message-text {
		padding: $gutter--thin $gutter;
	}

	&__link-holder {
		width: 100%;
		margin-top: $gutter--thin;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		background-color: $green-lighter;
		padding: $gutter--thin;
		color: $white;
		box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.1);
		border-radius: 10px;
		overflow: hidden;
	}

	&__link {
	}

	&__bookmark {
		border-radius: 20em;
		padding: 0.5em 2em;
		transition-property: box-shadow, transform, background;
		transition-duration: 0.15s;
		transition-timing-function: ease-in-out;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		font-weight: 500;
		margin: $gutter 0;
		background: $white-2;
		color: $black-3;
		box-shadow: none;
	}
}
</style>
