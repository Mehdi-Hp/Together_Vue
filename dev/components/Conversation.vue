<template>
	<section
		class="l-conversation"
		v-show="$store.state.conversation.data.id"
	>
		<nav
			class="l-conversation__nav"
			v-if="isEmployee"
		>
			<router-link
				class="l-conversation__go-back"
				to="/conversations"
			>
				<icon-back class="l-conversation__go-back-icon" />
				<span class="l-conversation__go-back-text">
					لیست گفت‌و‌گوها
				</span>
			</router-link>
		</nav>
		<aside
			class="l-conversation__summary"
			v-if="!notFound"
		>
			<div class="l-conversation__state-management">
				<span class="l-conversation__current-state">{{ data.state }}</span>
				<dropdown
					class="l-conversation__state-changer"
					name="تغییر وضعیت"
					:list="getStates"
					@select="setState"
					v-if="isEmployee"
				/>
			</div>
			<div class="l-conversation__content-holder">
				<div
					class="l-conversation__emoji-holder"
					:class="{
						'l-conversation__emoji-holder--is-null': data.events.length && !data.events[data.events.length - 2].mood
					}"
				>
					<img
						class="l-conversation__emoji"
						:src="getSlecetedMoodImage"
					/>
				</div>
				<div class="l-conversation__content">
					<keynote class="l-conversation__keynote">
						<template slot="title">
							{{ data.title }}
						</template>
						<template slot="desc">
							{{ data.events.length && data.events[data.events.length - 2].text }}
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
							v-if="isEmployee"
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
import { mapGetters } from 'vuex';
import Dropdown from './Dropdown.vue';
import getImageFromMood from '../services/getImageFromMood';
import Messages from './Messages.vue';
import Tags from './Tags.vue';
import IconBack from './icons/Back.vue';

export default {
	name: 'Conversation',
	components: {
		Messages,
		Tags,
		Dropdown,
		IconBack
	},
	props: [],
	data() {
		return {
			data: {
				events: []
			},
			notFound: false
		};
	},
	computed: {
		...mapGetters({
			isEmployee: 'user/isEmployee'
		}),
		getSlecetedMoodImage() {
			if (this.data.events.length) {
				return getImageFromMood(this.data.events[this.data.events.length - 2].mood);
			}
		},
		getStates() {
			return [
				{
					title: 'بستن گفت‌و‌گو',
					value: 1
				},
				{
					title: 'بررسی بیشتر',
					value: 2
				},
				{
					title: 'ارجاع دادن',
					value: 3
				}
			];
		}
	},
	created() {
		this.$store
			.dispatch('conversation/getOne', this.$route.params.id)
			.then((conversation) => {
				this.data = conversation;
				this.$store.dispatch('conversation/markAsRead', this.data.id);
			})
			.catch((error) => {
				this.$bus.$emit('error', {
					status: error.status,
					message: error.status === 404 ? 'گفت‌وگوی مورد نظر شما پیدا نشد.' : error.statusText
				});
			});
	},
	mounted() {
		this.$bus.$on('addTag', (tagId) => {
			this.$store.dispatch('conversation/addTag', {
				tagId,
				conversationId: this.data.id
			});
		});
		this.$bus.$on('removeTag', (tagId) => {
			this.removeTag(tagId);
		});
	},
	methods: {
		addTag(tagId) {
			this.$store.dispatch('conversation/addTag', {
				tagId,
				conversationId: this.data.id
			});
		},
		removeTag(tagId) {
			this.$store.dispatch('conversation/removeTag', {
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
		},
		setState(state) {
			console.log({ state });
		}
	}
};
</script>

<style scoped lang="scss">
.l-conversation {
	padding: 0;
	max-width: 100%;

	&__nav {
		margin: $gutter auto 0 auto;
		width: $general-width;
		max-width: calc(100% - (#{$gutter--fat} * 2));
		padding: 0 $gutter;
		font-size: ms(-1);
		@include breakpoint(lg) {
			max-width: $general-width--lg;
		}
		@include breakpoint(md) {
			max-width: $general-width--md;
		}
		@include breakpoint(sm) {
			max-width: $general-width--sm;
			margin: 0 auto;
			padding: $gutter;
		}
	}

	&__go-back {
		color: $black-5;
		display: flex;
		align-items: center;
		padding: 0;
		background-color: transparent;
		font-weight: 500;
	}

	&__go-back-icon {
		margin-left: 0.5em;
		position: relative;
		top: -0.1em;
		font-size: 1.1em;
	}

	&__go-back-text {
	}

	&__summary {
		display: flex;
		flex-direction: column;
		margin: $gutter--fat auto;
		padding: 0 $gutter;
		width: $general-width;
		max-width: calc(100% - (#{$gutter--fat} * 2));
		@include breakpoint(lg) {
			max-width: $general-width--lg;
		}
		@include breakpoint(md) {
			max-width: $general-width--md;
		}
		@include breakpoint(sm) {
			max-width: $general-width--sm;
			margin: 0 auto;
			padding: $gutter;
		}
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

		&--is-null {
			filter: grayscale(1);
			opacity: 0.5;
		}
	}

	&__emoji {
		size: ms(5);
	}

	&__content {
		flex-grow: 1;
	}

	&__state-management {
		display: flex;
		margin-bottom: $gutter;
		margin-right: calc(#{$ant-column} + #{$ant-gutter});
		justify-content: space-between;
	}

	&__current-state {
		display: flex;
		align-items: center;
		color: $black-5;
		font-size: ms(-1);
		padding: 1em;
		background-color: $white-2;
		border-radius: 5px;
	}

	&__state-changer {
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
		@include breakpoint(sm) {
			padding: 0;
		}
	}

	&__events {
		display: flex;
		flex-direction: column;
	}

	&__event {
	}
}
</style>
