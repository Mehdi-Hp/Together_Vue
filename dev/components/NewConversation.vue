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
						<textfield></textfield>
					</div>
					<div class="o-form__column | o-form__column--small">

					</div>
				</div>
				<div class="o-form__row">
					<div class="o-form__column">
						<textfield textarea-mode="true"></textfield>
					</div>
				</div>
				<div class="o-form__row">
					<div class="o-form__column | o-form__column--medium">
						<div class="o-form__select | a-select">
							<select class="a-select__itself">
								<option value="1">hfukl</option>
								<option value="1">yfjx t</option>
								<option value="1">x tfj </option>
								<option value="1">zdrh  drh</option>
								<option value="1">zrhzrdh</option>
								<option value="1">zdrh</option>
							</select>
						</div>
					</div>
				</div>
				<div class="o-form__row">
					<div class="o-form__column | o-form__column--medium">
						<div class="o-form__select | a-select">
							<select class="a-select__itself">
								<option value="1">hfukl</option>
								<option value="1">yfjx t</option>
								<option value="1">x tfj </option>
								<option value="1">zdrh  drh</option>
								<option value="1">zrhzrdh</option>
								<option value="1">zdrh</option>
							</select>
						</div>
					</div>
				</div>
				<div class="o-form__submit-holder">
					<button class="o-form__submit-button | a-button">Send Anonymously</button>
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
		return {};
	},
	created() {
		this.$store.dispatch('getAllCategories');
	}
};
</script>
