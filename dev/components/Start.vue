<template>
	<section class="l-start">
		<keynote class="l-start__keynote">
			<template slot="title">
				ljhsrgilraug
			</template>
			<template slot="desc">
				kjr g;oisdrjeg ;osirgje; osrgj;so rkjr g;oisdrjeg ;osirgje; osrgj;so rkjr g;oisdrjeg ;osirgje; osrgj;so rkjr g;oisdrjeg ;osirgje; osrgj;so rkjr g;oisdrjeg ;osirgje; osrgj;so rkjr g;oisdrjeg ;osirgje; osrgj;so rkjr g;oisdrjeg ;osirgje; osrgj;so rkjr g;oisdrjeg ;osirgje; osrgj;so rkjr g;oisdrjeg ;osirgje; osrgj;so r
			</template>
		</keynote>

		<div class="l-start__content">
			<router-link
				to="/new"
				class="l-start__new-advice | a-button"
			>
				New Anonymous Message
			</router-link>
		</div>
	</section>
</template>

<script>
import Keynote from './Keynote.vue';

export default {
	name: 'Start',
	components: {
		Keynote
	},
	data() {
		return {};
	}
};
</script>

<style scoped lang="scss">
.l-start {
	display: flex;
	flex-direction: column;

	&__keynote {
	}

	&__content {
		display: flex;
	}

	&__new-advice {
		margin-top: $gutter;
	}
}
</style>
