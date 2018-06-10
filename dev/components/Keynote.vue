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

	&__title {
		margin-bottom: $gutter;
		color: $main-color;
	}

	&__desc {
		display: flex;
		flex-direction: column;
		line-height: 1.5;
	}
}
</style>
