<template>
	<article class="o-messages">
		<form class="o-messages__form">
			<textfield class="o-messages__textfield"></textfield>
			<button class="o-messages__send | a-button">Send</button>
		</form>
		<section class="o-messages__events">
			<event class="o-messages__event">
				klsrgoer8yguo egoesrghse y8horsi5
			</event>
			<event class="o-messages__event">
				klsrgoerdg a ghasth tr h8yguo egoesrghse y8horsi5
			</event>
			<event class="o-messages__event">
				klsrgoer8yguo egoesrghzd gbadthbasthbs a sthsrthse y8horsi5
			</event>
			<event class="o-messages__event">
				klsrgoer8yguo egoesrghse y8horsi5klsrgoer8yguo egoesrghse y8horsi5klsrgoer8yguo egoesrghse y8horsi5klsrgoer8yguo egoesrghse y8horsi5klsrgoer8yguo egoesrghse y8horsi5klsrgoer8yguo egoesrghse y8horsi5
			</event>
		</section>
	</article>
</template>

<script>
import Textfield from './Textfield.vue';
import Event from './Event.vue';

export default {
	name: 'Messages',
	components: {
		Textfield,
		Event
	},
	props: [],
	data() {
		return {};
	}
};
</script>
