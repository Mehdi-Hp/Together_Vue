<template>
	<article
		class="o-messages"
	>
		<div class="o-messages__inner">
			<form
				class="o-messages__form-holder"
				:class="{
					'o-messages__form-holder--has-error': hasError
				}"
				@submit.prevent
			>
				<message-sender
					class="o-messages__message-sender"
					mode="mini"
					@send="sendMessage"
					:is-busy="isBusy"
				/>
			</form>
			<section
				class="o-messages__events"
				v-if="!fieldOnly"
			>
				<event
					class="o-messages__event | m-event"
					:class="{
						'm-event--not-settled': event.notSettledYet
					}"
					v-for="(event, eventIndex) in events"
					:index="eventIndex"
					:key="event.id"
					:data="event"
					@retry="sendMessageAgain"
				>
				</event>
			</section>
		</div>
	</article>
</template>

<script>
import MessageSender from './MessageSender.vue';
import Field from './Field.vue';
import Event from './Event.vue';
import VButton from './Button.vue';

export default {
	name: 'Messages',
	components: {
		MessageSender,
		Field,
		Event,
		VButton
	},
	props: ['events', 'fieldOnly'],
	data() {
		return {
			isBusy: false,
			text: null
		};
	},
	computed: {
		hasError() {
			return this.events.some((event) => {
				return event.error;
			});
		}
	},
	methods: {
		sendMessage({ text, mood }) {
			this.isBusy = true;
			const message = {
				text,
				isCreatedByMyOwn: true,
				conversationId: this.$route.params.id,
				mood,
				replyToMessageId: null,
				type: 'message',
				notSettledYet: true,
				time: new Date().toISOString()
			};
			this.$emit('addMessage', message);
			this.$store
				.dispatch('createMessage', message)
				.then((message) => {
					setTimeout(() => {
						this.isBusy = false;
						this.$emit('messageSettled');
					}, 2000);
				})
				.catch((error) => {
					setTimeout(() => {
						this.isBusy = false;
						this.$emit('messageFailed', { error });
					}, 2000);
				});
		},
		sendMessageAgain(messageIndex) {
			const message = {
				text: this.events[messageIndex].text,
				mood: this.events[messageIndex].mood,
				conversationId: this.$route.params.id
			};
			this.$store.state.conversation.data.events[messageIndex].notSettledYet = true;
			this.$store.state.conversation.data.events[messageIndex].error = null;
			this.$store
				.dispatch('createMessage', message)
				.then((message) => {
					setTimeout(() => {
						this.$emit('messageSettled', messageIndex);
					}, 2000);
				})
				.catch((error) => {
					setTimeout(() => {
						this.$emit('messageFailed', { messageIndex, error });
					}, 2000);
				});
		}
	}
};
</script>

<style scoped lang="scss">
.o-messages {
	&__inner {
		width: $general-width;
		max-width: 100%;
		margin: auto;
	}

	&__form-holder {
		display: flex;
		flex-direction: column;
		margin-bottom: $gutter;
		background-color: $white;
		border-radius: 10px;
		overflow: hidden;
		box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.07);

		&--has-error {
		}
	}

	&__form {
		display: flex;
		padding: $gutter--thin;
		box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.03);
		z-index: g-index('land');
	}

	&__emoji-toggler {
		width: $ant-column;
		margin-left: $ant-gutter;
	}

	&__textfield {
		flex-grow: 1;
		width: auto;
		border: none;
		resize: none;
		height: 40px;
		padding-top: 0.5rem;
		color: $black-3;
		margin-left: $gutter;
		transition: height 0.15s ease-in-out 0.1s;

		&::-webkit-input-placeholder {
			color: $black-6;
		}
	}

	&__send {
		font-size: ms(-1);
		height: 40px;
		font-weight: 500;
	}

	&__emojies {
		height: 75px;
		background-color: $white-1;
		display: none;
	}

	&__events {
		display: flex;
		flex-direction: column;
		width: $inner-width;
		margin: 0 auto;
	}

	&__event {
	}
}
</style>
