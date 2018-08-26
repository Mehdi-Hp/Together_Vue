<template>
	<div class="m-emojies">
		<div
			class="m-emojies__item"
			:class="{
				'm-emojies__item--is-active': value === 1,
				'm-emojies__item--xsmall': $eq.xsmall,
				'm-emojies__item--small': $eq.small
			}"
		>
			<img
				class="m-emojies__item-image"
				src="../assets/images/emoji--happy.png"
				@click="$emit('change', 1)"
			/>
		</div>
		<div
			class="m-emojies__item"
			:class="{
				'm-emojies__item--is-active': value === 2,
				'm-emojies__item--xsmall': $eq.xsmall,
				'm-emojies__item--small': $eq.small
			}"
		>
			<img
				class="m-emojies__item-image"
				src="../assets/images/emoji--gratefull.png"
				@click="$emit('change', 2)"
			/>
		</div>
		<div
			class="m-emojies__item"
			:class="{
				'm-emojies__item--is-active': value === 3,
				'm-emojies__item--xsmall': $eq.xsmall,
				'm-emojies__item--small': $eq.small
			}"
		>
			<img
				class="m-emojies__item-image"
				src="../assets/images/emoji--cry.png"
				@click="$emit('change', 3)"
			/>
		</div>
		<div
			class="m-emojies__item"
			:class="{
				'm-emojies__item--is-active': value === 4,
				'm-emojies__item--xsmall': $eq.xsmall,
				'm-emojies__item--small': $eq.small
			}"
		>
			<img
				class="m-emojies__item-image"
				src="../assets/images/emoji--frustrated.png"
				@click="$emit('change', 4)"
			/>
		</div>
		<div
			class="m-emojies__item"
			:class="{
				'm-emojies__item--is-active': value === 5,
				'm-emojies__item--xsmall': $eq.xsmall,
				'm-emojies__item--small': $eq.small
			}"
		>
			<img
				class="m-emojies__item-image"
				src="../assets/images/emoji--angry.png"
				@click="$emit('change', 5)"
			/>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Emojies',
	eq: {
		breakpoints: {
			xsmall: { maxWidth: 280 },
			small: { maxWidth: 400 }
		}
	},
	props: ['value'],
	data() {
		return {};
	}
};
</script>

<style scoped lang="scss">
$emoji-width: 3em;
$emoji-width--small: 2.4em;
$emoji-width--xsmall: 2.1em;

.m-emojies {
	position: relative;
	display: flex;
	background-color: $white-1;
	padding: $gutter--thin;
	width: 100%;

	&__toggler-image {
		size: 100%;
	}

	&__item {
		size: $emoji-width;
		margin-left: $ant-gutter;
		transition: filter 0.15s, opacity 0.15s, transform 0.15s;
		filter: grayscale(1);
		opacity: 0.5;
		cursor: pointer;

		&:hocus {
			filter: grayscale(0.5);
		}

		&:active {
			transform: rotateZ(10deg);
		}

		&:last-of-type {
			margin-left: 0;
		}

		&--is-active {
			filter: grayscale(0);
			opacity: 1;
		}

		&--small {
			size: $emoji-width--small;
		}
		&--xsmall {
			size: $emoji-width--xsmall;
			margin-left: $gutter--thin / 2;
		}
	}

	&__item-image {
		size: 100%;
	}
}
</style>
