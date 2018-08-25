<template>
	<section class="o-keynote">
		<h2 class="o-keynote__title">
			<slot name="title"></slot>
		</h2>
		<p class="o-keynote__desc">
			<slot name="desc"></slot>
		</p>
	</section>
</template>

<script>
export default {
	name: 'Keynote',
	props: [],
	data() {
		return {};
	}
};
</script>

<style scoped lang="scss">
.o-keynote {
	display: flex;
	flex-direction: column;
	color: $black-4;
	margin-bottom: $gutter--fat;
	@include breakpoint(sm) {
		margin-bottom: $gutter;
	}

	&__title {
		color: $main-color;
	}

	&__desc {
		margin-top: $gutter;
		display: flex;
		flex-direction: column;
		line-height: 1.5;

		&:empty {
			display: none;
		}
	}
}
</style>
