<template>
	<section class="l-conversation">
		<aside class="l-conversation__summary">
			<div class="l-conversation__state-management">
				<span class="l-conversation__current-state">READ</span>
				<button class="l-conversation__change-state">Delete</button>
			</div>
			<div class="l-conversation__message-card | m-message-card">
				<h4 class="m-message-card__title">
					shstoghsi5ue ghoijegeklrg
				</h4>
				<div class="m-message-card__desc">
					uoyttthaeoltp o;rgha rtueo;hor jdhg ohusdrg o;bshn;gboh seo;rghuoyttthaeoltp o;rgha rtueo;hor jdhg ohusdrg o;bshn;gboh seo;rghuoyttthaeoltp o;rgha rtueo;hor jdhg ohusdrg o;bshn;gboh seo;rghuoyttthaeoltp o;rgha rtueo;hor jdhg ohusdrg o;bshn;gboh seo;rgh
				</div>
			</div>
			<div class="l-conversation__seat">
				<div class="l-conversation__seat-items">
					<span class="l-conversation__seat-item">Category</span>
					<span class="l-conversation__seat-item">MiddleMan</span>
				</div>
				<select class="l-conversation__seat">
					<option>skghsoirgyh</option>
					<option>skghsoirgyh</option>
					<option>skghsoirgyh</option>
					<option>skghsoirgyh</option>
					<option>skghsoirgyh</option>
				</select>
			</div>
		</aside>
		<messages class="l-conversation__messages"></messages>
	</section>
</template>

<script>
import Messages from './Messages.vue';

export default {
	name: 'Conversation',
	components: {
		Messages
	},
	props: [],
	data() {
		return {};
	},
	created() {
		this.$store.dispatch('getConversation', this.$route.params.id);
	}
};
</script>
