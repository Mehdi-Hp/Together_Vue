<template>
	<div
		class="m-dropdown"
		:class="{
			'm-dropdown--is-open': state
		}"
		@click="$emit('toggleState', !state)"
		ref="dropdown"
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
			<div class="m-dropdown__items">
				<slot name="content">
					<ul>
						<li>test</li>
						<li>test</li>
						<li>test</li>
						<li>test</li>
						<li>test</li>
						<li>test</li>
					</ul>
				</slot>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Dropdown',
	props: ['state'],
	data() {
		return {};
	},
	watch: {
		state() {
			if (this.state) {
				this.expand();
			} else {
				this.resetStyle();
			}
		}
	},
	mounted() {
		this.$elements = {
			dropdownStyles: window.getComputedStyle(this.$refs.dropdown),
			dropdownInner: this.$refs.dropdown.querySelector('.m-dropdown__inner'),
			dropdownItems: this.$refs.dropdown.querySelector('.m-dropdown__items'),
			wantedSize: {
				width: Math.abs(
					this.$refs.dropdown.querySelector('.m-dropdown__inner').getBoundingClientRect().right - this.$refs.dropdown.querySelector('.m-dropdown__items').getBoundingClientRect().left
				),
				height: Math.abs(
					this.$refs.dropdown.querySelector('.m-dropdown__inner').getBoundingClientRect().top - this.$refs.dropdown.querySelector('.m-dropdown__items').getBoundingClientRect().bottom
				)
			}
		};
		console.log(this.$elements);
		this.resetStyle();
	},
	methods: {
		resetStyle() {
			this.$elements.dropdownInner.style.borderRadius = this.$elements.dropdownStyles.getPropertyValue('border-radius');
			console.log(this.$elements.dropdownStyles.width, this.$elements.dropdownStyles.height);
			this.$elements.dropdownInner.style.width = `${this.$refs.dropdown.offsetWidth}px`;
			this.$elements.dropdownInner.style.height = `${this.$refs.dropdown.offsetHeight}px`;
		},
		expand() {
			this.$elements.dropdownInner.style.borderRadius = 0;
			this.$elements.dropdownInner.style.width = `${this.$elements.wantedSize.width}px`;
			this.$elements.dropdownInner.style.height = `${this.$elements.wantedSize.height}px`;
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
		transition-duration: 0.15s;
		transition-timing-function: ease-in-out;
		transition-property: border-radius, width, height, opacity, padding;

		&--is-open {
			padding: 1em;
			border-radius: 0;
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
		top: 2em;
		right: 2em;
		& ul {
		}

		& li {
		}
	}
}
</style>
