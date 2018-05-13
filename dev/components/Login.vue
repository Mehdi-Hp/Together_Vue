<template>
	<section class="l-login">
		<keynote>
			<template slot="title">
				مغز کارهای سختی داره
			</template>
			<template slot="desc">
				مسیحیان فعلی تعصب کمتری دارند و این کمی تعصب مربوط به خود آنها نیست، بلکه بایستی از نسل‌ها آزاد اندیشانی سپاسگزار باشند که از زمان رنسانس تا به امروز تلاش کرده‌اند و مسیحیان را از بسیاری از عقاید خود شرمنده کرده‌اند.
			</template>
		</keynote>
		<form class="l-login__form">
			<field
				class="l-login__field"
				name="username"
				label="نام کاربری"
				type="text"
				direction="ltr"
				@input="(username) => { username = username }"
			></field>
			<field
				class="l-login__field"
				name="password"
				label="رمز عبور"
				type="password"
				direction="ltr"
				@input="(password) => { password = password }"
			></field>
			<v-button
				class="l-login__submit"
				mode="normal"
			>
				ورود به سیستم
			</v-button>
			<button class="l-login__forgot">
				فراموشی رمز عبــور
			</button>
		</form>
	</section>
</template>

<script>
import Field from './Field.vue';
import VButton from './Button.vue';

export default {
	name: 'Login',
	components: {
		Field,
		VButton
	},
	props: [],
	data() {
		return {};
	}
};
</script>

<style scoped lang="scss">
.l-login {
	&__form {
		display: flex;
		flex-direction: column;
	}

	&__field {
		margin-bottom: $gutter / 2;
	}

	&__submit {
		margin-top: $gutter;
		align-self: flex-start;
	}

	&__forgot {
		margin-top: $gutter;
		align-self: flex-start;
		background: transparent;
		padding: 0;
		font-size: ms(-1);
		text-decoration: underline;
	}
}
</style>
