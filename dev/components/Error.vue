<template>
	<section class="l-error">
		<div class="l-error__status">
			<h2 class="l-error__status-number">
				{{ status }}
			</h2>
			<span class="l-error__status-message">
				{{ message }}
			</span>
		</div>
		<div class="l-error__ctas">
			<a
				class="l-error__cta"
				href="/"
			>
				<icon-list class="l-error__cta-icon | l-error__cta-icon--list"></icon-list>
				لیست گفت‌وگوها
			</a>
		</div>
	</section>
</template>

<script>
import IconList from './icons/List.vue';

export default {
	name: 'Error',
	components: {
		IconList
	},
	props: ['status', 'message'],
	data() {
		return {};
	},
	computed: {}
};
</script>

<style scoped lang="scss">
.l-error {
	display: flex;
	flex-direction: column;

	&__status {
		display: flex;
		flex-direction: column;
	}

	&__status-number {
		font-size: ms(5);
		text-decoration: underline;
		color: shade($red, 30%);
		font-weight: 900;
	}

	&__status-message {
		font-weight: 300;
	}

	&__ctas {
		display: flex;
		margin-top: $gutter--fat;
	}

	&__cta {
		display: flex;
		align-items: center;
		background-color: $white-2;
		color: $black-4;
		padding: 0.5em 1em;
		font-weight: 500;
	}

	&__cta-icon {
		margin-left: 0.5em;

		&--list {
			transform: rotateY(180deg);
			font-size: ms(-1);
		}
	}

	&__image {
	}
}
</style>
