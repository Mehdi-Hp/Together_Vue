<template>
	<section class="l-conversations">
		<keynote>
			<template slot="title">
				لیست گفت‌وگو‌ها
			</template>
			<template slot="desc">

			</template>
		</keynote>

		<article class="l-conversations__content">
			<header class="l-conversations__header">
				<span class="l-conversations__text | l-conversations__text--badge | l-conversations__text--badge--is-header"></span>
				<span class="l-conversations__text | l-conversations__text--title"></span>
				<span class="l-conversations__text | l-conversations__text--type"></span>
				<span
					class="l-conversations__text | l-conversations__text--time"
					@click="() => { sortedBy = 'creationTime'; sortOrder = oppositeOrder; }"
				>
					<!-- <icon-arrow
						class="l-conversations__text-arrow"
						:class="{
							'l-conversations__text-arrow--asc': sortOrder === 'asc',
							'l-conversations__text-arrow--desc': sortOrder === 'desc'
						}"
						v-if="sortedBy === 'creationTime'"
					/> -->
					تاریخ ایجاد
				</span>
				<span class="l-conversations__text | l-conversations__text--time">
					<!-- <icon-arrow
						class="l-conversations__text-arrow"
						:class="{
							'l-conversations__text-arrow--asc': sortOrder === 'asc',
							'l-conversations__text-arrow--desc': sortOrder === 'desc'
						}"
						v-if="sortedBy === 'lastActivity'"
					/> -->
					آخرین فعالیت
				</span>
			</header>

			<router-link
				:to="`/conversations/${conversation.id}`"
				class="l-conversations__row"
				v-for="conversation in conversations"
				:key="conversation.id"
			>
				<span
					class="l-conversations__text | l-conversations__text--badge"
					v-if="conversation.newMessagesCount"
				>
					{{ getMessageCount(conversation.newMessagesCount) }}
				</span>
				<span class="l-conversations__text | l-conversations__text--title">
					{{ conversation.title }}
				</span>
				<span class="l-conversations__text | l-conversations__text--type">
					{{ conversation.type }}
				</span>
				<span class="l-conversations__text | l-conversations__text--time">
					{{ persianDate(conversation.time) }}
				</span>
				<span class="l-conversations__text | l-conversations__text--time">
					{{ persianDate(conversation.time) }}
				</span>
			</router-link>
		</article>
	</section>
</template>

<script>
import toPersianDigit from '../services/toPersianDigits';
import IconArrow from './icons/Arrow.vue';

const PersianDate = require('persian-date');

export default {
	name: 'Conversations',
	components: {
		IconArrow
	},
	props: [],
	data() {
		return {
			sortOrder: 'asc',
			sortedBy: 'creationTime'
		};
	},
	computed: {
		conversations() {
			return this.$store.state.conversation.list;
		}
	},
	watch: {
		sortedBy() {
			this.$store.commit('sortConversationsList', {
				field: this.sortedBy,
				order: this.sortOrder
			});
			this.sortOrder = this.oppositeOrder(this.sortOrder);
		}
	},
	mounted() {
		this.$store.dispatch('getConversations');
	},
	methods: {
		persianDate(date) {
			const today = new PersianDate();
			const eventDate = new PersianDate(new Date(date).getTime());
			if (eventDate.isSameDay(today)) {
				return new PersianDate(new Date(date).getTime()).format('HH:mm');
			}
			return new PersianDate(new Date(date).getTime()).format('D/MMMM/YYYY - HH:mm');
		},
		persianDigit(digit) {
			return toPersianDigit(digit);
		},
		getMessageCount(messageCount) {
			if (messageCount <= 99) {
				return this.persianDigit(messageCount);
			}
			return '∞';
		},
		oppositeOrder(currentOrder) {
			return currentOrder === 'asc' ? 'desc' : 'asc';
		}
	}
};
</script>

<style scoped lang="scss">
.l-conversations {
	width: $general-width;
	padding: $gutter--fat 0;

	&__content {
		display: flex;
		flex-direction: column;
	}

	&__header {
		display: flex;
		align-items: flex-end;
		width: 100%;
		margin-bottom: $gutter--thin;
		border-bottom: 1px solid $white-2;
		padding: $gutter--thin;
	}

	&__row {
		display: flex;
		align-items: center;
		width: 100%;
		padding: $gutter--thin;
		transition: background-color 0.15s, box-shadow 0.15s, transform 0.15s;

		&:nth-child(even) {
			background-color: $white-1;
		}

		&:hocus {
			background-color: $white-3;
			box-shadow: 0 10px 20px 0 transparentize($green, 0.95);
			z-index: 1;
		}

		&:active {
			transform: scale(0.98);
			background-color: $white-4;
		}
	}

	&__text {
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
		}

		&--time {
			font-size: ms(-1);
			color: $black-6;
			flex-grow: 1;
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
