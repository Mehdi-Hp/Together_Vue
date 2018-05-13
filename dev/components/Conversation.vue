<template>
	<section class="l-conversation">
		<aside class="l-conversation__summary">
			<div class="l-conversation__state-management">
				<span class="l-conversation__current-state">{{ data.state }}</span>
				<button class="l-conversation__change-state">Delete</button>
			</div>
			<div class="l-conversation__message-card | m-message-card">
				<h4 class="m-message-card__title">
					{{ data.title }}
				</h4>
				<div class="m-message-card__desc">
					{{ data.events && data.events[0].text }}
				</div>
			</div>
			<div class="l-conversation__seat">
				<div class="l-conversation__seat-items">
					<span class="l-conversation__seat-item">{{ data.type }}</span>
					<span class="l-conversation__seat-item">{{ data.assignee }}</span>
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
import Messages from './Messages.vue';

export default {
	name: 'Conversation',
	components: {
		Messages
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
	methods: {
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
	&__summary {
		margin-bottom: $gutter--fat;
	}

	&__state-management {
		display: flex;
		justify-content: space-between;
		margin-bottom: $gutter;
		font-size: ms(1);
	}

	&__message-card {
		margin-bottom: $gutter;
	}

	&__seat {
		display: flex;
		justify-content: space-between;
	}

	&__seat-items {
	}

	&__seat-item {
		margin-right: $gutter;
	}

	&__messages {
		background-color: mix(white, black, 95%);
		flex-grow: 1;
	}

	&__events {
		display: flex;
		flex-direction: column;
	}

	&__event {
	}
}
</style>
