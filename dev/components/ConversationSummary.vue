<template>
	<article
		class="o-conversation-summary"
		:class="{
			'o-conversation-summary--card': $eq.large
		}"
		@mouseover="isHovered = true"
		@mouseout="isHovered = false"
	>
		<div
			class="o-conversation-summary__main"
			:class="{
				'o-conversation-summary__main--card': $eq.large
			}"
		>
			<button
				class="o-conversation-summary__expand"
				:class="{
					'o-conversation-summary__expand--is-hovered': isHovered,
					'o-conversation-summary__expand--is-active': isFirstMessageVisible,
					'o-conversation-summary__expand--card': $eq.large
				}"
				@click="toggleFirstMessage"
			>
				<icon-speech class="o-conversation-summary__expand-icon" />
			</button>
			<router-link
				class="o-conversation-summary__content"
				:class="{
					'o-conversation-summary__content--card': $eq.large
				}"
				:to="`/conversations/${id}`"
			>
				<span
					class="o-conversation-summary__text | o-conversation-summary__text--badge"
					:class="{
						'o-conversation-summary__text--badge--card': $eq.large
					}"
					v-if="newMessagesCount"
				>
					{{ getMessageCount(newMessagesCount) }}
				</span>
				<span
					class="o-conversation-summary__text | o-conversation-summary__text--title"
					:class="{
						'o-conversation-summary__text--title--card': $eq.large,
						'o-conversation-summary__text--title--card--small': $eq.small
					}"
				>
					{{ title }}
				</span>
				<span
					class="o-conversation-summary__text | o-conversation-summary__text--type"
					:class="{
						'o-conversation-summary__text--type--card': $eq.large
					}"
				>
					{{ type }}
				</span>
				<div
					class="o-conversation-summary__times"
					:class="{
						'o-conversation-summary__times--card': $eq.large,
						'o-conversation-summary__times--card--small': $eq.small
					}"
				>
					<span
						class="o-conversation-summary__times-title"
						:class="{
							'o-conversation-summary__times-title--is-visible': $eq.large
						}"
					>
						آخرین فعالیت
					</span>
					<span
						class="o-conversation-summary__text | o-conversation-summary__text--time"
						:class="{
							'o-conversation-summary__text--time--card': $eq.large,
							'o-conversation-summary__text--time--card--small': $eq.small
						}"
					>
						{{ time }}
					</span>
					<span
						class="o-conversation-summary__times-title"
						:class="{
							'o-conversation-summary__times-title--is-visible': $eq.large
						}"
					>
						شروع گفت وگو
					</span>
					<span
						class="o-conversation-summary__text | o-conversation-summary__text--time"
						:class="{
							'o-conversation-summary__text--time--card': $eq.large,
							'o-conversation-summary__text--time--card--small': $eq.small
						}"
					>
						{{ time }}
					</span>
				</div>
			</router-link>
		</div>
		<div
			class="o-conversation-summary__first-message"
			:class="{
				'o-conversation-summary__first-message--is-visible': isFirstMessageVisible,
				'o-conversation-summary__first-message--card': $eq.large,
				'o-conversation-summary__first-message--card--small': $eq.small
			}"
		>
			<span
				class="o-conversation-summary__message"
				:class="{
					'o-conversation-summary__message--is-visible': isFirstMessageVisible,
					'o-conversation-summary__message--card': $eq.large,
					'o-conversation-summary__message--card--small': $eq.small
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
	eq: {
		breakpoints: {
			large: { maxWidth: 700 },
			medium: { maxWidth: 600 },
			small: { maxWidth: 400 }
		}
	},
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

	&--card {
		background-color: $white-1;
		margin-bottom: $gutter--thin;
	}

	&__main {
		display: flex;

		&--card {
			align-items: flex-start;
		}
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

		&--card {
			align-self: flex-start;
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

		&--card {
			flex-wrap: wrap;
			position: relative;
		}
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

			&--card {
				width: 100%;
				margin-top: $gutter--thin / 2 + 2px;
				margin-left: 8.5em;

				&--small {
					margin-left: 0;
				}
			}
		}

		&--type {
			font-size: ms(-1);
			flex-grow: 0;
			max-width: 60px;
			justify-content: center;

			&--card {
				margin-top: $gutter--thin;
				background-color: $white-2;
				border-radius: 5px;
				padding: 0.5em;
				font-size: ms(-2);
			}
		}

		&--time {
			font-size: ms(-1);
			color: $black-6;
			flex-grow: 1;
			justify-content: center;

			&--card {
				font-size: ms(-2);
				margin-left: 0;
				justify-content: flex-end;
				line-height: 1;
				flex-grow: 0;
				flex-shrink: 0;
				padding-bottom: $gutter--thin / 2;
				margin-bottom: $gutter--thin / 2;
				border-bottom: 1px solid $white-3;
				width: auto;

				&--small {
					width: 100%;
					justify-content: flex-start;
					border-bottom: none;
				}

				&:last-of-type {
					border-bottom: none;
					padding-bottom: 0;
					margin-bottom: 0;
				}
			}
		}
	}

	&__times {
		display: flex;
		flex-grow: 1;

		&--card {
			position: absolute 0 auto 0 0;
			flex-direction: column;
			text-align: left;
			justify-content: center;
			align-items: flex-end;
			padding: $gutter--thin;

			&--small {
				flex-direction: row;
				position: static;
				width: 100%;
				padding: 15px 0;
				justify-content: flex-start;
				flex-wrap: wrap;
			}
		}
	}

	&__times-title {
		flex-shrink: 0;
		font-size: ms(-3);
		font-weight: 500;
		margin-bottom: 0.5em;
		color: $black-5;
		line-height: 1;
		display: none;

		&--is-visible {
			display: inline-flex;
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
		transition-timing-function: linear;

		&--is-visible {
			padding: $gutter $gutter--fat;
			padding-top: 0;
			max-height: 20em;
		}

		&--card {
			&--small {
				padding: 0;
			}
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
		overflow: hidden;

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

		&:after {
			content: '';
			position: absolute auto 0 0 0;
			height: 2em;
			background: linear-gradient(to top, tint($green, 80%) 0%, transparentize(white, 1) 100%);
		}

		&--is-visible {
			transition-timing-function: ease-in;
			transform: translateY(0);
			opacity: 1;
			pointer-events: all;
		}

		&--card {
			margin-top: $gutter;
			font-size: ms(-1);

			&--small {
				border-radius: 25px 25px 0 0;
				margin-top: 0;
				font-size: ms(-2);
			}
		}
	}
}
</style>
