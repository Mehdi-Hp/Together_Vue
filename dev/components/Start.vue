<template>
	<section
		class="l-start"
		v-if="!isAdmin"
	>
		<keynote class="l-start__keynote">
			<template slot="title">
				با هم 🤝 Together
			</template>
			<template slot="desc">
				هدف از ایجاد سامانه پیشنهادات و انتقادات این است که تمامی کارکنان شرکت ارکید فارمد بتوانند در محیطی امن و به دور از ملاحظات یا نگرانی ها پیام خود را به مدیرعامل سازمان برسانند.
				<br />
				این سامانه می تواند با کمک شما پیشنهادات و انتقادات را به گوش مدیرعامل برساند و باعث بهبود عملکرد سازمانی شود.
			</template>
		</keynote>

		<div class="l-start__content">
			<router-link to="/new">
				<v-button
					class="l-start__new-advice"
					mode="normal"
				>
					گفت‌و‌گوی جدید
				</v-button>
			</router-link>
			<router-link to="/login">
				<v-button
					class="l-start__login"
					mode="nonsignificant"
				>
					ورود
				</v-button>
			</router-link>
		</div>
	</section>
</template>

<script>
import Keynote from './Keynote.vue';
import VButton from './Button.vue';

export default {
	name: 'Start',
	components: {
		Keynote,
		VButton
	},
	data() {
		return {};
	},
	computed: {
		hasToken() {
			return !!this.$ls.get('token');
		},
		isAdmin() {
			return !!this.$store.getters.isAdmin;
		}
	},
	mounted() {
		if (this.isAdmin) {
			this.$router.replace('/conversations');
		}
	}
};
</script>

<style scoped lang="scss">
.l-start {
	display: flex;
	flex-direction: column;

	&__keynote {
		margin-top: $gutter--fat;
		@include breakpoint(sm) {
			margin-top: $gutter;
		}
	}

	&__content {
		display: flex;
		align-items: center;
		margin-top: $gutter;
		margin-bottom: $gutter--fat;
		@include breakpoint(sm) {
			margin-top: 0;
			margin-bottom: $gutter;
			flex-direction: column;
			align-items: flex-start;
		}
	}

	&__new-advice {
		font-weight: 500;
		margin-left: $gutter;
		@include breakpoint(sm) {
			margin-left: 0;
			margin-bottom: $gutter--thin;
		}
	}

	&__login {
		box-shadow: none;

		&:hocus {
			box-shadow: none;
		}
	}
}
</style>
