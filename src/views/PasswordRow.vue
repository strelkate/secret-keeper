<template>
	<div class="password-row">
		<div class="password-row__wrapper" @click="onEditPasswordClick(secret)">
			<div class="password-row__content">
				<div class="password-row__name">{{ secret.website }}</div>
				<div class="password-row__login">{{ secret.login }}</div>
			</div>
			<div class="password-row__icon">
				<svg class="password-row__points">
					<use xlink:href="../../public/image/sprite.svg#points"></use>
				</svg>
			</div>
		</div>
		<div class="password-row__line"></div>
		<PasswordModal v-if="isPasswordModalShown" @onCloseModalPassClick="closeModalPass" :secret="secret"/>
	</div>
</template>

<script>
import PasswordModal from "@/views/PasswordModal";
import {passwordMask} from "@/store/const";

export default {
	name: "PasswordRow",
	components: {PasswordModal},
	data() {
		return {
			isPasswordShown: false,
			password_row: passwordMask,
			isPasswordModalShown: false
		}
	},
	props: {
		secret: {
			type: Object,
			required: true
		},
	},
	methods: {
		onEditPasswordClick() {
			this.isPasswordModalShown = true
		},
		closeModalPass() {
			this.isPasswordModalShown = false
		}
	},
}
</script>

<style lang="scss">
.password-row {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;


	&__content {
		display: flex;
		flex-direction: column;
		padding: 16px 0;
	}

	&__wrapper {
		display: flex;
		width: 100%;
		align-items: center;
		justify-content: space-between;
		cursor: pointer;
	}

	&__name {
		font-family: $font-family-sf-pro-medium;
		font-weight: 500;
		font-size: 16px;
		line-height: 20px;
		margin-bottom: 4px;
	}

	&__login {
		font-family: $font-family-sf-pro-regular;
		color: $color-text-tertiary;
		font-weight: 400;
		font-size: 14px;
		line-height: 16px;
	}

	&__icon {
		text-align: center;
		width: 24px;
		height: 100%;
		cursor: pointer;
	}

	&__points {
		width: 16px;
		height: 24px;
		fill: $color-primary;
		transform: rotate(180deg);
	}

	&__line {
		width: 100%;
		height: 1px;
		background-color: $color-icon-line;
	}
}
</style>
