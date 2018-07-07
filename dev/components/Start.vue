<template>
	<section
		class="l-start"
		v-if="!isAdmin"
	>
		<keynote class="l-start__keynote">
			<template slot="title">
				‌فرصت کاری
			</template>
			<template slot="desc">
				‌ کشفیات ما نشون می‌ده که زنبورهای عسل می‌تونن مفهوم بزرگتر و کوچیکتر رو بفهمن و تابلوی خالی رو با مفهوم صفر ببینن و اون رو در مقایسه با بقیه اعداد، بسنجن. با توجه به این مساله، می‌توانیم سطح زنبور رو در درک صفر با نخستی‌های (پرایمیت‌های) غیرانسان مشابه بدونیم چون اون‌ها هم درک می‌کنن که صفر از یک کمتر است.
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
			<router-link
				to="/login"
				v-if="!hasToken"
			>
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
			return !!this.$store.state.user.employeeId;
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
	}

	&__content {
		display: flex;
		align-items: center;
		margin-top: $gutter;
		margin-bottom: $gutter--fat;
	}

	&__new-advice {
		font-weight: 500;
		margin-left: $gutter;
	}

	&__login {
		box-shadow: none;

		&:hocus {
			box-shadow: none;
		}
	}
}
</style>
