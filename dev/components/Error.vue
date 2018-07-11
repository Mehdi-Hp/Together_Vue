<template>
	<section class="l-error">
		<div class="l-error__status">
			<h2 class="l-error__status-number">
				{{ getStatus }}
			</h2>
			<span class="l-error__status-message">
				{{ getMessage }}
			</span>
		</div>
		<div class="l-error__ctas">
			<router-link
				to="/conversations"
				v-if="$store.state.user.employeeId"
			>
				<v-button
					mode="normal"
					class="l-error__cta"
				>
					<icon-list class="l-error__cta-icon | l-error__cta-icon--list"></icon-list>
					لیست گفت‌وگوها
				</v-button>
			</router-link>
			<router-link
				to="/new"
				v-if="!$store.state.user.employeeId"
			>
				<v-button
					mode="normal"
					class="l-error__cta"
				>
					گفت‌وگوی جدید
				</v-button>
			</router-link>
		</div>
	</section>
</template>

<script>
import IconList from './icons/List.vue';
import VButton from './Button.vue';

export default {
	name: 'Error',
	components: {
		VButton,
		IconList
	},
	props: ['status', 'message'],
	data() {
		return {};
	},
	computed: {
		getStatus() {
			return this.status || 404;
		},
		getMessage() {
			if (this.getStatus === 404) {
				return 'صفحه‌ی درخواستی شما پیدا نشد.';
			}
			return this.message || 'در حین اجرای درخواست شما مشکلی پیش آمده.';
		}
	}
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
		color: shade($red, 30%);
		font-weight: 100;
		padding: 1rem;
		background-color: tint($red, 90%);
		margin-bottom: 1rem;
		border-radius: 10px;
		display: flex;
		align-items: center;
	}

	&__status-message {
		font-weight: 500;
		color: $black-6;
	}

	&__ctas {
		display: flex;
		margin-top: $gutter--fat;
	}

	&__cta {
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
