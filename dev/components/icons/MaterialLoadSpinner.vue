<template>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
		width="1em"
		height="1em"
		fill="currentColor"
		stroke="currentColor"
		class="a-load-spinner"
		:class="{
			'a-load-spinner--is-animating': animate
		}"
	>
		<circle
			class="a-load-spinner__path"
			:class="{
				'a-load-spinner__path--is-animating': animate
			}"
			fill="currentColor"
			cx="0.5em"
			cy="0.5em"
			r="0.45em"
		/>
	</svg>
</template>

<script>
export default {
	name: 'IconMaterialLoadSpinner',
	props: ['animate']
};
</script>

<style scoped lang="scss">
.a-load-spinner {
	display: inline-block;
	font-size: 1rem;
	width: 1em;
	height: 1em;

	&--is-animating {
		animation: 2s rotate infinite linear;
	}

	&__path {
		fill: transparent;
		stroke-width: 0.12em;
		stroke-linecap: round;
		stroke-dasharray: 2.3525em 0.4705em;

		&--is-animating {
			animation: 1.5s strokeDashArray infinite linear;
		}
	}
}

@keyframes rotate {
	from {
		transform: rotate(0deg);
	}

	to {
		transform: rotate(360deg);
	}
}

@keyframes strokeDashArray {
	from {
		stroke-dasharray: 2.3525em 0.4705em;
		stroke-dashoffset: 0;
	}

	10% {
		stroke-dasharray: 2.3525em 0.4705em;
		stroke-dashoffset: 0;
	}

	50% {
		stroke-dasharray: 0.001em 2.825em;
		stroke-dashoffset: -2.826em;
	}

	60% {
		stroke-dasharray: 0.001em 2.825em;
	}

	to {
		stroke-dasharray: 2.3525em 0.4705em;
		stroke-dashoffset: -2.826em;
	}
}

@keyframes colorBounce {
	1% {
		stroke: #2a8fbd;
	}

	24% {
		stroke: #2a8fbd;
	}

	26% {
		stroke: #8ebd2a;
	}

	49% {
		stroke: #8ebd2a;
	}

	51% {
		stroke: #bf2a2a;
	}

	74% {
		stroke: #bf2a2a;
	}

	76% {
		stroke: #ecb43e;
	}

	99% {
		stroke: #ecb43e;
	}
}
</style>
