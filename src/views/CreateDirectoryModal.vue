<template>
	<div class="modal-directory">
		<div id="modal-directory__overlay" class="modal-directory__overlay" @click="closeModalDirectory()"></div>
		<div class="modal-directory__dialog">
			<h3 class="modal-directory__title">Название группы</h3>
			<form
				class="modal-directory__form"
				@submit="onSubmitCreateDirectory"
			>
				<div class="modal-directory__wrapper">
					<input
						v-model="name_directory"
						type="text"
						class="modal-directory__input"
						placeholder="Введите название группы"
						@focus="onFocus()"
						@input="onNameInput"
					>
					<span class="modal-directory__error" v-if="name_directory_error">Введите название группы</span>
				</div>
				<div class="modal-directory__buttons">
					<button
						type="button"
						class="modal-directory__button modal-directory__button--cansel"
						@click="closeModalDirectory()"
					>
						Отменить
					</button>
					<button type="submit" class="modal-directory__button">Сохранить</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import {mapActions} from "vuex";

export default {
	name: "CreateDirectoryModal",
	data() {
		return {
			name_directory: '',
			name_directory_error: false,
		}
	},
	props: {
		prop_directory: {
			type: Object,
			required: false
		},
	},
	methods: {
		...mapActions(['addDirectory', 'editDirectory', 'loadDirectories']),
		closeModalDirectory(reload = false) {
			this.$emit('onCloseModalDirectory', reload)
		},
		onSubmitCreateDirectory(e) {
			e.preventDefault()
			if (this.name_directory === '') {
				this.name_directory_error = true
				return false
			}
			if (!this.prop_directory || this.prop_directory.id === 0) {
				this.addDirectory({name: this.name_directory}).then(error => {
					if (!!error) {
						alert(error)
					}
					this.closeModalDirectory(true)
				})
			} else {
				this.editDirectory({id: this.prop_directory.id, name: this.name_directory}).then(error => {
					if (!!error) {
						alert(error)
					}
					this.closeModalDirectory(true)
				})
			}
			return false
		},
		onNameInput(e) {
			const value = e.target.value;
			if (value.length > 0) {
				this.name_directory = value[0].toUpperCase() + value.substring(1)
			}
		},
		onFocus() {
			this.name_directory_error = false
		},
	},
	 created() {
	 	this.name_directory = (!!this.prop_directory)? this.prop_directory.name : ''
	 }
}
</script>

<style lang="scss">
.modal-directory {

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
		max-width: 312px;
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
			margin-right: 8px;
		}
	}

	&__error {
		position: absolute;
		font-size: 12px;
		color: $color-error;
		bottom: -1px;
	}
}
</style>
