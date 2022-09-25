<template>
	<div class="login">
		<div class="container">
			<form class="login__form" @submit="onSubmit" @keypress.enter>
				<div class="login__top">
					<h2 class="login__title">Вход по логину</h2>
					<div class="login__wrapper">
						<span class="login__label">Логин</span>
						<input
							v-model="login"
							class="login__input"
							type="text"
							placeholder="Введите логин"
							@focus="onFocus('login')"
						>
					</div>
					<div class="login__wrapper">
						<span class="login__label">Пароль</span>
						<input
							v-model="password"
							class="login__input"
							:type="isPasswordShown?'text' : 'password'"
							placeholder="Введите пароль"
							@focus="onFocus('password')"
						>
						<div class="login__eyes" @click="onShowPassword()">
							<svg v-if="!isPasswordShown" class="login__eye login__eye--show">
								<use xlink:href="../../public/image/sprite.svg#eye-show"></use>
							</svg>
							<svg v-else class="login__eye login__eye--hidden">
								<use xlink:href="../../public/image/sprite.svg#eye-hide"></use>
							</svg>
						</div>
						<span class="login__error login__error--password"
							  v-if="password_error">Введите корретный пароль</span>
					</div>
				</div>
				<div class="login__bottom">
					<button class="login__button" type="submit" :class="validate? 'login__button--hover' : ''">Войти</button>
					<div class="link login__link" @click="onSignupClick()">Зарегистрироваться</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import {mapActions} from "vuex";
import Search from "@/views/Search";

export default {
	name: "Login",
	components: {Search},
	data() {
		return {
			login: '',
			password: '',
			login_error: false,
			password_error: false,
			isPasswordShown: false,
		}
	},
	computed: {
		validate() {
			return this.login !== '' && this.password !== '';
		}
	},
	methods: {
		...mapActions(['logIn', 'addDirectory', 'dataReset']),
		onSignupClick() {
			this.$router.push({name: 'Signup'})
		},
		onSubmit(e) {
			e.preventDefault()
			if (!this.validate) return
			this.dataReset()
			this.logIn({login: this.login, password: this.password}).then(errorText => {
				if (!errorText) {
					this.$router.push({name: 'Keeper'})
				} else {
					this.password_error = true
				}
			})
		},
		onFocus(type) {
			switch (type) {
				case 'login':
					this.login_error = false
					break
				case 'password':
					this.password_error = false
					break
			}
		},
		onShowPassword() {
			this.isPasswordShown = !this.isPasswordShown;
		},
	}
}
</script>

<style lang="scss">
.login {
	&__form {
		display: flex;
		flex-direction: column;
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
		height: 12px
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
