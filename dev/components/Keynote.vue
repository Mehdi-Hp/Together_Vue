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
