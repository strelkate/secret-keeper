<template>
	<div class="password-modal">
		<div class="password-modal__overlay" @click="onCloseModalPassClick"></div>
		<div class="password-modal__dialog">
			<h3 class="password-modal__title">{{ secret.website }}</h3>
			<form class="password-modal__form" onsubmit="return false">
				<div class="password-modal__wrapper">
					<span class="password-modal__label">Логин</span>
					<input
						v-model="secret.login"
						type="text"
						class="password-modal__input password-modal__input--login"
						placeholder="Введите логин"
						readonly
					>
					<svg class="password-modal__copy" @click="onCopyLogin">
						<use xlink:href="../../public/image/sprite.svg#copy-file"></use>
					</svg>
				</div>
				<div class="password-modal__wrapper">
					<span class="password-modal__label">Пароль</span>
					<input
						v-model="password_visible"
						:type="isPasswordShown?'text' : 'password'"
						class="password-modal__input"
						placeholder="Введите пароль"
						readonly
					>
					<div class="password-modal__eyes" @click="onShowPassword">
						<svg v-if="!isPasswordShown" class="password-modal__eye password-modal__eye--show">
							<use xlink:href="../../public/image/sprite.svg#eye-show"></use>
						</svg>
						<svg v-else class="password-modal__eye password-modal__eye--hidden">
							<use xlink:href="../../public/image/sprite.svg#eye-hide"></use>
						</svg>
					</div>
					<svg class="password-modal__copy" @click="onCopyPassword">
						<use xlink:href="../../public/image/sprite.svg#copy-file"></use>
					</svg>
				</div>
				<div class="password-modal__buttons">
					<button
						class="password-modal__button password-modal__button--cansel"
						@click="onCloseModalPassClick"
					>
						Отменить
					</button>
					<button class="password-modal__button" @click="onEnterMaster(secret)">Изменить</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import {mapActions} from "vuex";
import {PathEditPassword} from "@/router";
import {ignore, passwordMask} from "@/store/const";

export default {
	name: "PasswordModal",
	data() {
		return {
			isPasswordShown: false,
			password_visible: '',
		}
	},
	props: {
		secret: {
			type: Object,
			required: true
		},
	},
	methods: {
		...mapActions(['decryptPassword', 'notify']),
		onEnterMaster(secret) {
			if (this.$route.path === PathEditPassword) {
				return
			}
			this.$router.push({path: PathEditPassword.replace(":id", secret.id)})
		},
		onShowPassword() {
			if (this.isPasswordShown) {
				this.password_visible = passwordMask
			} else {
				this.decryptPassword(this.secret.password).then((password) => {
					this.password_visible = password;
				}, ignore)
			}
			this.isPasswordShown = !this.isPasswordShown;
		},
		onCopyPassword() {
			this.decryptPassword(this.secret.password).then((password) => {
				try {
					navigator.clipboard.writeText(password)
					this.notify('Пароль скопирован!')
				} catch (e) {
					console.log(e)
				}
			}, ignore)
		},
		onCopyLogin() {
			try {
				navigator.clipboard.writeText(this.secret.login)
				this.notify('Логин скопирован!')
			} catch (e) {
				console.log(e)
			}
		},
		closeModalPass() {
			this.$emit('onCloseModalPassClick')
		},
		onCloseModalPassClick() {
			this.closeModalPass()
		},
	},
	created() {
		this.password = {
			value: this.secret.password,
			encrypted: true,
		}
		this.password_visible = passwordMask
	}
}
</script>

<style lang="scss">
.password-modal {
	&__overlay {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background-color: rgba(3, 20, 20, 0.7);
		z-index: 100;
		visibility: visible;
		opacity: 1;
		transition: opacity 0.2s;
	}

	&__dialog {
		position: fixed;
		top: 50%;
		left: 50%;
		width: 312px;
		max-height: 100%;
		transform: translate(-50%, -50%);
		padding: 24px 24px 16px 24px;
		background-color: $color-background;
		border-radius: 14px;
		z-index: 101;
		visibility: visible;
		opacity: 1;
		transition: opacity 0.2s;
		overflow: auto;
	}

	&__title {
		font-family: $font-family-sf-pro-semi-bold;
		font-size: 16px;
		line-height: 20px;
		margin: 0 0 16px 0;
		text-align: center;
	}

	&__form {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	&__wrapper {
		position: relative;
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	&__label {
		font-family: $font-family-sf-pro-semi-bold;
		color: $color-text-secondary;
		font-size: 14px;
		line-height: 20px;
		margin-bottom: 4px;
	}

	&__input {
		color: $color-text-primary;
		margin-bottom: 24px;
		width: 100%;
	}

	&__buttons {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	&__button {
		width: 128px;
		padding: 11px;
		line-height: 18px;
		background-color: $color-primary;
		color: $color-background;

		&--cansel {
			background-color: $color-button;
			color: $color-primary;
		}
	}

	&__copy {
		fill: $color-icon-line;
		position: absolute;
		top: 23px;
		right: 0;
		width: 16px;
		height: 21px;
		cursor: pointer;
	}

	&__eyes {
		position: absolute;
		top: 23px;
		right: 23px;
		cursor: pointer;
	}

	&__eye {
		width: 18px;
		height: 12px;
		fill: $color-icon-line;
	}

	&__error {
		position: absolute;
		font-size: 12px;
		color: $color-error;
		bottom: -1px;
	}
}
</style>
