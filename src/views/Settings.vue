<template>
	<div class="settings">
		<Header :title="this.title"/>
		<div class="settings__container">
			<div class="settings__row">
				<svg class="settings__icon">
					<use xlink:href="../../public/image/sprite.svg#download"></use>
				</svg>
				<div class="settings__wrapper">
					<div class="settings__content" @click="onDownloadFileClick()">
						<div class="settings__text">
							<div class="settings__name">Скачать backup</div>
							<div class="settings__note">Резервная копия ваших паролей</div>
						</div>
						<div class="settings__button--arrow">
							<svg class="settings__arrow">
								<use xlink:href="../../public/image/sprite.svg#keeper-arrow"></use>
							</svg>
						</div>
					</div>
					<div class="settings__line"></div>
				</div>
			</div>
			<div class="settings__row">
				<svg class="settings__icon">
					<use xlink:href="../../public/image/sprite.svg#recovery"></use>
				</svg>
				<div class="settings__wrapper">
					<div class="settings__content" @click="$refs.backupInput.click()">
						<div class="settings__text">
							<div class="settings__name">Восстановить из backup</div>
							<div class="settings__note">Восстановление из резервной копия</div>
						</div>
						<div class="settings__button--arrow">
							<svg class="settings__arrow">
								<use xlink:href="../../public/image/sprite.svg#keeper-arrow"></use>
							</svg>
						</div>
						<input
							ref="backupInput"
							type="file"
							accept="application/zip, application/octet-stream, application/x-zip-compressed, multipart/x-zip"
							style="display: none"
							@change="handleBackupChosen"/>
					</div>
					<div class="settings__line"></div>
				</div>
			</div>
			<div class="settings__row">
				<svg class="settings__icon">
					<use xlink:href="../../public/image/sprite.svg#safe"></use>
				</svg>
				<div class="settings__wrapper">
					<div class="settings__content" @click="onSecretClick()">
						<div class="settings__text">
							<div class="settings__name">Настройки безопасности</div>
							<div class="settings__note">Ваш master password</div>
						</div>
						<div class="settings__button--arrow">
							<svg class="settings__arrow">
								<use xlink:href="../../public/image/sprite.svg#keeper-arrow"></use>
							</svg>
						</div>
					</div>
					<div class="settings__line"></div>
				</div>
			</div>
			<div class="settings__row">
				<svg class="settings__icon">
					<use xlink:href="../../public/image/sprite.svg#edit"></use>
				</svg>
				<div class="settings__wrapper">
					<div class="settings__content" @click="onEditDirectoryClick()">
						<div class="settings__text">
							<div class="settings__name">Редактирование групп</div>
							<div class="settings__note">Группируйте свои пароли по группам</div>
						</div>
						<div class="settings__button--arrow">
							<svg class="settings__arrow">
								<use xlink:href="../../public/image/sprite.svg#keeper-arrow"></use>
							</svg>
						</div>
					</div>
					<div class="settings__line"></div>
				</div>
			</div>
			<div class="settings__row">
				<svg class="settings__icon">
					<use xlink:href="../../public/image/sprite.svg#exit"></use>
				</svg>
				<div class="settings__content" @click="onLogOutClick()">
					<div class="settings__text">
						<div class="settings__name">Выйти</div>
					</div>
					<div class="settings__button--arrow"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Header from "@/views/Header";
import {PathEditDirectory, PathSecret} from "@/router";
import {mapActions} from "vuex";

export default {
	name: "Settings",
	data() {
		return {
			title: 'Настройки',
		}
	},
	components: {Header},
	methods: {
		...mapActions(['backUp', 'restoreFromBackup', 'logout', 'setMasterKey', 'setMasterPassword']),
		onSecretClick() {
			this.$router.push({path: PathSecret})
		},
		onEditDirectoryClick() {
			this.$router.push({path: PathEditDirectory})
		},
		onLogOutClick() {
			this.$store.dispatch('logout')
			// this.logout()
		},
		onDownloadFileClick() {
			this.backUp()
		},
		handleBackupChosen(e) {
			e.preventDefault()
			let file = e.target.files[0]
			if (file == null) return
			console.log("backup file", file)
			this.restoreFromBackup(file)
		}
	}
}
</script>

<style lang="scss">
.settings {
	&__container {
		width: 343px;
		margin: 24px auto 0 auto;
	}

	&__row {
		width: 100%;
		display: flex;
		justify-content: space-between;
		padding: 16px 0 0 0;
		text-decoration: none;
	}

	&__icon {
		width: 24px;
		height: 24px;
	}

	&__content {
		display: flex;
		align-items: center;
		cursor: pointer;
	}

	&__text {
		display: flex;
		flex-direction: column;
		width: 263px;
	}

	&__name {
		font-family: $font-family-sf-pro-medium;
		font-weight: 500;
		font-size: 16px;
		line-height: 20px;
		margin-bottom: 4px;
		color: $color-text-primary;
	}

	&__note {
		font-family: $font-family-sf-pro-regular;
		color: $color-text-tertiary;
		font-weight: 400;
		font-size: 14px;
		line-height: 16px;
	}

	&__button {
		&--arrow {
			text-align: center;
			width: 24px;
			cursor: pointer;
			align-self: center;
		}
	}

	&__arrow {
		width: 6px;
		height: 12px;
		fill: $color-primary;
		transform: rotate(180deg);
	}

	&__line {
		width: 100%;
		height: 1px;
		background-color: $color-icon-line;
		margin-top: 16px;
	}
}
</style>
