<template>
	<div class="signup">
		<div class="container">
			<form class="signup__form" method="post" @submit="onSubmit">
				<div class="signup__top">
					<h2 class="signup__title">Регистрация</h2>
					<div class="signup__wrapper">
						<span class="signup__label">Логин</span>
						<input
							v-model="login"
							class="signup__input"
							type="text"
							placeholder="Введите логин"
							autocomplete="new-password"
							@focus="onFocus('login')"
							@input="onValidLogin"
						>
						<span class="signup__error signup__error--login"
							  v-if="login_error">Логин должен быть больше 2-х символов</span>
					</div>
					<div class="signup__wrapper">
						<span class="signup__label">Пароль</span>
						<input
							v-model="password1"
							class="signup__input"
							:type="isPassword1Shown?'text' : 'password'"
							placeholder="Введите пароль"
							autocomplete="new-password"
							@focus="onFocus('password1')"
							@input="onValidPassword1"
						>
						<div class="signup__eyes" @click="onShowPassword1()">
							<svg v-if="!isPassword1Shown" class="signup__eye signup__eye--show">
								<use xlink:href="../../public/image/sprite.svg#eye-show"></use>
							</svg>
							<svg v-else class="signup__eye signup__eye--hidden">
								<use xlink:href="../../public/image/sprite.svg#eye-hide"></use>
							</svg>
						</div>

						<span class="signup__error signup__error--password1" v-if="password1_error">Пароль должен быть больше 8 символов</span>
					</div>
					<div class="signup__wrapper">
						<span class="signup__label">Повторите пароль</span>
						<input
							v-model="password2"
							class="signup__input"
							:type="isPassword2Shown?'text' : 'password'"
							placeholder="Введите пароль"
							autocomplete="new-password"
							@focus="onFocus('password2')"
							@input="onValidPassword2"
						>
						<div class="signup__eyes" @click="onShowPassword3()">
							<svg v-if="!isPassword2Shown" class="signup__eye signup__eye--show">
								<use xlink:href="../../public/image/sprite.svg#eye-show"></use>
							</svg>
							<svg v-else class="signup__eye signup__eye--hidden">
								<use xlink:href="../../public/image/sprite.svg#eye-hide"></use>
							</svg>
						</div>
						<span class="signup__error signup__error--password2"
							  v-if="password2_error">Пароли не совпадают</span>
					</div>
				</div>
				<div class="signup__bottom">
					<button class="signup__button" type="submit" :class="validate? 'signup__button--hover' : ''">
						Зарегистрироваться
					</button>
					<div class="link signup__link" @click="onLoginClick()">У меня уже есть аккаунт</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import {mapActions} from "vuex";

export default {
	name: "Signup",
	data() {
		return {
			login: '',
			password1: '',
			password2: '',
			login_error: false,
			password1_error: false,
			password2_error: false,
			isPassword1Shown: false,
			isPassword2Shown: false,
		}
	},
	computed: {
		validate() {
			let valid
			valid = !(this.login.length < 2 || this.password1.length < 8 || this.password1 !== this.password2);
			return valid
		}
	},
	methods: {
		...mapActions(['signUp', 'notify']),
		onLoginClick() {
			this.$router.push({name: 'Login'})
		},
		onSubmit(e) {
			e.preventDefault()
			if (!this.validate) return

			this.signUp({login: this.login, password: this.password1}).then(errorText => {
				if (!errorText) {
					this.notify('Вы успешно зарегистрированы!')
					this.$router.push({name: 'Login'})
				} else {
					console.log('login error:', errorText)
				}
			})
		},
		onValidLogin() {
			this.login_error = this.login.length < 2;
		},
		onValidPassword1() {
			this.password1_error = this.password1.length < 8;
		},
		onValidPassword2() {
			this.password2_error = this.password1 !== this.password2;
		},
		onFocus(type) {
			switch (type) {
				case 'login':
					this.login_error = false
					break
				case 'password1':
					this.password_error = false
					break
				case 'password2':
					this.password_error = false
					break
			}
		},
		onShowPassword1() {
			this.isPassword1Shown = !this.isPassword1Shown;
		},
		onShowPassword3() {
			this.isPassword2Shown = !this.isPassword2Shown;
		}
	}
}
</script>

<style lang="scss">
.signup {
	&__form {
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

	&__title {
		font-family: $font-family-sf-pro-bold;
		font-size: 22px;
		line-height: 26px;
		margin: 120px 0 32px 0;
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
		fill: $color-icon-line;
	}

	&__eye {
		width: 18px;
		height: 12px;
	}

	&__error {
		position: absolute;
		font-size: 12px;
		color: $color-error;
		bottom: -1px;
	}

	&__button {
		margin-top: 8px;
		width: 100%;
		margin-bottom: 16px;

		&--hover {
			background-color: $color-primary;
			color: #ffffff;
		}
	}
}


</style>
