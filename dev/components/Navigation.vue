<template>
	<div
		class="o-navigation"
		v-if="$route.meta.navbar && $route.meta.navbar.length"
	>
		<nav class="o-navigation__inner">
			<router-link
				:to="$router.lastRoute"
				class="o-navigation__back"
				v-if="false"
			>
				<icon-back class="o-navigation__back-icon" />
			</router-link>
			<div class="o-navigation__links | o-navigation__links--first">
				<router-link
					to="/new"
					class="o-navigation__link | o-navigation__link--first"
					v-if="!isEmployee && $route.meta.navbar.includes('new')"
				>
					ایجاد گفت‌و‌گو
				</router-link>
				<router-link
					to="/conversations"
					class="o-navigation__link | o-navigation__link--first"
					v-if="isEmployee && $route.meta.navbar.includes('conversations')"
				>
					لیست گفت‌وگوها
				</router-link>
			</div>
			<div class="o-navigation__links | o-navigation__links--last">
				<router-link
					to="/logout"
					class="o-navigation__link | o-navigation__link--last"
					v-if="$route.meta.navbar.includes('logout')"
				>
					خروج
				</router-link>
			</div>
		</nav>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import IconBack from './icons/Back.vue';

export default {
	name: 'Navigation',
	components: {
		IconBack
	},
	props: [],
	data() {
		return {
			backIsTogether: false
		};
	},
	computed: {
		...mapGetters({
			isEmployee: 'user/isEmployee'
		})
	},
	watch: {
		$route() {
			if (this.$router.lastRoute !== '/') {
				this.showBackButton = true;
			} else {
				this.showBackButton = false;
			}
		}
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
		width: 100%;
		padding: 0 $gutter;
		margin: 0 auto;
		display: flex;
		align-items: center;
		max-width: $general-width;
		@include breakpoint(lg) {
			max-width: $general-width--lg;
		}
		@include breakpoint(md) {
			max-width: $general-width--md;
			padding: $gutter--thin $gutter;
		}
		@include breakpoint(sm) {
			max-width: $general-width--sm;
			padding: 0 $gutter;
		}
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
		font-size: ms(-1);
		border-radius: 20em;
		background-color: $white-2;

		&:hocus {
			background-color: $white-3;
		}

		&--first {
			padding: 0.5em 1em;
			margin-left: $ant-gutter;
			border-radius: 20em;
			background-color: $white-2;
		}

		&--last {
			padding: 0.5em;
			margin-right: $ant-gutter;
			border-radius: 20em;
			background-color: transparent;
		}
	}
}
</style>
