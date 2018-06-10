<template>
	<article
		v-if="events"
		class="o-messages"
	>
		<div class="o-messages__inner">
			<form
				class="o-messages__form"
				@submit.prevent
			>
				<field
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
		</div>
	</article>
</template>

<script>
import Field from './Field.vue';
import Event from './Event.vue';

export default {
	name: 'Messages',
	components: {
		Field,
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

<style scoped lang="scss">
.o-messages {
	overflow-y: scroll;

	&__inner {
		max-width: $general-width;
		margin: auto;
		padding: 0 $gutter--fat 0 $gutter--thin;
	}

	&__form {
		display: flex;
		margin-bottom: $gutter;
	}

	&__textfield {
		flex-grow: 1;
	}

	&__send {
		font-weight: bold;
		font-size: ms(0);
	}

	&__events {
		display: flex;
		flex-direction: column;
	}

	&__event {
	}
}
</style>
