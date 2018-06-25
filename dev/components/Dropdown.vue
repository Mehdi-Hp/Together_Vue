<template>
	<div
		class="m-dropdown"
		:class="{
			'm-dropdown--is-open': state
		}"
		ref="dropdown"
		@click="openState"
		v-on-clickaway="closeState"
	>
		<div
			class="m-dropdown__inner"
			:class="{
				'm-dropdown__inner--is-open': state
			}"
		>
			<div class="m-dropdown__icon">
				<slot name="icon"></slot>
			</div>
			<transition
				name="m-dropdown__items"
			>
				<div
					class="m-dropdown__items"
					:class="{
						'm-dropdown__items--is-open': state
					}"
				>
					<slot name="content"></slot>
				</div>
			</transition>
		</div>
	</div>
</template>

<script>
import { directive as onClickaway } from 'vue-clickaway';

export default {
	name: 'Dropdown',
	directives: {
		onClickaway
	},
	props: ['state', 'disabled'],
	data() {
		return {
			elements: {},
			styles: {}
		};
	},
	watch: {
		state() {
			if (this.state) {
				this.expand();
			} else {
				this.resetStyle();
			}
		},
		disabled() {
			this.resetStyle();
		}
	},
	mounted() {
		this.setElements();
		this.elements.dropdownItems.removeAttribute('style');
		// console.table(this.elements);
		this.setStyles();
		// console.table(this.styles.initial);
		// console.table(this.styles.wanted);
		this.resetStyle();
	},
	methods: {
		setElements() {
			this.elements = {
				dropdownIcon: this.$refs.dropdown.querySelector('.m-dropdown__icon'),
				dropdownInner: this.$refs.dropdown.querySelector('.m-dropdown__inner'),
				dropdownItems: this.$refs.dropdown.querySelector('.m-dropdown__items').firstElementChild
			};
		},
		setStyles() {
			this.styles = {
				initial: {
					width: `${this.$refs.dropdown.offsetWidth + 1}px`,
					height: `${this.$refs.dropdown.offsetHeight + 1}px`,
					background: window.getComputedStyle(this.$refs.dropdown).getPropertyValue('background-color'),
					borderRadius: window.getComputedStyle(this.$refs.dropdown).getPropertyValue('border-radius')
				},
				wanted: {
					width: Math.abs(this.elements.dropdownInner.getBoundingClientRect().right - this.elements.dropdownItems.getBoundingClientRect().left),
					height: Math.abs(this.elements.dropdownInner.getBoundingClientRect().top - this.elements.dropdownItems.getBoundingClientRect().bottom),
					background: window.getComputedStyle(this.elements.dropdownItems).getPropertyValue('background-color')
				}
			};
		},
		resetStyle() {
			this.setStyles();
			this.elements.dropdownIcon.style.width = this.styles.initial.width;
			this.elements.dropdownIcon.style.height = this.styles.initial.height;
			this.elements.dropdownInner.style.width = this.styles.initial.width;
			this.elements.dropdownInner.style.height = this.styles.initial.height;
			this.elements.dropdownInner.style.borderRadius = this.styles.initial.borderRadius;
			this.elements.dropdownInner.style.backgroundColor = this.styles.initial.background;
		},
		expand() {
			this.setStyles();
			this.elements.dropdownInner.style.borderRadius = 0;
			this.elements.dropdownInner.style.width = `${this.styles.wanted.width}px`;
			this.elements.dropdownInner.style.height = `${this.styles.wanted.height}px`;
			this.elements.dropdownInner.style.backgroundColor = this.styles.wanted.background;
		},
		openState() {
			this.$emit('toggleState', true);
		},
		closeState() {
			this.$emit('toggleState', false);
		}
	}
};
</script>

<style scoped lang="scss">
.m-dropdown {
	position: relative;
	color: $black-4;
	transition-duration: 0.15s;
	transition-timing-function: ease-in-out;
	transition-property: border-radius, width, height;

	&--is-open {
		border-radius: 0;
	}

	&__inner {
		position: absolute 0 0 0 0;
		overflow: hidden;
		size: 100%;
		box-sizing: content-box;
		background-color: white;
		transition: border-radius, border-top-right-radius 0.2s 0.1s, width, height, opacity, padding, background-color, box-shadow;
		transition-duration: 0.2s;
		transition-timing-function: ease-in;
		cursor: pointer;
		box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0);

		&:before {
			content: '';
			position: absolute 0 0 0 0;
			background-color: transparentize(black, 1);
		}

		&:hocus {
			&:before {
				background-color: transparentize(black, 0.8);
			}
		}

		&--is-open {
			border-radius: 0;
			transition: border-radius, border-top-right-radius, width, height, opacity, padding, background-color, box-shadow;
			transition-duration: 0.15s;
			transition-timing-function: cubic-bezier(0, 0.65, 0, 0.9);
			box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.1);

			&:before {
				visibility: hidden;
			}
		}
	}

	&__icon {
		position: absolute 0 0 auto auto;
		padding: 0.5em;
		display: flex;
		align-items: center;
		& svg {
		}
	}

	&__items {
		position: absolute;
		top: 0;
		margin: auto;
		transition: opacity 0.15s 0.2s;
		opacity: 0;
		pointer-events: none;

		&--is-open {
			opacity: 1;
			pointer-events: all;
		}
	}
}
</style>
