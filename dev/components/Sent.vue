<template>
	<section class="l-sent">
		<keynote class="l-sent__keynote">
			<template slot="title">
				ljhsrgilraug
			</template>
			<template slot="desc">
				kjr g;oisdrjeg ;osirgje; osrgj;so rkjr g;oisdrjeg ;osirgje; osrgj;
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
				Your message sent as ANONYMOUS and a random link generated for you.
			</p>
			<p class="l-sent__message | l-sent__message--warning">
				Make sure you wont lose the link. It's not recoverable.
			</p>
			<div class="l-sent__link-holder">
				<router-link
					to="/conversation"
					class="l-sent__link"
				>
					Go to conversation
				</router-link>
				<router-link
					to="/conversation"
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

export default {
	name: 'Sent',
	components: {
		Keynote
	},
	data() {
		return {};
	}
};
</script>
