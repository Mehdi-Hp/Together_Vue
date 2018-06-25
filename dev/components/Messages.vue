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
				<div class="o-messages__form">
					<div class="o-messages__emoji-toggler">

					</div>
					<textarea
						rows="1"
						text="Title"
						type="textarea"
						placeholder="متن پیام"
						name="message"
						class="o-messages__textfield"
						@input="calcHeight"
						v-model="text"
						ref="text"
					></textarea>
					<v-button
						class="o-messages__send"
						mode="normal"
						@click="sendMessage"
						@keydown.enter.prevent="sendMessage"
					>
						ارسـال
					</v-button>
				</div>
				<div class="o-messages__emojies">
				</div>
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
					v-for="event in events"
					:key="event.id"
					:data="event"
				>
				</event>
			</section>
		</div>
	</article>
</template>

<script>
import Field from './Field.vue';
import Event from './Event.vue';
import VButton from './Button.vue';

export default {
	name: 'Messages',
	components: {
		Field,
		Event,
		VButton
	},
	props: ['events', 'fieldOnly'],
	data() {
		return {
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
		sendMessage() {
			const message = {
				text: this.text,
				isCreatedByMyOwn: true,
				conversationId: this.$route.params.id,
				mood: 1,
				replyToMessageId: null,
				type: 'message',
				notSettledYet: true
			};
			this.$emit('addMessage', message);
			this.text = null;
			this.$nextTick(() => {
				this.calcHeight();
			});
			this.$store
				.dispatch('createMessage', message)
				.then((newMessage) => {
					setTimeout(() => {
						this.$emit('messageSettled');
					}, 2000);
				})
				.catch((error) => {
					setTimeout(() => {
						this.$emit('messageFailed', error);
					}, 2000);
				});
		},
		sendMessageAgain() {},
		calcHeight() {
			this.$refs.text.style.height = 'auto';
			this.$refs.text.style.height = `${this.$refs.text.scrollHeight}px`;
		}
	}
};
</script>

<style scoped lang="scss">
.o-messages {
	overflow-y: scroll;

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
