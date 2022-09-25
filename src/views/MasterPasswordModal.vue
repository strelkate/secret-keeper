<template>
	<div v-if="isMasterPassModalShown" class="modal-master">
		<div id="modal-master__overlay" class="modal-master__overlay" @click="closeMasterPassModal"></div>
		<div class="modal-master__dialog">
			<h3 class="modal-master__title">Master password</h3>
			<form
				class="modal-master__form"
				@submit="onEnterMaster"
			>
				<div class="modal-master__wrapper">
					<span class="modal-master__label">Пароль</span>
					<input
						v-model="master_password"
						:type="isPasswordShown?'text' : 'password'"
						class="modal-master__input"
						placeholder="Введите master password"
						@focus="onFocus()"
					>
					<div class="modal-master__eyes" @click="onShowMaster()">
						<svg v-if="!isPasswordShown" class="modal-master__eye modal-master__eye--show">
							<use xlink:href="../../public/image/sprite.svg#eye-show"></use>
						</svg>
						<svg v-else class="modal-master__eye modal-master__eye--hidden">
							<use xlink:href="../../public/image/sprite.svg#eye-hide"></use>
						</svg>
					</div>
					<span class="modal-master__error"
						  v-if="master_password_error">Введите корректный master password</span>
				</div>
				<div class="modal-master__buttons">
					<button
						class="modal-master__button modal-master__button--cansel"
						@click="closeMasterPassModal"
					>
						Отменить
					</button>
					<button type="submit" class="modal-master__button">Готово</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
	name: "MasterPasswordModal",
	data() {
		return {
			master_password: '',
			master_password_error: false,
			isPasswordShown: false
		}
	},
	computed: {
		...mapGetters(['isMasterPassModalShown', 'getMasterKey', 'getSalt'])
	},
	methods: {
		...mapActions(['closeMasterPassModal', 'setMasterPassword']),
		onFocus() {
			this.master_password_error = false
		},
		onEnterMaster(e) {
			e.preventDefault()
			let result = goEncryptPassword('sometext', this.getMasterKey, this.master_password, this.getSalt)
			if (!result) {
				this.master_password_error = true
				return
			}
			if (!!result && ('error' in result)) {
				this.master_password_error = true
				return
			}

			if (this.master_password === "") {
				this.master_password_error = true
				return
			}
			this.setMasterPassword(this.master_password)
			this.master_password = ''
			this.closeMasterPassModal()
			return false
		},
		onShowMaster() {
			this.isPasswordShown = !this.isPasswordShown;
		}
	},
}
</script>

<style lang="scss">
.modal-master {

	&__overlay {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background-color: rgba(3, 20, 20, 0.7);
		z-index: 105;
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
		z-index: 106;
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

	&__eyes {
		position: absolute;
		top: 27px;
		right: 0;
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
