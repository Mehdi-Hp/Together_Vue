<template>
	<div
		class="m-event"
		:class="{
			'm-event--for-me': data.isCreatedByMyOwn && data.type.toLowerCase() === 'message',
			'm-event--has-error': data.error
		}"
	>
		<div
			class="m-event__content"
			:class="{
				'm-event__content--for-me': data.isCreatedByMyOwn && data.type.toLowerCase() === 'message',
				'm-event__content--has-error': data.error
			}"
			v-if="data.type.toLowerCase() === 'message'"
		>
			<div class="m-event__information">
				<div class="m-event__emoji-holder">
					<div class="m-event__emoji">

					</div>
				</div>
				<span
					class="m-event__writer"
					:class="{
						'm-event__writer--is-admin': $store.state.user.role === 'agent'
					}"
				>
					{{ data.user }}
				</span>
				<div
					class="m-event__controls"
					v-if="data.error"
				>
					<v-button
						class="m-event__resend"
						mode="error"
						@click="this.$emit('resendMessage')"
					>
						<icon-exclam class="m-event__control-icon" />
						تلاش مجدد
					</v-button>
				</div>
				<div
					class="m-event__status"
					:class="{
						'm-event__status--for-me': data.isCreatedByMyOwn && data.type.toLowerCase() === 'message',
						'm-event__status--error': data.error
					}"
					v-if="data.isCreatedByMyOwn && !data.error"
				>
					<load-spinner
						class="m-event__spinner"
						:class="{
							'm-event__spinner--for-me': data.isCreatedByMyOwn && data.type.toLowerCase() === 'message'
						}"
						:animate="data.notSettledYet"
						v-if="data.notSettledYet"
					/>
					<icon-checkmark
						class="m-event__status-icon"
						:class="{
							'm-event__status-icon--for-me': data.isCreatedByMyOwn && data.type.toLowerCase() === 'message'
						}"
						v-else-if="!seen"
					/>
					<icon-seen
						class="m-event__status-icon"
						:class="{
							'm-event__status-icon--for-me': data.isCreatedByMyOwn && data.type.toLowerCase() === 'message'
						}"
						v-else-if="seen"
					/>
				</div>
			</div>
			<p class="m-event__text">
				{{ data.text }}
			</p>
			<span
				class="m-event__time"
				:class="{
					'm-event__time--for-me': data.isCreatedByMyOwn
				}"
			>
				{{ messageTime }}
			</span>
		</div>
		<span
			class="m-event__content | m-event__content--plain"
			v-if="data.type.toLowerCase() !== 'message'"
		>
			{{ persianType(data.type) }} در {{ persianDate(data.time) }}
		</span>
	</div>
</template>

<script>
import IconSeen from './icons/Seen.vue';
import IconCheckmark from './icons/Checkmark.vue';
import IconAlert from './icons/Alert.vue';
import IconError from './icons/Error.vue';
import IconExclam from './icons/Exclam.vue';
import VButton from './Button.vue';
import LoadSpinner from './icons/MaterialLoadSpinner.vue';

const PersianDate = require('persian-date');

export default {
	name: 'Event',
	components: {
		IconSeen,
		IconCheckmark,
		IconAlert,
		IconError,
		IconExclam,
		VButton,
		LoadSpinner
	},
	props: ['data'],
	data() {
		return {
			seen: true
		};
	},
	computed: {
		messageTime() {
			const today = new PersianDate();
			const eventDate = new PersianDate(new Date(this.data.time).getTime());
			console.log('today', today);
			console.log('eventDate', eventDate);
			if (eventDate.isSameDay(today)) {
				return new PersianDate(this.data.time).format('HH:mm');
			}
			return this.persianDate(this.data.time);
		}
	},
	methods: {
		persianDate(date) {
			return new PersianDate(date).format('D/MMMM/YYYY - HH:mm');
		},
		persianType(type) {
			const persianTypes = {
				Created: 'ایجاد شده'
			};
			return persianTypes[type];
		}
	}
};
</script>

