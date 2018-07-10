<template>
	<div class="m-dropdown">
		<button
			class="m-dropdown__button"
			:class="{
				'm-dropdown__button--is-clicked': clicked,
				'm-dropdown__button--is-selected': selected,
				'm-dropdown__button--icon-only': mode === 'icon-only'
			}"
			@click="toggleState"
			@mousedown="clicked = true"
			@mouseup="clicked = false"
			v-on-clickaway="closeState"
		>
			<icon-arrow
				class="m-dropdown__icon"
				:class="{
					'm-dropdown__icon--is-clicked': state,
					'm-dropdown__icon--is-selected': selected,
					'm-dropdown__icon--icon-only': mode === 'icon-only'
				}"
				v-if="!icon"
			/>
			<component
				v-if="icon"
				:is="icon"
				class="m-dropdown__icon"
				:class="{
					'm-dropdown__icon--icon-only': mode === 'icon-only'
				}"
			/>
			<span
				class="m-dropdown__text"
				:class="{
					'm-dropdown__text--is-clicked': clicked,
					'm-dropdown__text--is-selected': selected,
					'm-dropdown__text--icon-only': mode === 'icon-only'
				}"
			>
				{{ selected || name }}
			</span>
		</button>
		<ul
			class="m-dropdown__list"
			:class="{
				'm-dropdown__list--is-visible': state,
				'm-dropdown__list--icon-only': mode === 'icon-only'
			}"
		>
			<li
				class="m-dropdown__item"
				v-for="item in list"
				:key="item.id"
				@click="selectItem(item.id, item.title)"
			>
				{{ item.title }}
			</li>
		</ul>
	</div>
</template>

<script>
import { directive as onClickaway } from 'vue-clickaway';
import IconArrow from './icons/Arrow.vue';
import IconPlus from './icons/Plus.vue';

export default {
	name: 'Dropdown',
	directives: {
		onClickaway
	},
	components: {
		IconArrow,
		IconPlus
	},
	props: ['isOpen', 'name', 'icon', 'list', 'mode'],
	data() {
		return {
			selected: null,
			state: !!this.isOpen,
			clicked: false
		};
	},
	methods: {
		selectItem(id, title) {
			this.selected = title;
			this.$emit('select', id);
		},
		toggleState() {
			this.state = !this.state;
			this.$emit('toggleState', this.state);
		},
		openState() {
			this.state = true;
			this.$emit('toggleState', true);
		},
		closeState() {
			this.state = false;
			this.$emit('toggleState', false);
		}
	}
};
</script>

<style scoped lang="scss">
.m-dropdown {
	position: relative;

	&__button {
		display: flex;
		align-items: center;
		background-color: $white-1;
		color: $black-3;
		border-radius: 10em;
		padding: 0.5em 1.5em;

		&--is-clicked {
			background-color: $white-2;
		}

		&--is-selected {
			background-color: tint($green-lighter, 70%);
			color: $green;
		}

		&--icon-only {
			background-color: transparent;
			padding: 0;
			justify-content: center;
			color: currentColor;
			size: 100%;
		}
	}

	&__icon {
		size: 0.6em;
		margin-left: 0.5em;
		stroke-width: 3px;
		color: $black-3;
		transform: rotateZ(180deg);
		transition: transform 0.15s;

		&--is-clicked {
			transform: rotateZ(180deg) translateY(-2px);
			color: $green;
		}

		&--is-selected {
			color: $green;
		}

		&--icon-only {
			margin-left: 0;
			color: currentColor;
			size: 45%;
			stroke-width: 7px;
		}
	}

	&__text {
		&--is-selected {
			color: $green;
		}

		&--icon-only {
			display: none;
		}
	}

	&__list {
		display: flex;
		flex-direction: column;
		background-color: $white;
		box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.1);
		padding: 1em 0;
		font-size: ms(-1);
		position: absolute;
		top: -0.5em;
		right: -0.5em;
		min-width: calc(100% + 0.5em);
		z-index: g-index('mountain');
		pointer-events: none;
		border-radius: 5px;
		opacity: 0;
		transform: translateY(-1em);
		transition: opacity 0.15s, transform 0.15s, width 0.15s;
		transition-delay: 0.1s;
		box-shadow: 0px 6px 100px -5px rgba(0, 0, 0, 0.1);
		color: $black-3;

		&--is-visible {
			opacity: 1;
			pointer-events: all;
			transform: translateY(0);
			transition-delay: 0.2s;
		}

		&--icon-only {
			transition-delay: 0s;
		}
	}

	&__item {
		padding: 0.5em 1.5em 0.5em 3em;
		white-space: nowrap;

		&:hocus {
			background-color: $white-1;
			cursor: pointer;
		}

		&:active {
			background-color: $white-2;
			box-shadow: 0px 2px 20px -1px rgba(0, 0, 0, 0.1);
		}
	}
}
</style>
