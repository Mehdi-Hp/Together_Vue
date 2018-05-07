<template>
	<section class="l-search">
		<keynote class="l-search__keynote">
			<template slot="title">
				ljhsrg
			</template>
			<template slot="desc">
				kjr g;oisdrjeg ;osirgje; osrgj;so rkjr g;oisdrjeg ;osirgje; osrgj;so rkjr g;oisdrjeg ;osirgje; osrgj;so rkjr g;oisdrjeg ;osirgje; osrgj;so rkjr g;oisdrjeg ;osirgje; osrgj;so rkjr g;oisdrjeg ;osirgje; osrgj;so rkjr g;oisdrjeg ;osirgje; osrgj;so rkjr g;oisdrjeg ;osirgje; osrgj;so rkjr g;oisdrjeg ;osirgje; osrgj;so r
			</template>
		</keynote>
		<div class="l-search__content">
			<form class="l-search__form">
				<textfield class="l-search__textfield"></textfield>
				<button class="l-search__submit | a-button">Go to conversation</button>
			</form>
		</div>
	</section>
</template>

<script>
import Keynote from './Keynote.vue';
import Textfield from './Textfield.vue';

export default {
	name: 'Search',
	components: {
		Keynote,
		Textfield
	},
	data() {
		return {};
	}
};
</script>

<style scoped lang="scss">
.l-search {
	&__keynote {
		margin-bottom: $gutter--fat;
	}

	&__content {
		display: flex;
		justify-content: center;
	}

	&__form {
		display: flex;
		flex-direction: column;
		width: 25em;
		padding: $gutter;
	}

	&__textfield {
	}

	&__submit {
	}
}
</style>
