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
					:state="dropdown.category"
					:show-hide="false"
					@toggleState="(newState) => { dropdown.category = newState }"
				>
					<template slot="text">
						<div class="o-message-sender__dropdown-texts">
							<span
								class="o-message-sender__dropdown-text"
								v-if="!message.category"
							>
								موضوع
							</span>
							<span
								class="o-message-sender__dropdown-selected"
								v-if="message.category"
							>
								{{ categoryFromId(message.category) }}
							</span>
						</div>
					</template>
					<template slot="content">
						<ul class="o-message-sender__dropdown-items">
							<li
								class="o-message-sender__dropdown-item"
								v-for="category in categories"
								:key="category.id"
								@click="setCategory(category.id)"
							>
								{{ category.title }}
							</li>
						</ul>
					</template>
				</dropdown>
			</div>
			<div
				class="o-message-sender__row"
				v-if="mode === 'expand'"
			>
				<div class="o-message-sender__emoji-toggler">
					<div class="o-message-sender__emoji-toggler-icon"></div>
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
			<div class="o-message-sender__row">
				<div
					class="o-message-sender__emoji-toggler"
					v-if="mode === 'mini'"
				>
					<div class="o-message-sender__emoji-toggler-icon"></div>
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
					:state="dropdown.assignee"
					:show-hide="false"
					@toggleState="(newState) => { dropdown.assignee = newState }"
				>
					<template slot="icon">
						<icon-person
							class="o-message-sender__dropdown-icon"
							:class="{
								'o-message-sender__dropdown-icon--is-selected': message.assignee
							}"
						/>
					</template>
					<template slot="text">
						<div class="o-message-sender__dropdown-texts">
							<span
								class="o-message-sender__dropdown-text"
								v-if="!message.assignee"
							>
								بررسی کننده
							</span>
							<span
								class="o-message-sender__dropdown-selected"
								v-if="message.assignee"
							>
								{{ assigneeFromId(message.assignee) }}
							</span>
						</div>
					</template>
					<template slot="content">
						<ul class="o-message-sender__dropdown-items">
							<li
								class="o-message-sender__dropdown-item"
								v-for="assignee in assignees"
								:key="assignee.id"
								@click="setAssignee(assignee.id)"
							>
								{{ assignee.title }}
							</li>
						</ul>
					</template>
				</dropdown>
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
					>
						ایجاد گفت‌وگو
					</v-button>
				</div>
			</div>
		</div>
	</form>
</template>

<script>
import VButton from './Button.vue';
import Dropdown from './Dropdown.vue';
import IconPerson from './icons/Person.vue';

export default {
	name: 'MessageSender',
	components: {
		VButton,
		Dropdown,
		IconPerson
	},
	props: ['mode'],
	data() {
		return {
			message: {
				title: null,
				text: null,
				mood: 1,
				assignee: null,
				category: null
			},
			dropdown: {
				assignee: false,
				category: false
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
		send() {
			this.$validate();
			if (this.mode === 'mini' && this.validation.isPassed('message.text')) {
				this.$emit('send', {
					text: this.message.text
				});
			} else if (!this.hasError) {
				this.$emit('send', {
					title: this.message.title,
					description: this.message.text,
					typeId: this.message.category,
					assigneeId: this.message.assignee
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
	}

	&__textfield {
		padding: 1.25em 0 $gutter--thin $gutter--thin;
		width: 100%;
		border: none;
		background: white;
		&::-webkit-input-placeholder {
			color: $black-6;
			font-weight: 500;
		}
	}

	&__emoji-toggler {
		padding: $gutter--thin;
		padding-left: 0;
		width: $ant-column;
		margin-left: $ant-gutter;
	}

	&__emoji-toggler-icon {
		background: $white-1;
		border-radius: 50%;
		size: 40px;
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
		}
	}

	&__extra {
		display: flex;
		margin-top: $gutter--thin;
	}

	&__dropdown {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: $white-1;
		border-radius: 10em;
		padding: 0.5em 1em;
		height: 2em;
		margin-left: $ant-gutter;
		margin: $gutter--thin;
	}

	&__dropdown-texts {
		display: flex;
		flex-direction: column;
		font-size: ms(-1);
		position: relative;
	}
	&__dropdown-text {
	}

	&__dropdown-selected {
		color: $green;
		font-weight: 500;
	}

	&__dropdown-icon {
		padding: 0;
		margin-left: 0.5em;

		&--is-selected {
			color: $green;
		}
	}

	&__dropdown-items {
		display: flex;
		flex-direction: column;
		font-size: ms(-1);
		color: $black-3;
		background-color: $white-1;
		border-top: 1px solid $white-2;
		padding: 1em 0;
		box-sizing: border-box;
		position: absolute;
		top: 3em;
		width: 10em;
		border-radius: 0 0 5px 5px;
		z-index: g-index('mountain');
	}

	&__dropdown-item {
		display: flex;
		align-items: center;
		white-space: nowrap;
		padding: 0.75em 1.5em 0.75em 1.5em;
		cursor: pointer;

		&:hocus {
			background-color: $white-2;
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
