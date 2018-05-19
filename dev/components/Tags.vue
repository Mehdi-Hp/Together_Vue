<template>
	<div class="o-tags">
		<span class="o-tags__title">
			برچسب‌ها:
		</span>
		<ul class="o-tags__items">
			<tag
				class="o-tags__item"
				v-for="tag in tags"
				:key="tag.id"
				:data="tag"
			>
			</tag>
			<button
				class="o-tags__new"
			>
				<icon-plus class="o-tags__new-icon" />
			</button>
		</ul>
	</div>
</template>

<script>
import Tag from './Tag.vue';
import IconPlus from './icons/Plus.vue';

export default {
	name: 'Tags',
	components: {
		Tag,
		IconPlus
	},
	props: ['tags'],
	data() {
		return {};
	}
};
</script>

<style scoped lang="scss">
.o-tags {
	display: flex;
	flex-direction: column;

	&__title {
		margin-bottom: 1em;
		color: $black-6;
	}

	&__items {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
	}

	&__item {
		margin-left: 1em;
		margin-bottom: 1em;

		&:last-of-type {
			margin-bottom: 0;
		}
	}

	&__new {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: $main-color;
		color: white;
		border-radius: 50%;
		width: 1.8rem;
		height: 1.8rem;
		padding: 0.6em;

		&:hocus {
			background-color: shade($main-color, 10%);
		}

		&:active {
			transform: scale(0.98);
		}
	}

	&__new-icon {
		size: 100%;
		stroke-width: 0.5em;
		color: white;
	}
}
</style>
