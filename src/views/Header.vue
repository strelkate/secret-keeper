<template>
	<div class="header">
		<div class="header__wrapper">
			<div class="header__icon" @click="onBackClick">
				<svg class="header__arrow">
					<use xlink:href="../../public/image/sprite.svg#keeper-arrow"></use>
				</svg>
			</div>
			<h2 class="header__title">{{ title }}</h2>
			<div  v-if="isDeleteBtnShown" class="header__button" @click="onDeleteBtnClick">Удалить</div>
			<div v-else-if="isEditBtnShown" class="header__button" @click="onEditBtnClick">Править</div>
			<div v-else class="header__button"></div>
		</div>
		<div class="header__line"></div>
	</div>
</template>

<script>

import router from "@/router";

export default {
	name: "Header",
	data() {
		return {

		}
	},
	props: {
		title: {
			type: String,
			required: true
		},
		isDeleteBtnShown: {
			type: Boolean,
			required: false
		},
		isEditBtnShown: {
			type: Boolean,
			required: false
		},
	},
	methods: {
		onBackClick() {
			router.back()
		},
		deleteBtn() {
			this.$emit('onDeleteBtnClick')
		},
		onDeleteBtnClick() {
			this.deleteBtn()
		},
		editBtn() {
			this.$emit('onEditBtnClick')
		},
		onEditBtnClick() {
			this.editBtn()
		},
	}
}
</script>

<style lang="scss">
.header {
	width: 100%;

	&__title {
		width: 215px;
		font-family: $font-family-sf-pro-semi-bold;
		font-size: 16px;
		line-height: 20px;
		text-align: center;
		margin: 0;
	}

	&__wrapper {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 9px 16px;
		margin: auto;
		width: 375px;
	}

	&__icon {
		padding: 1.5px 9px;
		cursor: pointer;
	}

	&__arrow {
		width: 6px;
		height: 12px;
		fill: $color-icon-line;
		cursor: pointer;
	}

	&__button {
		//width: 80px;
		font-family: $font-family-sf-pro-regular;
		font-size: 14px;
		line-height: 16px;
		color: $color-primary;
		cursor: pointer;
		text-align: end;
	}

	&__line {
		height: 1px;
		background-color: $color-icon-line;
	}
}
</style>
