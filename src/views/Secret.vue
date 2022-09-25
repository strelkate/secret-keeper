<template>
	<div class="secret">
		<Header :title="this.title"/>
		<div class="container">
			<form class="secret__form" onsubmit="return false">
				<div class="secret__top">
					<div class="secret__wrapper">
						<span class="secret__label">Пароль</span>
						<input
							v-model="password1"
							class="secret__input"
							:type="isPassword1Shown?'text' : 'password'"
							placeholder="Введите master password"
							autocomplete="new-password"
							@focus="onFocus('password1')"
						>
						<div class="secret__eyes" @click="onShowPassword1()">
							<svg v-if="!isPassword1Shown" class="secret__eye secret__eye--show">
								<use xlink:href="../../public/image/sprite.svg#eye-show"></use>
							</svg>
							<svg v-else class="secret__eye secret__eye--hidden">
								<use xlink:href="../../public/image/sprite.svg#eye-hide"></use>
							</svg>
						</div>
						<span class="secret__error secret__error--password1" v-if="password1_error">Пароль должен быть больше 8 символов</span>
					</div>
					<div class="secret__wrapper">
						<span class="secret__label">Повторите пароль</span>
						<input
							v-model="password2"
							class="secret__input"
							:type="isPassword2Shown?'text' : 'password'"
							placeholder="Повторите master password"
							autocomplete="new-password"
							@focus="onFocus('password2')"
						>
						<div class="secret__eyes" @click="onShowPassword2()">
							<svg v-if="!isPassword2Shown" class="secret__eye secret__eye--show">
								<use xlink:href="../../public/image/sprite.svg#eye-show"></use>
							</svg>
							<svg v-else class="secret__eye secret__eye--hidden">
								<use xlink:href="../../public/image/sprite.svg#eye-hide"></use>
							</svg>
						</div>
						<span class="secret__error secret__error--password2"
							  v-if="password2_error">Пароли не совпадают</span>
					</div>
					<div class="secret__wrapper">
						<textarea
							v-model="mnemonicTextarea"
							class="secret__textarea"
							:readonly="isLabelShown"
							placeholder="Введите или сгенерируйте секретное слово"
							@focus="onFocus('mnemonicTextarea')">
						</textarea>
						<svg class="secret__copy" @click="onCopyWords()">
							<use xlink:href="../../public/image/sprite.svg#copy-file"></use>
						</svg>
						<span
							class="secret__error secret__error--textarea"
							v-if="mnemonicTextarea_error"
						>
							Сгенерируйте или введите ранее сгененрированную секретную фразу
						</span>
						<label v-if="isLabelShown" class="secret__info">Сохраните секретное слово в надежном
							месте</label>
					</div>
				</div>
				<div class="secret__bottom">
					<button
						class="secret__button secret__button--generate"
						:class="isButtonGenerate? 'secret__button--generate--disable' : ''"
						@click="onGenerateWords()"
					>
						Сгенерировать секретную фразу
					</button>
					<button class="secret__button" @click="onStartClick()">Сохранить</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import {mapActions} from "vuex";
import Header from "@/views/Header";

export default {
	name: "Secret",
	components: {Header},
	data() {
		return {
			title: 'Настройки безопасности',
			password1: '',
			password2: '',
			mnemonicTextarea: '',
			password1_error: false,
			password2_error: false,
			mnemonicTextarea_error: false,
			isPassword1Shown: false,
			isPassword2Shown: false,
			isLabelShown: false,
			isButtonGenerate: false,
		}
	},
	methods: {
		...mapActions(['setMasterKey', 'notify']),
		onFocus(type) {
			switch (type) {
				case 'password1':
					this.password1_error = false
					break
				case 'password2':
					this.password2_error = false
					break
				case 'mnemonicTextarea':
					this.mnemonicTextarea_error = false
					break
			}
		},
		onShowPassword1() {
			this.isPassword1Shown = !this.isPassword1Shown;
		},
		onShowPassword2() {
			this.isPassword2Shown = !this.isPassword2Shown;
		},
		onStartClick() {
			let valid = true
			if (this.password1.length < 8) {
				this.password1_error = true
				valid = false
			}
			if (this.password1 !== this.password2) {
				this.password2_error = true
				valid = false
			}
			if (this.mnemonicTextarea === "") {
				this.mnemonicTextarea_error = true
				valid = false
			}
			if (!valid) {
				return
			}
			let random = goRandom(20)
			let result = goRestoreMasterKey(this.mnemonicTextarea, this.password1, random.random)
			if (!result) {
				console.log('result is null')
				return
			}
			if (!!result && ('error' in result)) {
				console.log(result.error)
				return
			}
			this.setMasterKey({masterKey: result.key, salt: random.random});
			this.$router.push({name: 'Keeper'})
		},
		onGenerateWords() {
			if (this.password1.length < 8) {
				this.password1_error = true
				return
			}
			if (this.password1 !== this.password2) {
				this.password2_error = true
				return
			}
			let random = goRandom(20)
			let result = goInitMasterKey(this.password1, random.random)
			if (!result) {
				console.log('result is null')
				return
			}
			if (!!result && ('error' in result)) {
				console.log(result.error)
				return
			}
			this.mnemonicTextarea = result.mnemonic
			this.isLabelShown = true
			this.isButtonGenerate = true
		},
		onCopyWords() {
			if (this.mnemonicTextarea !== "") {
				try {
					navigator.clipboard.writeText(this.mnemonicTextarea)
					this.notify('Секретное слово скопировано')
				} catch (e) {
					throw e
				}
			} else {
				this.mnemonicTextarea_error = true
			}
		}
	}
}
</script>

<style lang="scss">
.secret {
	display: flex;
	flex-direction: column;
	align-items: center;

	&__form {
		margin-top: 24px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	&__top {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	&__bottom {
		position: absolute;
		bottom: 53px;
		width: 100%;
		max-width: 279px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	&__label {
		font-family: $font-family-sf-pro-semi-bold;
		color: $color-text-secondary;
		font-size: 16px;
		line-height: 20px;
		margin-bottom: 8px;
	}

	&__wrapper {
		position: relative;
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	&__input {
		color: $color-text-primary;
		width: 100%;
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

	&__textarea {
		width: 100%;
		height: 125px;
		padding: 8px;
		margin-bottom: 8px;
		font-family: $font-family-sf-pro-regular;
		color: $color-text-tertiary;
		font-size: 16px;
		line-height: 18px;
		border: 1px solid #C5CECB;
		border-radius: 8px;
		resize: none;
		outline: none;
	}

	&__copy {
		fill: $color-icon-line;
		position: absolute;
		top: 10px;
		right: 12px;
		width: 16px;
		height: 21px;
		cursor: pointer;
	}

	&__error {
		position: absolute;
		font-size: 12px;
		color: $color-error;
		bottom: -1px;

		&--textarea {
			bottom: -12px;
		}
	}

	&__info {
		text-align: center;
		padding: 5px;
		border: thick double $color-primary;
		border-radius: 8px;
		font-size: 12px;
		line-height: 14px;
		color: $color-text-secondary;
	}

	&__button {
		margin-top: 8px;
		width: 100%;
		background-color: $color-primary;
		color: $color-background;

		&--generate {
			color: $color-primary;
			background-color: $color-button;

			&--disible {
				color: $color-text-tertiary;
			}
		}
	}

}
</style>
