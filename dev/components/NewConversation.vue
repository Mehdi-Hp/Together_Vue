<template>
	<section class="l-new-conversation">
		<keynote class="l-new-conversation__keynote">
			<template slot="title">
				ljhsrgi
			</template>
			<template slot="desc">
				kjr g;oisdrjeg ;osirgje; osrgj;so rkjr g;oisdrjeg ;osg ;osirgje; osrgj;so rkjr g;oisdrjeg ;osirgje; osrgj;so rkjr
				kjr g;oisdrjeg ;osirgje; osrgj;so rkjr g;oisdrjeg ;osg ;osirgje; osrgj;so rkjr g;oisdrjeg ;osirgje; osrgj;so rkjr
				kjr g;oisdrjeg ;osirgje; osrgj;so rkjr g;oisdrjeg ;osg ;osirgje; osrgj;so rkjr g;oisdrjeg ;osirgje; osrgj;so rkjr
				kjr g;oisdrjeg ;osirgje; osrgj;so rkjr g;oisdrjeg ;osg ;osirgje; osrgj;so rkjr g;oisdrjeg ;osirgje; osrgj;so rkjr
				kjr g;oisdrjeg ;osirgje; osrgj;so rkjr g;oisdrjeg ;osg ;osirgje; osrgj;so rkjr g;oisdrjeg ;osirgje; osrgj;so rkjr
			</template>
		</keynote>

		<div class="l-new-conversation__content">
			<form class="l-new-conversation__form | o-form">
				<div class="o-form__row">
					<div class="o-form__column">
						<textfield
							text="Title"
							type="text"
							name="title"
							class="o-form__textfield"
							@inputChange="(value) => title = value"
							@inputKeyup="$validate('title')"
							:error="validation.firstError('title')"
						/>
					</div>
					<div class="o-form__column | o-form__column--small">

					</div>
				</div>
				<div class="o-form__row">
					<div class="o-form__column">
						<textfield
							text="Description"
							type="text"
							name="description"
							class="o-form__textfield"
							@inputChange="(value) => description = value"
							@inputKeyup="$validate('description')"
							:error="validation.firstError('description')"
						/>
					</div>
				</div>
				<div class="o-form__row">
					<div class="o-form__column | o-form__column--medium">
						<div class="o-form__select | a-select">
							<select
								class="a-select__itself"
								v-model="typeId"
							>
								<option
									:value="type.id"
									v-for="type in types"
									:key="type.id"
								>
									{{ type.title }}
								</option>
							</select>
						</div>
					</div>
				</div>
				<div class="o-form__row">
					<div class="o-form__column | o-form__column--medium">
						<div class="o-form__select | a-select">
							<select
								class="a-select__itself"
								v-model="assigneeId"
							>
								<option
									:value="assignee.id"
									v-for="assignee in assignees"
									:key="assignee.id"
								>
									{{ assignee.title }}
								</option>
							</select>
						</div>
					</div>
				</div>
				<div class="o-form__submit-holder">
					<button
						class="o-form__submit-button | a-button"
						@click="crateConversation"
					>
						Send Anonymously
					</button>
				</div>
			</form>
		</div>
	</section>
</template>

<script>
import Keynote from './Keynote.vue';
import Textfield from './Textfield.vue';

export default {
	name: 'NewAdvice',
	components: {
		Keynote,
		Textfield
	},
	data() {
		return {
			title: null,
			description: null,
			typeId: null,
			assigneeId: null
		};
	},
	computed: {
		types() {
			return this.$store.state.type.data;
		},
		assignees() {
			return this.$store.state.assignee.data;
		}
	},
	created() {
		this.$store.dispatch('getAllTypes');
		this.$store.dispatch('getAllAssignees');
	},
	methods: {
		crateConversation() {}
	},
	validators: {
		title: {
			cache: true,
			debounce: 200,
			validator(value) {
				return this.$validator.value(value).required();
			}
		}
	}
};
</script>
