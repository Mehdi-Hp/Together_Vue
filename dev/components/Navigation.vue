<template>
	<div class="o-navigation">
		<router-link :to="$router.go(-1)">
			<span class="o-navigation__back">

			</span>
		</router-link>
	</div>
</template>

<script>
export default {
	name: 'Navigation',
	props: [],
	data() {
		return {};
	}
};
</script>

<style scoped lang="scss">
.o-navigation {
}
</style>
