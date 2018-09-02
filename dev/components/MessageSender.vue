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
					:class="{
						'o-message-sender__dropdown--small': $eq.small
					}"
					name="موضوع"
					:list="categories"
					@select="setCategory"
					:selected-value="getCategoryValue"
				/>
			</div>
			<div
				class="o-message-sender__row | o-message-sender__row--no-wrap"
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
			<div
				class="o-message-sender__row"
				:class="{
					'o-message-sender__row--mini-mode': $eq.small && mode === 'mini'
				}"
			>
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
						'o-message-sender__controls--dont-grow': mode === 'mini',
						'o-message-sender__controls--seperate': $eq.small && mode !== 'mini'
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
					:class="{
						'o-message-sender__dropdown--small': $eq.small
					}"
					name="بررسی کننده"
					:list="assignees"
					@select="setAssignee"
					:selected-value="getAssigneeValue"
				/>
				<div
					class="o-message-sender__controls"
					:class="{
						'o-message-sender__controls--seperate': $eq.small
					}"
					v-if="mode === 'expand'"
				>
					<vue-recaptcha
						ref="invisibleRecaptcha"
						@verify="onCaptchaVerify"
						@expired="onCaptchaExpired"
						size="invisible"
						:sitekey="sitekey"
					>
					</vue-recaptcha>
					<v-button
						mode="normal"
						@click="checkIfIsHumanAndSend"
						class="o-message-sender__send"
						:class="{
							'o-message-sender__send--is-showing': !hasError && isTouched
						}"
						:is-loading="isLoading"
					>
						ایجاد گفت‌وگو
					</v-button>
				</div>
			</div>
		</div>
	</form>
</template>

<script>
import VueRecaptcha from 'vue-recaptcha';
import { directive as onClickaway } from 'vue-clickaway';
import getImageFromMood from '../services/getImageFromMood';
import Emojies from './Emojies.vue';
import VButton from './Button.vue';
import Dropdown from './Dropdown.vue';
import IconPerson from './icons/Person.vue';

export default {
	name: 'MessageSender',
	eq: {
		breakpoints: {
			small: { maxWidth: 420 }
		}
	},
	directives: {
		onClickaway
	},
	components: {
		VueRecaptcha,
		Emojies,
		VButton,
		Dropdown,
		IconPerson
	},
	props: ['mode', 'isBusy', 'error', 'isDone'],
	data() {
		return {
			sitekey: '6LekjGMUAAAAAM9_Uk4Un_ujwvs9TNUJyNJTshwV',
			message: {
				title: null,
				text: null,
				mood: null,
				assignee: null,
				category: null,
				captcha: null
			},
			dropdown: {
				assignee: false,
				category: false
			},
			emoji: {
				selector: false,
				isSelected: false
			},
			isLoading: this.isBusy
		};
	},
	computed: {
		bypassRecaptcha() {
			return this.mode === 'mini';
		},
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
		},
		getCategoryValue() {
			if (this.message.category) {
				return this.categoryFromId(this.message.category);
			}
		},
		getAssigneeValue() {
			if (this.message.assignee) {
				return this.assigneeFromId(this.message.assignee);
			}
		}
	},
	watch: {
		isBusy() {
			this.isLoading = this.isBusy;
		},
		assignees() {
			this.$bus.$emit('dropdownDataUpdate');
		},
		categories() {
			this.$bus.$emit('dropdownDataUpdate');
		},
		isDone(oldState, newState) {
			if (newState) {
				this.$ls.remove('message_sender_data');
			}
		},
		error(oldValue, newValue) {
			this.refillForm();
		}
	},
	mounted() {
		this.$validate();
		if (this.$ls.get('message_sender_data')) {
			this.refillForm();
		}
	},
	methods: {
		refillForm() {
			const { title, description, typeId, assigneeId, mood } = JSON.parse(this.$ls.get('message_sender_data'));
			this.message.title = title;
			this.message.text = description;
			this.selectMood(mood);
			this.setCategory(typeId);
			this.setAssignee(assigneeId);
			this.calcHeight();
		},
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
			if (id) {
				const assigneeName = this.assignees.find((assignee) => {
					return assignee.id === id;
				});
				return assigneeName.title;
			}
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
		onCaptchaExpired() {
			console.warn('reCaptcha got expired!');
			if (!this.bypassRecaptcha) {
				this.$refs.invisibleRecaptcha.reset();
			}
		},
		checkIfIsHumanAndSend() {
			if (!this.bypassRecaptcha) {
				this.isLoading = true;
				this.$refs.invisibleRecaptcha.execute();
			} else {
				this.send();
			}
		},
		onCaptchaVerify(response) {
			console.log('reCaptcha verified', response);
			this.message.captcha = response;
			this.send();
		},
		send() {
			if (!this.bypassRecaptcha) {
				this.$refs.invisibleRecaptcha.reset();
			}
			this.isLoading = true;
			const messageSenderData = {
				title: this.message.title,
				description: this.message.text,
				typeId: this.message.category,
				assigneeId: this.message.assignee,
				mood: this.message.mood,
				captcha: this.message.captcha
			};
			if (this.mode === 'mini' && this.validation.isPassed('message.text')) {
				this.$emit('send', {
					text: this.message.text,
					mood: this.message.mood
				});
			} else if (!this.hasError) {
				this.$ls.set('message_sender_data', JSON.stringify(messageSenderData));
				this.$emit('send', messageSenderData);
			}
			if (this.mode === 'mini') {
				this.message.text = null;
			}
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
		flex-wrap: wrap;

		&:last-of-type {
			border-bottom: none;
		}

		&--mini-emoji {
			order: 1;
		}

		&--no-wrap {
			flex-wrap: nowrap;
		}

		&--mini-mode {
			justify-content: flex-end;
		}
	}

	&__textfield {
		padding: 0.75em 0 $gutter--thin $gutter--thin;
		flex-grow: 1;
		border: none;
		background: white;
		width: inherit;

		&::-webkit-input-placeholder {
			color: $black-6;
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
		&.xs {
			size: 1.7em;
		}
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

		&--small {
			width: 100%;
		}
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

		&--seperate {
			border-top: 1px solid $white-1;
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
