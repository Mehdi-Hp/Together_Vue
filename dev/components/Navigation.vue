<template>
	<div class="o-navigation">
		<nav class="o-navigation__inner">
			<button
				class="o-navigation__back"
				@click="goBack"
			>
				<icon-back class="o-navigation__back-icon" />
			</button>
			<div class="o-navigation__links | o-navigation__links--first">
				<router-link
					to="/new"
					class="o-navigation__link | o-navigation__link--first"
				>
					ایجاد گفت‌و‌گو
				</router-link>
			</div>
			<div class="o-navigation__links | o-navigation__links--last">
				<router-link
					to="/logout"
					class="o-navigation__link | o-navigation__link--last"
					v-if="$store.getters.isAdmin"
				>
					خروج
				</router-link>
			</div>
		</nav>
	</div>
</template>

<script>
import IconBack from './icons/Back.vue';

export default {
	name: 'Navigation',
	components: {
		IconBack
	},
	props: [],
	data() {
		return {};
	},
	methods: {
		goBack() {
			this.$router.go(-1);
		}
	}
};
</script>

<style scoped lang="scss">
.o-navigation {
	width: 100%;

	&__inner {
		width: $general-width;
		padding: 0 $gutter;
		margin: 0 auto;
		display: flex;
		align-items: center;
	}

	&__back {
		display: flex;
		align-items: center;
		justify-content: center;
		background: transparent;
		font-size: ms(2);
		padding: 0.5em 0;
		padding-left: $ant-gutter;
		padding-right: 0;
		color: $black-6;
		margin-left: $ant-gutter;
		border-left: 2px solid $white-4;
	}

	&__back-icon {
		size: 1em;
	}

	&__links {
		display: flex;
		flex-grow: 1;

		&--first {
			color: $black-5;
		}

		&--last {
			justify-content: flex-end;
			color: $red;
			font-weight: 500;
		}
	}

	&__link {
		padding: 0.5em;
		font-size: ms(-1);
		border-radius: 5px;

		&:hocus {
			background-color: $white-2;
		}

		&--first {
			margin-left: $ant-gutter;
		}

		&--last {
			margin-right: $ant-gutter;
		}
	}
}
</style>
