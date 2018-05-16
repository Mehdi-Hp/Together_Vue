<template>
	<div class="o-tags">
		<span class="o-tags__title">
			برچسب‌ها:
		</span>
		<ul class="o-tags__items">
			<li
				class="o-tags__item"
				v-for="tag in tags"
				:key="tag.id"
			>
				<span class="o-tags__text">
					{{ tag.title }}
				</span>
				<button
					class="o-tags__remove"
				></button>
			</li>
			<button
				class="o-tags__new"
			></button>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'Tags',
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
		display: flex;
		justify-content: space-between;
		margin-left: 1em;
		margin-bottom: 1em;
		background-color: $white-3;
		border-radius: 10em;
		color: $black-4;
		padding: 0.45em 1.5em;
		padding-left: 0.25em;
		font-size: ms(-1);

		&:last-of-type {
			margin-bottom: 0;
		}
	}

	&__text {
		flex-grow: 1;
		margin-left: 2em;
		position: relative;
		top: 0.2em;
	}

	&__remove {
		width: 1.5em;
		height: 1.5em;
		border-radius: 50%;
		padding: 0.25em;
		background-color: transparent;
	}

	&__new {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: $main-color;
		color: white;
		border-radius: 50%;
		width: 2em;
		height: 2em;
		padding: 0;
	}
}
</style>
