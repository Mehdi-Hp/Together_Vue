<template>
	<section class="o-keynote">
		<h2 class="o-keynote__title">
			<slot name="title"></slot>
		</h2>
		<div class="o-keynote__content">
			<p class="o-keynote__desc | o-keynote__desc--significant">
				<slot name="desc--significant"></slot>
			</p>
			<p class="o-keynote__desc">
				<slot name="desc"></slot>
			</p>
			<p class="o-keynote__desc | o-keynote__desc--non-significant">
				<slot name="desc--non-significant"></slot>
			</p>
		</div>
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

	&__content {
		margin-top: $gutter;
		display: flex;
		flex-direction: column;
		line-height: 1.5;
	}

	&__desc {
		margin-bottom: 1em;

		&:empty {
			display: none;
		}

		&--significant {
			padding: 1em;
			border-radius: 5px;
			background-color: $white-2;
		}

		&--non-significant {
			font-size: ms(-1);
			color: shade($green, 30%);
			font-weight: 500;
		}
	}
}
</style>
