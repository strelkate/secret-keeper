<template>
	<div class="toast">
		<div class="toast__message">{{ getToastMessage }}</div>
	</div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
	name: "Toast",
	computed: {
		...mapGetters(['getToastMessage'])
	},
}
</script>

<style lang="scss">
.toast {
	position: fixed;
	top: 0;
	left: 50%;
	transform: translateX(-50%);
	background: rgba(6, 41, 35, 0.9);
	border-radius: 8px;
	width: 343px;
	padding: 16px;
	z-index: 10000;

	&__message {
		font-family: $font-family-sf-pro-medium;
		font-size: 14px;
		line-height: 20px;
		color: $color-background;
	}
}
</style>
