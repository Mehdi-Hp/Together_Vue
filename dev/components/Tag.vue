<template>
	<li
		class="m-tag"
		:class="{
			'm-tag--is-hovered': isHovered,
			'm-tag--is-removing': isRemoving
		}"
		@mouseover="isHovered = true"
		@mouseleave="isHovered = false"
		@click="remove"
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
		>
			<icon-close
				class="m-tag__remove-icon"
				:class="{
					'm-tag__remove-icon--is-hovered': isHovered,
					'm-tag__remove-icon--is-removing': isRemoving
				}"
			/>
		</button>
	</li>
</template>

<script>
import EventBus from '../EventBus';
import IconClose from './icons/Close.vue';

export default {
	name: 'Tag',
	components: {
		IconClose
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
	padding: 0 1.5em;
	padding-left: 0.25em;
	font-size: ms(-1);
	cursor: pointer;
	height: $tag-height;
	max-width: 100vw;
	perspective: 10em;
	transition-duration: 0.15s;
	transition-timing-function: ease-in-out;
	transition-property: background-color, color, padding, max-width;

	&--is-hovered {
		background-color: $red;
		color: $white;
	}

	&--is-removing {
		padding: 0.25em;
		max-width: $tag-height;
		overflow: hidden;
		transition-delay: 0.2s;
	}

	&__text {
		flex-grow: 1;
		margin-left: 2em;
		position: relative;
		opacity: 1;
		transition-duration: 0.15s;
		transition-timing-function: ease-in-out;
		transform-origin: right;
		transition-property: transform, opacity;

		&--is-removing {
			transform: rotateY(-65deg);
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
		color: $black-4;
		position: relative;
		top: 0.03em;
		transition-duration: 0.15s;
		transition-timing-function: ease-in-out;
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
}
</style>
