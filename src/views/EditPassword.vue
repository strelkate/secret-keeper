<template>
	<div class="edit-password">
		<Header :title="this.title" :isDeleteBtnShown="true" @onDeleteBtnClick="deleteModalShown"/>
		<div class="container">
			<form class="edit-password__form" @submit="onSubmitEditPassword">
				<div class="edit-password__top">
					<div class="edit-password__wrapper">
						<span class="edit-password__label">Название группы</span>
						<div class="edit-password__select">
							<div>
								<input
									class="edit-password__input edit-password__input--select"
									v-model="directory.name"
									@focus="onFocus('directory')"
									@blur="onBlur"
									placeholder="Введите название группы"
									@input="onNameDirectoryInput"
								/>
								<svg class="edit-password__arrow">
									<use xlink:href="../../public/image/sprite.svg#keeper-arrow"></use>
								</svg>
							</div>
							<div class="edit-password__options">
								<div
									v-if="isOptionsShown"
									v-for="(directory, index) in filteredOptions"
									:key="index"
									class="edit-password__option"
									@click="onSelectionOptionClick(directory)"
								>
									{{ directory.name }}
								</div>
							</div>
						</div>
						<span class="edit-password__error edit-password__error--directory" v-if="directory_error">Выберите группу</span>
					</div>
					<div class="edit-password__wrapper">
						<span class="edit-password__label edit-password__label--website">Название сайта</span>
						<input
							v-model="secret.website"
							type="text"
							class="edit-password__input edit-password__input--website"
							placeholder="Введите название сайта"
							@focus="onFocus('website')"
						>
						<span class="edit-password__error edit-password__error--website" v-if="website_error">Введите название сайта</span>
					</div>
					<div class="edit-password__wrapper">
						<span class="edit-password__label">Логин</span>
						<input
							v-model="secret.login"
							type="text"
							class="edit-password__input edit-password__input--login"
							placeholder="Введите логин"
							@focus="onFocus('login')"
						>
						<span class="edit-password__error edit-password__error--login"
							  v-if="login_error">Введите логин</span>
					</div>
					<div class="edit-password__wrapper">
						<span class="edit-password__label">Пароль</span>
						<input
							v-model="password_visible"
							:type="isPasswordShown?'text' : 'password'"
							class="edit-password__input edit-password__input-password"
							placeholder="Введите пароль"
							@focus="onFocus('password')"
							@input="onPasswordInput"
						>
						<div class="edit-password__eyes" @click="onShowPassword()">
							<svg v-if="!isPasswordShown" class="edit-password__eye edit-password__eye--show">
								<use xlink:href="../../public/image/sprite.svg#eye-show"></use>
							</svg>
							<svg v-else class="edit-password__eye edit-password__eye--hidden">
								<use xlink:href="../../public/image/sprite.svg#eye-hide"></use>
							</svg>
						</div>
						<span
							class="edit-password__error edit-password__error--password"
							v-if="password_error"
						>Введите или сгенерируйте пароль</span>
					</div>
				</div>
				<div class="edit-password__bottom">
					<button
						class="edit-password__button edit-password__button--generate"
						@click="onGeneratePassword()"
						type="button"
					>Сгенерировать новый пароль
					</button>
					<button class="edit-password__button edit-password__button--save" type="submit">Сохранить</button>
				</div>
			</form>
		</div>
		<DeleteModal
			v-if="isDeleteModalShown"
			@onCloseModalDeleteClick="closeModalDelete"
			@onDeletePasswordClick="deletePassword"
		/>
	</div>

</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Header from "@/views/Header";
import {ignore, passwordMask} from "@/store/const";
import DeleteModal from "@/views/DeleteModal";

