<template>
	<section class="l-conversation">
		<aside class="l-conversation__summary">
			<div class="l-conversation__state-management">
				<span class="l-conversation__current-state">{{ data.state }}</span>
				<button
					class="l-conversation__change-state"
					v-if="false"
				>
					Delete
				</button>
			</div>
			<keynote class="l-conversation__keynote">
				<template slot="title">
					{{ data.title }}
				</template>
				<template slot="desc">
					{{ data.events && data.events[0].text }}
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
		</aside>
		<messages
			class="l-conversation__messages"
			:events="data.events"
			@addMessage="appendMessage"
			@messageSettled="makeMessageSettled"
			@esageFaild="removeUnsettledMessaeg"
		></messages>
	</section>
</template>

<script>
import EventBus from '../EventBus';
import Messages from './Messages.vue';
import Tags from './Tags.vue';

export default {
	name: 'Conversation',
	components: {
		Messages,
		Tags
	},
	props: [],
	data() {
		return {
			data: {}
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
			});
	},
	mounted() {
		const self = this;
		EventBus.$on('removeTag', (tagId) => {
			self.removeTag(tagId);
		});
	},
	methods: {
		removeTag(tagId) {
			this.$store.dispatch('removeConversationTag', tagId);
		},
		appendMessage(message) {
			this.data.events.unshift(message);
		},
		makeMessageSettled() {
			const messageToSettle = this.data.events.find((event) => {
				return event.notSettledYet;
			});
			messageToSettle.notSettledYet = false;
		},
		removeUnsettledMessaeg() {
			this.data.events = this.data.events.filter((event) => {
				return !event.notSettledYet;
			});
		}
	}
};
</script>

<style scoped lang="scss">
.l-conversation {
	max-width: 100%;
	padding: 0;

	&__summary {
		padding: $gutter $gutter--fat;
		padding-bottom: 0;
		margin: auto;
		margin-bottom: $gutter--fat;
		max-width: $general-width;
	}

	&__state-management {
		display: flex;
		justify-content: space-between;
		margin-bottom: $gutter--thin;
		font-size: ms(-1);
	}

	&__current-state {
		display: flex;
		align-items: center;
		background-color: $white-6;
		border-radius: 5px;
		padding: 0.5em;
		font-weight: 500;
		color: $black-4;
		margin-bottom: $gutter;
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
		background-color: mix(white, black, 95%);
		flex-grow: 1;
		padding-top: $gutter--fat;
	}

	&__events {
		display: flex;
		flex-direction: column;
	}

	&__event {
	}
}
</style>
