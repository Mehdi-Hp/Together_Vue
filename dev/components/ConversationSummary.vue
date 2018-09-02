<template>
	<article
		class="o-conversation-summary"
		@mouseover="isHovered = true"
		@mouseout="isHovered = false"
	>
		<div class="o-conversation-summary__main">
			<button
				class="o-conversation-summary__expand"
				:class="{
					'o-conversation-summary__expand--is-hovered': isHovered,
					'o-conversation-summary__expand--is-active': isFirstMessageVisible
				}"
				@click="toggleFirstMessage"
			>
				<icon-speech class="o-conversation-summary__expand-icon" />
			</button>
			<router-link
				class="o-conversation-summary__content"
				:to="`/conversations/${id}`"
			>
				<span
					class="o-conversation-summary__text | o-conversation-summary__text--badge"
					v-if="newMessagesCount"
				>
					{{ getMessageCount(newMessagesCount) }}
				</span>
				<span class="o-conversation-summary__text | o-conversation-summary__text--title">
					{{ title }}
				</span>
				<span class="o-conversation-summary__text | o-conversation-summary__text--type">
					{{ type }}
				</span>
				<span class="o-conversation-summary__text | o-conversation-summary__text--time">
					{{ time }}
				</span>
				<span class="o-conversation-summary__text | o-conversation-summary__text--time">
					{{ time }}
				</span>
			</router-link>
		</div>
		<div
			class="o-conversation-summary__first-message"
			:class="{
				'o-conversation-summary__first-message--is-visible': isFirstMessageVisible
			}"
		>
			<span
				class="o-conversation-summary__message"
				:class="{
					'o-conversation-summary__message--is-visible': isFirstMessageVisible
				}"
			>
				{{ firstMessage }}
			</span>
		</div>
	</article>
</template>

<script>
import toPersianDigit from '../services/toPersianDigits';
import IconSpeech from './icons/Speech.vue';

export default {
	name: 'ConversationSummary',
	components: {
		IconSpeech
	},
	props: ['id', 'newMessagesCount', 'title', 'type', 'time', 'firstMessage'],
	data() {
		return {
			isHovered: false,
			isFirstMessageVisible: false
		};
	},
	methods: {
		toggleFirstMessage() {
			this.isFirstMessageVisible = !this.isFirstMessageVisible;
		},
		getMessageCount(messageCount) {
			if (messageCount <= 99) {
				return this.persianDigit(messageCount);
			}
			return '∞';
		},
		persianDigit(digit) {
			return toPersianDigit(digit);
		}
	}
};
</script>

<style scoped lang="scss">
.o-conversation-summary {
	display: flex;
	flex-direction: column;
	transition: background-color 0.15s, box-shadow 0.15s;

	&:nth-child(even) {
		background-color: $white-1;
	}

	&:hocus {
		outline: 4px solid tint($green, 70%);
		box-shadow: 0 10px 20px 0 transparentize($green, 0.95);
		z-index: 1;
	}

	&:active {
		transform: scale(0.98);
		background-color: tint($green, 85%);
	}

	&__main {
		display: flex;
	}

	&__expand {
		padding: 1em;
		margin: 1em;
		flex-shrink: 0;
		background-color: transparent;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 10em;
		transition: background-color 0.15s, color 0.15s, stroke-width;

		&:hover {
			background-color: tint($green, 90%);
		}

		&--is-hovered {
			background-color: $white-1;
			color: $green;
			stroke-width: 4px;
		}

		&--is-active {
			background-color: tint($green, 85%);
			color: $green;
			stroke-width: 4px;
		}
	}

	&__expand-icon {
		size: 1.3em;
		opacity: 0.3;
		transition: color 0.15s, opacity 0.15s;

		&--is-visible {
			opacity: 1;
			color: $green;
		}
	}

	&__content {
		display: flex;
		align-items: center;
		width: 100%;
		padding: $gutter--thin;
		transition: background-color 0.15s, box-shadow 0.15s, transform 0.15s;
		flex-grow: 1;
		padding-right: 0;
	}

	&__text {
		display: flex;
		align-items: center;
		flex-grow: 3;
		margin-left: $gutter;
		width: 100px;
		cursor: pointer;

		&:last-of-type {
			margin-left: 0;
		}

		&--badge {
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 50%;
			background-color: $red;
			color: white;
			font-weight: 500;
			flex-grow: 0;
			size: 1.5em;
			font-size: ms(-1);
			padding-top: 0.2em;
		}

		&--title {
			color: $green;
			flex-grow: 3;
		}

		&--type {
			font-size: ms(-1);
			flex-grow: 0;
			max-width: 60px;
			justify-content: center;
		}

		&--time {
			font-size: ms(-1);
			color: $black-6;
			flex-grow: 1;
			justify-content: center;
		}
	}

	&__first-message {
		width: 100%;
		display: flex;
		font-size: ms(-1);
		line-height: 1.5;
		color: $black-4;
		max-height: 0;
		padding: 0 $gutter--fat;
		transition: padding 0.15s, max-height 0.15s;
		perspective: 10em;

		&--is-visible {
			padding: $gutter $gutter--fat;
			padding-top: 0;
			max-height: 300px;
		}
	}

	&__message {
		padding: $gutter--thin;
		background-color: tint($green, 86%);
		position: relative;
		cursor: pointer;
		width: 100%;
		opacity: 0;
		border-radius: 0 25px 25px 25px;
		transition: opacity 0.15s, transform 0.15s;
		transform: translateY(3em);
		pointer-events: none;

		&:before {
			content: '';
			position: absolute;
			top: 0;
			left: -1em;
			width: 0;
			height: 0;
			border-right: 0.5em solid #e3f3e5;
			border-top: 0.5em solid #e3f3e5;
			border-left: 0.5em solid transparent;
			border-bottom: 0.5em solid transparent;
			z-index: 3;
		}

		&--is-visible {
			transition-timing-function: ease-in;
			transform: translateY(0);
			opacity: 1;
			pointer-events: all;
		}
	}
}
</style>