export default {
	name: "EditPassword",
	components: {Header, DeleteModal},
	data() {
		return {
			title: 'Изменение пароля',
			isDeleteModalShown: false,
			directory: {
				id: 0,
				name: ''
			},
			secret: {
				id: parseInt(this.$route.params.id),
				directory_id: 0,
				website: '',
				login: '',
				password: '',
			},
			password: {
				value: '',
				encrypted: false
			},
			password_visible: '',
			isPasswordShown: false,
			directory_error: false,
			website_error: false,
			login_error: false,
			password_error: false,
			isOptionsShown: false,
		}
	},
	computed: {
		...mapGetters(['getDirectoriesSecrets']),
		validate() {
			return !!this.directory &&
				this.directory.name !== '' &&
				this.secret.website !== '' &&
				this.secret.login !== '' &&
				this.password.value !== '';
		},
		filteredOptions() {
			if (this.directory.name.length > 0) {
				return this.getDirectoriesSecrets.filter(item => {
					return item.name.indexOf(this.directory.name) === 0;
				});
			}
			return this.getDirectoriesSecrets
		}
	},
	methods: {
		...mapActions(['deleteSecret', 'editSecret', 'loadDirectoriesSecrets', 'secretById', 'generatePassword',
			'decryptPassword', 'encryptPassword', 'notify', 'addDirectory']),
		onFocus(type) {
			switch (type) {
				case 'directory':
					this.isOptionsShown = true
					this.directory_error = false
					break
				case 'website':
					this.website_error = false
					break
				case 'login':
					this.login_error = false
					break
				case 'password':
					this.password_error = false
					break
			}
		},
		onBlur() {
			setTimeout(() => {
				this.isOptionsShown = false
			}, 50)
		},
		async onSubmitEditPassword(e) {
			e.preventDefault()
			if (!this.validate) return
			if (!!this.directory) {
				this.secret.directory_id = this.directory.id
			}
			if (this.password.encrypted) {
				this.secret.password = this.password.value
			} else {
				this.secret.password = await this.encryptPassword(this.password.value);
			}
			if (this.directory.id === 0) {
				let result = this.getDirectoriesSecrets.find(item => item.name === this.directory.name);
				if (!result) {
					let dir = await this.addDirectory({name: this.directory.name})
					this.secret.directory_id = dir.id
				} else {
					this.secret.directory_id = result.id
				}
			}
			let error = await this.editSecret(this.secret)
			if (!!error) {
				console.log('error:', error)
				this.notify('Пароль не изменен!')
				return
			}
			this.notify('Пароль изменен!')
			this.$router.push({name: 'Keeper'})
			this.loadDirectoriesSecrets()
		},
		onGeneratePassword() {
			this.generatePassword().then((password) => {
				this.password = {
					value: password,
					encrypted: true
				}
				this.password_visible = passwordMask
				this.isPasswordShown = false
			}, ignore)
		},
		onPasswordInput() {
			this.password = {
				value: this.password_visible,
				encrypted: false,
			}
		},
		onShowPassword() {
			if (this.isPasswordShown) {
				this.password_visible = passwordMask
			} else {
				if (this.password.encrypted) {
					this.decryptPassword(this.password.value).then((password) => {
						this.password_visible = password;
					}, ignore)
				} else {
					this.password_visible = this.password.value;
				}
			}
			this.isPasswordShown = !this.isPasswordShown;
		},
		closeModalDelete() {
			this.isDeleteModalShown = false
		},
		deleteModalShown() {
			this.isDeleteModalShown = true
		},
		async deletePassword() {
			let error = await this.deleteSecret(this.secret.id)
			if (!!error) {
				console.log('error:', error)
				this.notify('Пароль не удален!')
				return
			}
			this.notify('Пароль удален!')
			await this.$router.push({name: 'Keeper'})
			await this.loadDirectoriesSecrets()
		},
		onSelectionOptionClick(directory) {
			this.directory = {
				id: directory.id,
				name: directory.name
			}
		},
		onNameDirectoryInput(e) {
			this.directory.id = 0
			const value = e.target.value;
			if (value.length > 0) {
				this.directory.name = value[0].toUpperCase() + value.substring(1)
			}
		},
	}
	,
	created() {
		this.loadDirectoriesSecrets().then((directories) => {
			this.secretById(this.secret.id).then((secret) => {
				this.secret = {
					id: secret.id,
					directory_id: secret.directory_id,
					website: secret.website,
					login: secret.login,
					password: secret.password,
				}
				this.password = {
					value: secret.password,
					encrypted: true,
				}
				this.password_visible = passwordMask
				const dir = directories.find(item => item.id === this.secret.directory_id)
				this.directory = {
					id: dir.id,
					name: dir.name
				}
				return secret
			}, ignore)
		})
	}
}
</script>

<style lang="scss">
.edit-password {
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

		&--website {
			margin-top: 16px;
		}
	}

	&__wrapper {
		position: relative;
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	&__input {
		width: 100%;
		color: $color-text-primary;

		&--select {
			margin: 0;
		}
	}

	&__select {
		width: 100%;
		color: $color-text-primary;
		position: relative;
	}

	&__button {
		margin-top: 8px;
		width: 100%;

		&--generate {
			color: $color-primary;
		}

		&--save {
			background-color: $color-primary;
			color: $color-background;
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

	&__arrow {
		width: 6px;
		height: 12px;
		fill: $color-text-secondary;
		transform: rotate(270deg);
		position: absolute;
		top: 4px;
		right: 5px;
	}

	&__options {
		position: absolute;
		width: 100%;
		max-height: 220px;
		overflow-x: auto;
		background: $color-button;
		z-index: 100;
		font-size: 16px;
		line-height: 18px;
		font-family: $font-family-sf-pro-regular;
		color: $color-text-primary;
		outline: none;
		border-radius: 0;
	}

	&__option {
		cursor: pointer;
		padding: 16px 5px;
		border-bottom: 1px solid $color-icon-line;

		&:hover {
			background-color: $color-primary;
			color: $color-background;
		}
	}
}
</style>