<style scoped lang="scss">
.m-event {
	display: flex;
	width: 100%;
	margin-bottom: 1em;
	position: relative;

	&--for-me {
	}

	&--not-settled {
	}

	&--has-error {
	}

	&__content {
		display: flex;
		align-items: center;
		flex-direction: column;
		background-color: $white;
		padding: $gutter;
		box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.05);
		width: 100%;
		position: relative;
		border-radius: 0 25px 25px 25px;

		&:before {
			content: '';
			position: absolute;
			top: 0;
			left: -2em;
			width: 0;
			height: 0;
			border-right: 1em solid white;
			border-top: 1em solid white;
			border-left: 1em solid transparent;
			border-bottom: 1em solid transparent;
			z-index: g-index('land');
		}

		&:after {
			content: '';
			position: absolute;
			top: 0.9em;
			left: -2.2em;
			width: 2.5em;
			height: 1px;
			background: $white;
			transform: rotateZ(45deg);
			box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.15);
		}

		&--for-me {
			background: linear-gradient(to top, tint($green-lighter, 30%) 0%, tint($green-lighter, 60%) 100%);
			border-radius: 25px 0 25px 25px;

			&:before {
				content: '';
				position: absolute;
				top: 0;
				right: -2em;
				width: 0;
				height: 0;
				border-left: 1em solid tint($green-lighter, 60%);
				border-top: 1em solid tint($green-lighter, 60%);
				border-right: 1em solid transparent;
				border-bottom: 1em solid transparent;
				z-index: g-index('land');
			}

			&:after {
				content: '';
				position: absolute;
				top: 0.9em;
				right: -2.2em;
				width: 2.5em;
				height: 1px;
				background: $white;
				transform: rotateZ(-45deg);
				box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.15);
			}
		}

		&--has-error {
			background: linear-gradient(to top, $red 0%, tint($red, 30%) 100%);
			color: $white;

			&:before {
				border-left-color: tint($red, 30%);
				border-top-color: tint($red, 30%);
			}

			&:after {
				border-left-color: tint($red, 30%);
				border-top-color: tint($red, 30%);
			}
		}

		&--plain {
			padding: 0;
			border-radius: 0;
			box-shadow: none;
			background-color: transparent;
			font-size: ms(-1);
			color: $black-6;
			&:before {
				display: none;
			}
			&:after {
				display: none;
			}
		}
	}

	&__information {
		display: flex;
		align-items: center;
		width: 100%;
		margin-bottom: $gutter--thin;
	}

	&__emoji-holder {
		width: 40px;
		margin-left: $gutter--thin;
	}

	&__emoji {
		size: 35px;
		border-radius: 50%;
		background-color: $white-2;
	}

	&__writer {
		color: $green;
		flex-grow: 1;

		&--is-admin {
			visibility: hidden;
		}
	}

	&__status {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		size: 2em;
		border-radius: 50%;
		padding: 0.35em;
		cursor: pointer;
		position: relative;

		&:hocus {
			background-color: $white-1;
		}

		&--for-me {
			&:hocus {
				background-color: tint($green-lighter, 30%);
			}
		}

		&--error {
			cursor: default;
			&:hocus {
				background-color: transparent;
			}
		}
	}

	&__spinner {
		color: $white-6;

		&--for-me {
			color: shade($green-lighter, 10%);
		}
	}

	&__status-icon {
		color: $white-6;
		width: 100%;

		&--for-me {
			color: shade($green-lighter, 10%);
		}

		&--error {
			color: $red;
			width: auto;
		}
	}

	&__error {
	}

	&__text {
		width: 100%;
		line-height: 1.7;
		overflow: hidden;
		color: mix($black-3, $green-light, 70%);

		&--for-me {
		}
	}

	&__time {
		display: flex;
		margin-top: $gutter--thin;
		width: 100%;
		font-size: ms(-2);
		color: shade(white, 30%);

		&--for-me {
			color: mix($green-light, black, 90%);
		}
	}

	&__controls {
		width: 100%;
		display: flex;
		justify-content: flex-end;
	}

	&__resend {
		box-shadow: none;
		position: absolute;
		top: 1em;
		left: 1em;
		font-size: ms(-1);
		padding: 0.4em 1.5em;
		background: transparentize(white, 0.8);

		&:hocus {
			box-shadow: none;
			background: transparentize(white, 0.7);
		}
	}

	&__control-icon {
		margin-left: 0.75em;
		margin-right: -0.9em;
		position: relative;
		height: 1.4em;

		&:before {
			content: '';
			position: absolute 0 0 0 0;
			border: 2px solid $white;
		}
	}
}
</style>
