<template>
	<form
		class="o-message-sender"
		@submit.prevent
		autocomplete="off"
	>
		<div class="o-message-sender__main">
			<div
				class="o-message-sender__row"
				v-if="mode === 'expand'"
			>
				<dropdown
					class="o-message-sender__dropdown"
					name="موضوع"
					:list="categories"
					@select="setCategory"
				/>
			</div>
			<div
				class="o-message-sender__row"
				v-if="mode === 'expand'"
			>
				<div
					class="o-message-sender__emoji-toggler"
					:class="{
						'o-message-sender__emoji-toggler--is-active': emoji.selector,
						'o-message-sender__emoji-toggler--is-selected': message.mood
					}"
				>
					<img
						class="o-message-sender__emoji-toggler-image"
						:src="getSlecetedMoodImage"
						@click="emoji.selector = !emoji.selector"
					/>
				</div>
				<input
					type="text"
					class="o-message-sender__textfield"
					name="title"
					placeholder="تیتر"
					v-model="message.title"
					autocomplete="off"
				/>
			</div>
			<div
				class="o-message-sender__row"
				:class="{
					'o-message-sender__row--mini-emoji': mode === 'mini'
				}"
			>
				<emojies
					class="o-message-sender__emojies"
					:class="{
						'o-message-sender__emojies--is-visible': emoji.selector,
						'o-message-sender__emojies--mini-mode': mode === 'mini'
					}"
					:value="message.mood"
					@change="selectMood"
				/>
			</div>
			<div class="o-message-sender__row">
				<div
					class="o-message-sender__emoji-toggler"
					:class="{
						'o-message-sender__emoji-toggler--is-active': emoji.selector,
						'o-message-sender__emoji-toggler--is-selected': message.mood
					}"
					v-if="mode === 'mini'"
				>
					<img
						class="o-message-sender__emoji-toggler-image"
						:src="getSlecetedMoodImage"
						@click="emoji.selector = !emoji.selector"
					/>
				</div>
				<textarea
					placeholder="متن پیام"
					class="o-message-sender__textarea"
					:class="{
						'o-message-sender__textarea--to-center': mode === 'mini'
					}"
					name="text"
					v-model="message.text"
					@input="calcHeight"
					ref="text"
				></textarea>
				<div
					class="o-message-sender__controls"
					:class="{
						'o-message-sender__controls--dont-grow': mode === 'mini'
					}"
					v-if="mode === 'mini'"
				>
					<v-button
						mode="normal"
						@click="send"
						class="o-message-sender__send"
						:class="{
							'o-message-sender__send--is-showing': validation.isPassed('message.text')
						}"
						:is-loading="isBusy"
					>
						ارسال
					</v-button>
				</div>
			</div>
			<div
				class="o-message-sender__row"
				v-if="mode === 'expand'"
			>
				<dropdown
					class="o-message-sender__dropdown"
					name="بررسی کننده"
					:list="assignees"
					@select="setAssignee"
				/>
				<div
					class="o-message-sender__controls"
					v-if="mode === 'expand'"
				>
					<v-button
						mode="normal"
						@click="send"
						class="o-message-sender__send"
						:class="{
							'o-message-sender__send--is-showing': !hasError && isTouched
						}"
						:is-loading="isBusy"
					>
						ایجاد گفت‌وگو
					</v-button>
				</div>
			</div>
		</div>
	</form>
</template>

<script>
import { directive as onClickaway } from 'vue-clickaway';
import getImageFromMood from '../services/getImageFromMood';
import Emojies from './Emojies.vue';
import VButton from './Button.vue';
import Dropdown from './Dropdown.vue';
import IconPerson from './icons/Person.vue';

export default {
	name: 'MessageSender',
	directives: {
		onClickaway
	},
	components: {
		Emojies,
		VButton,
		Dropdown,
		IconPerson
	},
	props: ['mode', 'isBusy'],
	data() {
		return {
			message: {
				title: null,
				text: null,
				mood: null,
				assignee: null,
				category: null
			},
			dropdown: {
				assignee: false,
				category: false
			},
			emoji: {
				selector: false,
				isSelected: false
			}
		};
	},
	computed: {
		assignees() {
			return this.$store.state.assignee.data;
		},
		categories() {
			return this.$store.state.type.data;
		},
		hasError() {
			return !!this.validation.errors.length;
		},
		isTouched() {
			return !!this.validation.touchedRecords.length;
		},
		getSlecetedMoodImage() {
			return getImageFromMood(this.message.mood);
		}
	},
	watch: {
		assignees() {
			this.$bus.$emit('dropdownDataUpdate');
		},
		categories() {
			this.$bus.$emit('dropdownDataUpdate');
		}
	},
	mounted() {
		this.$validate();
	},
	methods: {
		setAssignee(id) {
			this.message.assignee = id;
			this.$nextTick(() => {
				this.dropdown.assignee = false;
			});
		},
		setCategory(id) {
			this.message.category = id;
			this.$nextTick(() => {
				this.dropdown.category = false;
			});
		},
		calcHeight() {
			this.$nextTick(() => {
				this.$refs.text.style.height = '0px';
				this.$refs.text.style.height = `${this.$refs.text.scrollHeight}px`;
			});
		},
		assigneeFromId(id) {
			const assigneeName = this.assignees.find((assignee) => {
				return assignee.id === id;
			});
			return assigneeName.title;
		},
		categoryFromId(id) {
			const categoryName = this.categories.find((category) => {
				return category.id === id;
			});
			return categoryName.title;
		},
		selectMood(value) {
			this.message.mood = value;
			this.emoji.selector = false;
		},
		send() {
			this.$validate();
			if (this.mode === 'mini' && this.validation.isPassed('message.text')) {
				this.$emit('send', {
					text: this.message.text,
					mood: this.message.mood
				});
			} else if (!this.hasError) {
				this.$emit('send', {
					title: this.message.title,
					description: this.message.text,
					typeId: this.message.category,
					assigneeId: this.message.assignee,
					mood: this.message.mood
				});
			}
			if (this.mode === 'mini') {
				this.message.text = null;
			}
			this.$validate();
			this.calcHeight();
		}
	},
	validators: {
		'message.title': {
			validator(value) {
				return this.$validator.value(value).required();
			}
		},
		'message.text': {
			validator(value) {
				return this.$validator.value(value).required();
			}
		},
		'message.category': {
			validator(value) {
				return this.$validator.value(value).required();
			}
		},
		'message.assignee': {
			validator(value) {
				return this.$validator.value(value).required();
			}
		}
	}
};
</script>

