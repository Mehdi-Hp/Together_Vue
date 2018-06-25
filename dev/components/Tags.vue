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
				v-for="tag in tags"
				:key="tag.id"
				:data="tag"
			>
			</tag>
			<dropdown
				class="o-tags__new"
				:class="{
					'o-tags__new--is-disabled': allSelected
				}"
				v-if="$store.state.user.role === 'agent'"
				:state="dropdownState"
				:disabled="allSelected"
				@toggleState="(newState) => { dropdownState = newState }"
			>
				<template slot="icon">
					<icon-plus
						class="o-tags__new-icon"
						:class="{
							'o-tags__new-icon--is-disabled': allSelected
						}"
					/>
				</template>
				<template slot="content">
					<ul class="o-tags__new-items">
						<li
							class="o-tags__new-item"
							:class="{
								'o-tags__new-item--is-visible': !tag.isSelected
							}"
							v-for="tag in tags"
							:key="tag.id"
							@click="addTag(tag.id)"
						>
							{{ tag.title }}
						</li>
					</ul>
				</template>
			</dropdown>
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
		return {
			dropdownState: false
		};
	},
	computed: {
		allSelected() {
			return this.tags.every((tag) => {
				return tag.isSelected;
			});
		}
	},
	methods: {
		addTag(tagId) {
			this.$nextTick(() => {
				this.dropdownState = false;
			});
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
		width: 1.8rem;
		height: 1.8rem;
		padding: 0.9em;

		&:hocus {
			background-color: shade($main-color, 10%);
		}

		&--is-disabled {
			background-color: $white-3;
			pointer-events: none;

			&:hocus {
				background-color: $white-3;
			}
		}
	}

	&__new-icon {
		size: 100%;
		stroke-width: 0.5em;
		color: white;

		&--is-disabled {
			color: $white-5;
		}
	}

	&__new-items {
		display: flex;
		flex-direction: column;
		font-size: ms(-1);
		color: $black-3;
		background-color: white;
		padding: 1rem 0;
	}

	&__new-item {
		display: flex;
		align-items: center;
		white-space: nowrap;
		max-height: 0;
		max-width: 0;
		opacity: 0;
		margin-bottom: 0;
		padding: 0;
		transition-duration: 0.1s;
		transition-property: max-width, max-height, padding, margin;

		&:hocus {
			background-color: $white-1;
			will-change: max-width, max-height, padding, margin;
		}

		&:active {
			background-color: $white-3;
		}

		&:last-of-type {
			margin-bottom: 0;
		}

		&--is-visible {
			padding: 0.5rem 1rem 0.5rem 1.5rem;
			max-height: 100vh;
			max-width: 100vw;
			opacity: 1;
		}
	}
}
</style>
