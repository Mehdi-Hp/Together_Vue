<template>
	<div
		class="o-tags"
		v-if="tags"
	>
		<span class="o-tags__title">
			برچسب‌ها:
		</span>
		<ul class="o-tags__items">
			<tag
				class="o-tags__item"
				:class="{
					'o-tags__item--is-visible': tag.isSelected,
				}"
				v-for="tag in selectedTags"
				:key="tag.id"
				:data="tag"
			>
			</tag>
			<dropdown
				class="o-tags__new"
				:class="{
					'o-tags__new--disabled': allSelected
				}"
				:name="null"
				icon="icon-plus"
				mode="icon-only"
				:list="unSelectedTags"
				@select="addTag"
			/>
		</ul>
	</div>
</template>

<script>
import Tag from './Tag.vue';
import Dropdown from './Dropdown.vue';
import IconPlus from './icons/Plus.vue';

export default {
	name: 'Tags',
	components: {
		Tag,
		Dropdown,
		IconPlus
	},
	props: ['tags'],
	data() {
		return {};
	},
	computed: {
		selectedTags() {
			return this.tags.filter((tag) => {
				return tag.isSelected;
			});
		},
		unSelectedTags() {
			return this.tags.filter((tag) => {
				return !tag.isSelected;
			});
		},
		allSelected() {
			return this.tags.every((tag) => {
				return tag.isSelected;
			});
		}
	},
	methods: {
		addTag(tagId) {
			this.$bus.$emit('addTag', tagId);
		}
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
		margin: 0;

		&:last-of-type {
			margin-bottom: 0;
		}

		&--is-visible {
			margin-left: 1em;
			margin-bottom: 1em;
		}
	}

	&__new {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: $main-color;
		border-radius: 50%;
		size: 1.7em;
		color: $white;

		&:hocus {
			background-color: shade($main-color, 10%);
		}

		&--disabled {
			pointer-events: none;
			opacity: 0.2;

			&:hocus {
				background-color: $white-3;
			}
		}

		& .m-dropdown__icon {
			stroke-width: 13px;
		}
	}
}
</style>
