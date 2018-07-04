<template>
	<section class="l-sent">
		<keynote class="l-sent__keynote">
			<template slot="title">
				گفت‌وگو ساخه شد
			</template>
			<template slot="desc">

			</template>
		</keynote>

		<div class="l-sent__message-card | m-message-card">
			<h4 class="m-message-card__title">
				shstoghsi5ue ghoijegeklrg
			</h4>
			<div class="m-message-card__desc">
				uoyttthaeoltp o;rgha rtueo;hor jdhg ohusdrg o;bshn;gboh seo;rghuoyttthaeoltp o;rgha rtueo;hor jdhg ohusdrg o;bshn;gboh seo;rghuoyttthaeoltp o;rgha rtueo;hor jdhg ohusdrg o;bshn;gboh seo;rghuoyttthaeoltp o;rgha rtueo;hor jdhg ohusdrg o;bshn;gboh seo;rgh
			</div>
		</div>

		<div class="l-sent__content">
			<p class="l-sent__message">
				پیام شما به صورت ناشناس ارسال، و یک لینک منحصر به‌فرد به این منظور شاخته شد.
			</p>
			<p class="l-sent__message | l-sent__message--warning">
				<icon-alert class="l-sent__message-icon" />
				مطمئن شوید لینک را جایی ذخیره خواهید کرد.
				<br />
				در صورت از دست دادن لینک، راهی برای رسیدن به این گفت‌و‌گو نخواهید داشت.
			</p>
			<div class="l-sent__link-holder">
				<router-link
					:to="`/conversations/${conversationId}`"
					class="l-sent__link"
				>
					{{ conversationId }}
				</router-link>
				<router-link
					:to="`/conversations/${conversationId}`"
					class="l-sent__open"
				>
					Go
				</router-link>
			</div>
			<button class="l-sent__bookmark | a-button">Bookmark the link</button>
		</div>
	</section>
</template>

<script>
import Keynote from './Keynote.vue';
import IconAlert from './icons/Alert.vue';

export default {
	name: 'CreatedConversation',
	components: {
		Keynote,
		IconAlert
	},
	// props: ['conversationId'],
	data() {
		return {
			conversationId: '070bb7a9-d05a-4181-b11f-1a0c520d69be'
		};
	}
};
</script>

<style scoped lang="scss">
.l-sent {
	display: flex;
	flex-direction: column;

	&__keynote {
		margin-bottom: $gutter--fat;
	}

	&__message-card {
		margin-bottom: $gutter;
	}

	&__content {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	&__message {
		display: flex;
		align-items: center;
		align-self: flex-start;
		margin-top: $gutter--thin;

		&--warning {
			font-size: ms(-1);
			font-weight: 500;
			color: $red;
			background-color: $white-1;
			line-height: 2;
			padding: 1em;
		}
	}

	&__message-icon {
		font-size: ms(2);
		margin-left: 0.5em;
	}

	&__link-holder {
		margin-top: $gutter--fat;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: $gutter;
		position: relative;
	}

	&__link {
		padding: 1em;
		background-color: mix(white, black, 96%);
		text-decoration: underline;
	}

	&__open {
		margin-left: 0.5em;
		position: absolute;
		right: 0;
		left: 100%;
	}
}
</style>
