<template>
	<section class="l-conversation">
		<aside
			class="l-conversation__summary"
			v-if="!notFound"
		>
			<div class="l-conversation__state-management">
				<span class="l-conversation__current-state">{{ data.state }}</span>
				<button
					class="l-conversation__change-state"
					v-if="false"
				>
					Delete
				</button>
			</div>
			<div class="l-conversation__content-holder">
				<div class="l-conversation__emoji-holder">
					<div class="l-conversation__emoji">

					</div>
				</div>
				<div class="l-conversation__content">
					<keynote class="l-conversation__keynote">
						<template slot="title">
							{{ data.title }}
						</template>
						<template slot="desc">
							{{ data.events && data.events[data.events.length - 2].text }}
						</template>
					</keynote>
					<div class="l-conversation__seat">
						<div class="l-conversation__information">
							<div class="l-conversation__info">
								<span class="l-conversation__info-title">
									گروه :
								</span>
								<span class="l-conversation__info-value">
									{{ data.type }}
								</span>
							</div>
							<div class="l-conversation__info">
								<span class="l-conversation__info-title">
									بررسی توسط :
								</span>
								<span class="l-conversation__info-value">
									{{ data.assignee }}
								</span>
							</div>
						</div>
						<tags
							class="l-conversation__tags"
							:tags="data.tags"
						>
						</tags>
					</div>
				</div>
			</div>
		</aside>
		<messages
			v-if="Object.keys(data).length"
			class="l-conversation__messages"
			:events="data.events"
			@addMessage="appendMessage"
			@messageSettled="makeMessageSettled"
			@messageFailed="errorUnsettledMessage"
		>
		</messages>
	</section>
</template>

<script>
import Messages from './Messages.vue';
import Tags from './Tags.vue';

export default {
	name: 'Conversation',
	components: {
		Messages,
		Tags,
		Error
	},
	props: [],
	data() {
		return {
			data: {},
			notFound: false
		};
	},
	created() {
		this.$store
			.dispatch('getConversation', this.$route.params.id)
			.then((conversation) => {
				this.data = conversation;
			})
			.catch((error) => {
				console.error(error);
				this.$bus.$emit('error', {
					status: error.status,
					message: error.status === 404 ? 'گفت‌وگوی مورد نظر شما پیدا نشد.' : error.statusText
				});
			});
	},
	mounted() {
		this.$bus.$on('addTag', (tagId) => {
			this.addTag(tagId);
		});
		this.$bus.$on('removeTag', (tagId) => {
			this.removeTag(tagId);
		});
	},
	methods: {
		addTag(tagId) {
			this.$store.dispatch('addConversationTag', {
				tagId,
				conversationId: this.data.id
			});
		},
		removeTag(tagId) {
			this.$store.dispatch('removeConversationTag', {
				tagId,
				conversationId: this.data.id
			});
		},
		appendMessage(message) {
			this.data.events.unshift(message);
		},
		makeMessageSettled(eventIndex) {
			let messageToSettle;
			if (eventIndex) {
				messageToSettle = this.data.events[eventIndex];
			} else {
				messageToSettle = this.data.events.find((event) => {
					return event.notSettledYet;
				});
			}
			messageToSettle.notSettledYet = false;
		},
		errorUnsettledMessage({ error, messageIndex }) {
			let messageToSettle;
			if (typeof messageIndex !== 'undefined') {
				messageToSettle = this.data.events[messageIndex];
			} else {
				messageToSettle = this.data.events.find((event) => {
					return event.notSettledYet;
				});
			}
			messageToSettle.notSettledYet = false;
			this.$set(messageToSettle, 'error', error);
		}
	}
};
</script>

<style scoped lang="scss">
.l-conversation {
	padding: 0;
	max-width: 100%;

	&__summary {
		display: flex;
		flex-direction: column;
		margin: $gutter auto $gutter--fat auto;
		width: $inner-width;
	}

	&__content-holder {
		display: flex;
	}

	&__emoji-holder {
		display: flex;
		width: $ant-column;
		margin-left: $ant-gutter;
		align-self: flex-start;
		flex-shrink: 0;
	}

	&__emoji {
		size: ms(5);
		border-radius: 50%;
		background-color: $white-6;
	}

	&__content {
		flex-grow: 1;
	}

	&__state-management {
		display: flex;
		justify-content: space-between;
		margin-bottom: $gutter--fat;
		font-size: ms(-1);
	}

	&__current-state {
		display: flex;
		align-items: center;
		border-radius: 5px;
		font-weight: 500;
		color: $black-4;
	}

	&__message-card {
		margin-bottom: $gutter;
	}

	&__seat {
		display: flex;
		flex-direction: column;
	}

	&__information {
		display: flex;
		flex-direction: column;
		margin-bottom: $gutter;
	}

	&__info {
		font-size: ms(-1);
		margin-bottom: 1em;
	}

	&__info-title {
		color: $black-6;
		margin-left: 0.25em;
	}

	&__info-value {
		color: $main-color;
	}

	&__messages {
		background-color: $white-2;
		flex-grow: 1;
		padding: $gutter 0 $gutter--fat 0;
	}

	&__events {
		display: flex;
		flex-direction: column;
	}

	&__event {
	}
}
</style>
