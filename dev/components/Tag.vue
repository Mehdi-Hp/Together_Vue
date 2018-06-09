<template>
	<li
		class="m-tag"
		:class="{
			'm-tag--is-hovered': isHovered,
			'm-tag--is-removing': isRemoving,
			'm-tag--is-visible': data.isSelected
		}"
		@mouseover="isHovered = true"
		@mouseleave="isHovered = false"
	>
		<span
			class="m-tag__text"
			:class="{
				'm-tag__text--is-removing': isRemoving
			}"
		>
			{{ data.title }}
		</span>
		<button
			class="m-tag__remove"
			:class="{
				'm-tag__remove--is-hovered': isHovered,
				'm-tag__remove--is-removing': isRemoving
			}"
			@click="remove"
		>
			<icon-close
				class="m-tag__remove-icon"
				:class="{
					'm-tag__remove-icon--is-hovered': isHovered,
					'm-tag__remove-icon--is-removing': isRemoving
				}"
			/>
		</button>
		<load-spinner
			class="m-tag__spinner"
			:class="{
				'm-tag__spinner--is-visible': isRemoving
			}"
			:animate="isRemoving"
		/>
	</li>
</template>

<script>
import EventBus from '../EventBus';
import IconClose from './icons/Close.vue';
import LoadSpinner from './icons/MaterialLoadSpinner.vue';

export default {
	name: 'Tag',
	components: {
		IconClose,
		LoadSpinner
	},
	props: ['data'],
	data() {
		return {
			isHovered: false,
			isRemoving: false
		};
	},
	methods: {
		remove() {
			this.isRemoving = true;
			EventBus.$emit('removeTag', this.data.id);
		}
	}
};
</script>

<style scoped lang="scss">
$tag-height: 1.8rem;

.m-tag {
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: $white-3;
	border-radius: 10em;
	color: $black-4;
	font-size: ms(-1);
	cursor: pointer;
	height: $tag-height;
	perspective: 10em;
	will-change: max-width;
	max-width: 0;
	opacity: 0;
	pointer-events: none;

	&--is-visible {
		max-width: 100vw;
		padding: 0 1.5em;
		padding-left: 0.25em;
		opacity: 1;
		pointer-events: all;
		transition-duration: 0.15s;
		transition-property: background-color, color, padding, max-width, opacity, margin;
	}

	&--is-hovered {
		background-color: $red;
		color: $white;
	}

	&--is-removing {
		transition-delay: 0.2s;
		transition-timing-function: cubic-bezier(0.01, 0.93, 0.58, 1);
		padding: 0.25em;
		max-width: $tag-height;
		overflow: hidden;
		background-color: tint($red, 10%);
		color: $white;
	}

	&__text {
		flex-grow: 1;
		margin-left: 2em;
		position: relative;
		opacity: 1;
		transition-duration: 0.15s;
		transition-timing-function: ease-out;
		transition-property: transform, opacity;

		&--is-removing {
			transform: scale(0.5);
			opacity: 0;
		}
	}

	&__remove {
		width: calc(#{$tag-height} - 0.3rem);
		height: calc(#{$tag-height} - 0.3rem);
		padding: 0.55em;
		background-color: transparent;
		display: flex;
		align-items: center;
		border-radius: 50%;
		color: $black-5;
		position: relative;
		top: 0.03em;
		transition-duration: 0.15s;
		transition-timing-function: ease-out;
		transition-property: background-color, color;

		&--is-hovered {
			background-color: shade($red, 10%);
			color: $white;
		}

		&--is-removing {
		}
	}

	&__remove-icon {
		size: 100%;
		stroke-width: 0.75em;

		&--is-hovered {
			stroke-width: 0.85em;
		}

		&--is-removing {
		}
	}

	&__spinner {
		position: absolute 0 0 0 0;
		margin: auto;
		color: white;
		opacity: 0;
		transform: scale(0.6);
		transition-duration: 0.15s;
		transition-timing-function: ease-out;
		transition-property: opacity, transform;
		transition-delay: 0.15s;

		&--is-visible {
			opacity: 1;
			transform: scale(1);
		}
	}
}
</style>
