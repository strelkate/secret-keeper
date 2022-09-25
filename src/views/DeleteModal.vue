<template>
	<div class="delete-modal">
		<div class="delete-modal__overlay" @click="onCloseModalDeleteClick()"></div>
		<div class="delete-modal__dialog">
			<h3 class="delete-modal__title">Удалить пароль?</h3>
			<div class="delete-modal__buttons">
				<button
					class="delete-modal__button delete-modal__button--cansel"
					@click="onCloseModalDeleteClick()">
					Отменить
				</button>
				<button class="delete-modal__button" @click="onDeletePasswordClick">Удалить</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "DeleteModal",
	methods: {
		closeModalDelete() {
			this.$emit('onCloseModalDeleteClick')
		},
		onCloseModalDeleteClick() {
			this.closeModalDelete()
		},
		deletePassword() {
			this.$emit('onDeletePasswordClick')
		},
		onDeletePasswordClick() {
			this.deletePassword()
		},
	}
}
</script>

<style lang="scss">
.delete-modal {
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
		font-family: $font-family-sf-pro-medium;
		font-size: 16px;
		line-height: 20px;
		font-weight: 600;
		margin: 0 0 24px 0;
		text-align: center;
	}
	&__buttons {
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
}
</style>
