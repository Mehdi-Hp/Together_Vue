<template>
	<article
		v-if="events"
		class="o-messages"
	>
		<form
			class="o-messages__form"
			@submit.prevent
		>
			<textfield
				text="Title"
				type="text"
				name="message"
				class="o-messages__textfield"
				@inputChange="(value) => text = value"
			/>
			<button
				class="o-messages__send | a-button"
				@click="sendMessage"
				@keydown.enter.prevent="sendMessage"
			>
				Send
			</button>
		</form>
		<section class="o-messages__events">
			<event
				class="o-messages__event | m-event"
				:class="{
					'm-event--not-settled': event.notSettledYet
				}"
				v-for="event in events"
				:key="event.id"
			>
				<span
					class="m-event__content"
					v-if="event.type.toLowerCase() === 'message'"
				>
					{{ event.text }} at {{ event.time }}
				</span>
				<span
					class="m-event__content"
					v-if="event.type.toLowerCase() !== 'message'"
				>
					{{ event.type }} at {{ event.time }}
				</span>
			</event>
		</section>
	</article>
</template>

<script>
import Textfield from './Textfield.vue';
import Event from './Event.vue';

export default {
	name: 'Messages',
	components: {
		Textfield,
		Event
	},
	props: ['events'],
	data() {
		return {
			text: null
		};
	},
	watch: {},
	methods: {
		sendMessage() {
			const message = {
				text: this.text,
				conversationId: this.$route.params.id,
				mood: 1,
				replyToMessageId: null,
				type: 'message',
				notSettledYet: true
			};
			this.$emit('addMessage', message);
			this.$store
				.dispatch('createMessage', message)
				.then((newMessage) => {
					setTimeout(() => {
						this.$emit('messageSettled');
					}, 2000);
				})
				.catch((error) => {
					this.$emit('messageFaild');
				});
		}
	}
};
</script>
