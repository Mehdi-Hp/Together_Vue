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
			<div class="m-dropdown__look">
				<div class="m-dropdown__icon">
					<slot name="icon"></slot>
				</div>
				<div class="m-dropdown__text">
					<slot name="text"></slot>
				</div>
			</div>
			<div
				class="m-dropdown__after"
				:class="{
					'm-dropdown__after--is-hidden': showHide,
					'm-dropdown__after--is-open': state
				}"
			>
				<slot name="content"></slot>
			</div>
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
	props: ['state', 'disabled', 'showHide'],
	data() {
		return {
			elements: {},
			styles: {},
			alreadySetStyles: false
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
		this.elements.dropdownInner.removeAttribute('style');
		// console.table(this.elements);
		this.setStyles();
		// console.table(this.styles.initial);
		// console.table(this.styles.wanted);
		this.resetStyle();
		if (this.state) {
			this.expand();
		}
	},
	methods: {
		setElements() {
			this.elements = {
				dropdownInner: this.$refs.dropdown.querySelector('.m-dropdown__inner'),
				after: this.$refs.dropdown.querySelector('.m-dropdown__after').firstElementChild
			};
		},
		setStyles() {
			if (!this.alreadySetStyles) {
				this.styles = {
					initial: {
						width: `${this.$refs.dropdown.offsetWidth}px`,
						height: `${this.$refs.dropdown.querySelector('.m-dropdown__look').offsetHeight}px`,
						background: window.getComputedStyle(this.$refs.dropdown).getPropertyValue('background-color'),
						borderRadius: window.getComputedStyle(this.$refs.dropdown).getPropertyValue('border-radius'),
						padding: window.getComputedStyle(this.$refs.dropdown).getPropertyValue('padding')
					},
					wanted: {
						width: `${Math.abs(this.$refs.dropdown.getBoundingClientRect().right - this.elements.after.getBoundingClientRect().left)}px`,
						height: `${Math.abs(this.$refs.dropdown.getBoundingClientRect().top - this.elements.after.getBoundingClientRect().bottom)}px`,
						background: window.getComputedStyle(this.elements.after).getPropertyValue('background-color'),
						borderRadius: window.getComputedStyle(this.elements.after).getPropertyValue('border-radius')
					}
				};
				if (!this.showHide) {
					const wantedWidth = Math.abs(this.$refs.dropdown.getBoundingClientRect().right - this.elements.after.getBoundingClientRect().left);
					const minWidth = this.$refs.dropdown.offsetWidth;
					if (wantedWidth < minWidth) {
						this.styles.wanted.width = `${minWidth}px`;
					}
					// console.log('wantedWidth', wantedWidth);
					// console.log('minWidth', minWidth);
				}
				this.alreadySetStyles = true;
			} else {
				this.styles = {
					initial: {
						width: `${this.$refs.dropdown.offsetWidth}px`,
						height: `${this.$refs.dropdown.offsetHeight}px`,
						background: this.styles.initial.background,
						borderRadius: this.styles.initial.borderRadius,
						padding: this.styles.initial.padding
					},
					wanted: {
						width: `${Math.abs(this.$refs.dropdown.getBoundingClientRect().right - this.elements.after.getBoundingClientRect().left)}px`,
						height: `${Math.abs(this.$refs.dropdown.getBoundingClientRect().top - this.elements.after.getBoundingClientRect().bottom)}px`,
						background: window.getComputedStyle(this.elements.after).getPropertyValue('background-color'),
						borderRadius: window.getComputedStyle(this.elements.after).getPropertyValue('border-radius')
					}
				};
				if (!this.showHide) {
					const wantedWidth = Math.abs(this.$refs.dropdown.getBoundingClientRect().right - this.elements.after.getBoundingClientRect().left);
					const minWidth = this.$refs.dropdown.offsetWidth;
					if (wantedWidth < minWidth) {
						this.styles.wanted.width = `${minWidth}px`;
					}
					// console.log('wantedWidth', wantedWidth);
					// console.log('minWidth', minWidth);
				}
			}
		},
		resetStyle() {
			this.setStyles();
			this.elements.dropdownInner.style.width = this.styles.initial.width;
			this.elements.dropdownInner.style.height = this.styles.initial.height;
			this.elements.dropdownInner.style.borderRadius = this.styles.initial.borderRadius;
			this.elements.dropdownInner.style.backgroundColor = this.styles.initial.background;
			this.elements.dropdownInner.style.padding = this.styles.initial.padding;
			this.$refs.dropdown.style.padding = 'initial';
			this.$refs.dropdown.style.backgroundColor = 'transparent';
			this.$refs.dropdown.style.borderRadius = 0;
			this.$refs.dropdown.style.width = this.styles.initial.width;
			this.$refs.dropdown.style.height = this.styles.initial.height;
			this.elements.dropdownInner.style.position = 'absolute';
		},
		expand() {
			this.setStyles();
			this.elements.dropdownInner.style.width = this.styles.wanted.width;
			this.elements.dropdownInner.style.height = this.styles.wanted.height;
			this.elements.dropdownInner.style.borderRadius = this.styles.wanted.borderRadius;
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
		overflow: hidden;
		top: 0px;
		right: 0px;
		bottom: 0px;
		left: 0px;
		transition: border-radius, border-top-right-radius 0.2s 0.1s, width, height, opacity, padding, background-color, box-shadow;
		transition-duration: 0.2s;
		transition-timing-function: ease-in;
		cursor: pointer;

		&--is-open {
			transition: border-radius 0.2s, border-top-right-radius 0.2s, width 0.2s 0.1s, height 0.2s 0.1s, opacity 0.2s 0.1s, padding 0.2s 0.1s, background-color 0.2s 0.1s, box-shadow 0.2s 0.1s;
			transition-duration: 0.2s;
			transition-timing-function: cubic-bezier(0.05, 0.55, 0.4, 0.85);
			box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.1);
		}
	}

	&__after {
		position: absolute 0 0 0 0;
		overflow: hidden;
		size: 100%;
		box-sizing: content-box;
		box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0);
		cursor: default;
		transition: opacity 0.15s;
		pointer-events: none;

		&--is-hidden {
			opacity: 0;
		}

		&--is-vidible {
			opacity: 1;
			pointer-events: all;
		}
	}

	&__icon {
		display: flex;
		align-items: center;
	}

	&__text {
		display: flex;
		align-items: center;
		white-space: nowrap;
	}

	&__look {
		display: flex;
		cursor: pointer;
	}

	&__after {
		position: absolute;
		top: 0;
		right: 0;
		margin: auto;
		transition: opacity 0.15s 0.2s;
		pointer-events: none;

		&--is-open {
			opacity: 1;
			pointer-events: all;
		}
	}
}
</style>