<style scoped lang="scss">
@keyframes selectEmoji {
	0% {
		transform: rotateZ(0deg);
	}
	50% {
		transform: rotateZ(-15deg);
	}
	100% {
		transform: rotateZ(15deg);
	}
}

.o-message-sender {
	display: flex;
	flex-direction: column;

	&__main {
		display: flex;
		flex-direction: column;
		background-color: $white;
		border-radius: 10px;
		box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.07);
	}

	&__row {
		width: 100%;
		display: flex;
		border-bottom: 1px solid $white-1;

		&:last-of-type {
			border-bottom: none;
		}

		&--mini-emoji {
			order: 1;
		}
	}

	&__textfield {
		padding: 0.75em 0 $gutter--thin $gutter--thin;
		width: 100%;
		border: none;
		background: white;
		&::-webkit-input-placeholder {
			color: $black-6;
			font-weight: 500;
		}
	}

	&__emoji-toggler {
		display: flex;
		align-items: flex-start;
		justify-content: center;
		flex-shrink: 0;
		padding: $gutter--thin;
		padding-left: 0;
		width: $ant-column;
		margin-left: $ant-gutter;
		transition: filter 0.15s, opacity 0.15s;
		filter: grayscale(1);
		opacity: 0.5;
		cursor: pointer;
		transform-origin: 1.5em center;

		&:hocus {
			filter: grayscale(0);
			opacity: 1;
		}

		&--is-active {
			filter: grayscale(0);
			opacity: 1;
		}

		&--is-selected {
			filter: grayscale(0);
			opacity: 1;
			animation: selectEmoji 0.15s;
		}
	}

	&__emoji-toggler-image {
		size: 2em;
	}

	&__emojies {
		position: relative;
		transition: max-height 0.25s, padding 0.25s, opacity 0.25s;
		max-height: 0;
		padding: 0 $gutter--thin;
		opacity: 0;
		background-color: mix($white-1, white, 50%);
		box-shadow: inset 0 10px 15px -10px rgba(0, 0, 0, 0.08), inset 0 -10px 15px -10px rgba(0, 0, 0, 0.08);
		will-change: max-height, padding;
		pointer-events: none;

		&:before {
			content: '';
			position: absolute;
			bottom: calc(100% - 0.6em);
			right: 1.75em;
			width: 1em;
			height: 1em;
			size: 1em;
			transform: rotateZ(45deg);
			background-color: mix($white-1, white, 50%);
			box-shadow: inset 0 10px 15px -10px rgba(0, 0, 0, 0.08), inset 10px 0 15px -10px rgba(0, 0, 0, 0.08);
			z-index: g-index('cloud');
		}

		&--is-visible {
			max-height: 5em;
			padding: $gutter--thin;
			opacity: 1;
			pointer-events: all;
		}

		&--mini-mode {
			box-shadow: inset 0 10px 15px -10px rgba(0, 0, 0, 0.08);
		}
	}

	&__textarea {
		border: none;
		background: white;
		flex-grow: 1;
		width: auto;
		border: none;
		resize: none;
		color: $black-3;
		height: calc(2.5em + #{$gutter--thin * 2});
		padding: $gutter--thin;
		height: 3.8em;

		&::-webkit-scrollbar {
			width: 0 !important;
		}

		&::-webkit-input-placeholder {
			color: $black-6;
			font-weight: 300;
		}

		&--to-center {
			padding-top: 1.25em;
			padding-right: 0;
		}
	}

	&__extra {
		display: flex;
		margin-top: $gutter--thin;
	}

	&__dropdown {
		margin-left: $ant-gutter;
		margin: $gutter--thin;
	}

	&__controls {
		display: flex;
		justify-content: flex-end;
		flex-grow: 1;
		align-items: center;
		padding: $gutter--thin;

		&--dont-grow {
			flex-grow: 0;
			align-items: flex-start;
		}
	}

	&__send {
		opacity: 0.2;
		transition: opacity 0.15s;
		cursor: not-allowed;

		&--is-showing {
			opacity: 1;
			cursor: pointer;
		}
	}
}
</style>
