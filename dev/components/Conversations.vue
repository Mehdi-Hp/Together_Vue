<template>
	<section class="l-conversations">
		<keynote class="l-conversations__keynote">
			<template slot="title">
				لیست گفت‌وگو‌ها
			</template>
			<template slot="desc">

			</template>
		</keynote>

		<article class="l-conversations__content">
			<header class="l-conversations__header">
				<span class="l-conversations__title | l-conversations__title--badge | l-conversations__title--badge--is-header"></span>
				<span class="l-conversations__title | l-conversations__title--title"></span>
				<span class="l-conversations__title | l-conversations__title--type"></span>
				<span
					class="l-conversations__title | l-conversations__title--time"
				>
					تاریخ ایجاد
				</span>
				<span class="l-conversations__title | l-conversations__title--time">
					آخرین فعالیت
				</span>
			</header>

			<conversation-summary
				class="l-converations__item"
				v-for="conversation in conversations"
				:key="conversation.id"
				:id="conversation.id"
				:new-messages-count="conversation.newMessagesCount"
				:first-message="conversation.firstMessage"
				:title="conversation.title"
				:type="conversation.type"
				:time="persianDate(conversation.time)"
			/>
		</article>
	</section>
</template>

<script>
import { mapGetters } from 'vuex';
import ConversationSummary from './ConversationSummary.vue';
import IconArrow from './icons/Arrow.vue';

const PersianDate = require('persian-date');

export default {
	name: 'Conversations',
	components: {
		ConversationSummary,
		IconArrow
	},
	props: [],
	data() {
		return {
			hoverOn: null
		};
	},
	computed: {
		...mapGetters({
			isEmployee: 'user/isEmployee'
		}),
		conversations() {
			return this.$store.state.conversation.list;
		}
	},
	created() {
		if (!this.isEmployee) {
			this.$router.push('/');
		}
	},
	mounted() {
		this.$store.dispatch('conversation/getAll');
	},
	methods: {
		hoverHandle(conversationId) {
			this.hoverOn = conversationId;
		},
		persianDate(date) {
			const today = new PersianDate();
			const eventDate = new PersianDate(new Date(date).getTime());
			if (eventDate.isSameDay(today)) {
				return new PersianDate(new Date(date).getTime()).format('HH:mm');
			}
			return new PersianDate(new Date(date).getTime()).format('D/MMMM/YYYY - HH:mm');
		}
	}
};
</script>

<style scoped lang="scss">
.l-conversations {
	max-width: $general-width;
	padding-left: 0;
	padding-right: 0;

	@include breakpoint(lg) {
		padding-left: $gutter;
		padding-right: $gutter;
		line-height: 1.5;
	}
	@include breakpoint(md) {
		max-width: 100%;
		padding-left: $gutter--fat;
		padding-right: $gutter--fat;
	}

	&__keynote {
		margin-top: $gutter;
		margin-bottom: 0;
	}

	&__content {
		display: flex;
		flex-direction: column;
	}

	&__item {
	}

	&__header {
		display: flex;
		align-items: flex-end;
		width: 100%;
		margin-bottom: $gutter--thin;
		border-bottom: 1px solid $white-2;
		padding: $gutter--thin;
		@include breakpoint(md) {
			display: none;
		}
	}

	&__title {
		display: flex;
		align-items: center;
		flex-grow: 3;
		margin-left: $ant-gutter;
		width: 100px;
		cursor: pointer;

		&:last-of-type {
			margin-left: 0;
		}

		&--badge {
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 50%;
			background-color: $red;
			color: white;
			font-weight: 500;
			flex-grow: 0;
			size: 1.5em;
			font-size: ms(-1);
			padding-top: 0.2em;

			&--is-header {
				visibility: hidden;
			}
		}

		&--title {
			color: $green;
			flex-grow: 3;
		}

		&--type {
			font-size: ms(-1);
			flex-grow: 0;
			max-width: 80px;
			justify-content: center;
		}

		&--time {
			font-size: ms(-1);
			color: $black-6;
			flex-grow: 1;
			justify-content: center;
		}
	}

	&__text-arrow {
		size: 0.7em;
		margin-left: 0.5em;

		&--asc {
			transform: rotateZ(180deg);
		}

		&--desc {
			transform: rotateZ(0deg);
		}
	}
}
</style>
