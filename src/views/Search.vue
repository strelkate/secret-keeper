<template>
	<div class="search">
		<div class="search__top">
			<div class="search__container">
				<h2 class="search__title">Хранилище паролей</h2>
				<div class="search__info">
					<svg class="search__plus" @click="onOpenAddNewPassword()">
						<use xlink:href="../../public/image/sprite.svg#plus"></use>
					</svg>
					<svg class="search__settings" @click="onSettingsClick()">
						<use xlink:href="../../public/image/sprite.svg#cog"></use>
					</svg>
				</div>
			</div>
		</div>
<!--		<div class="search__bottom">-->
<!--			<div class="search__container">-->
<!--				<input class="search__input" placeholder="Поиск">-->
<!--				<svg class="search__icon">-->
<!--					<use xlink:href="../../public/image/sprite.svg#search"></use>-->
<!--				</svg>-->
<!--			</div>-->
<!--		</div>-->
	</div>

</template>

<script>

export default {
	name: "Search",
	methods: {
		onOpenAddNewPassword() {
			this.$router.push({name: 'AddNewPassword'})
		},
		onSettingsClick() {
			this.$router.push({name: 'Settings'})
		},
	},
}
</script>

<style lang="scss">
.search {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;

	&__container {
		width: 343px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 8px 0;
		margin: auto;
		position: relative;
	}

	&__top {
		display: flex;
		align-items: center;
		justify-content: space-between;

	}

	&__title {
		font-family: $font-family-sf-pro-bold;
		font-size: 22px;
		line-height: 26px;
		margin: 0;
	}

	&__info {
		display: flex;
		align-items: center;
		cursor: pointer;
	}

	&__plus {
		width: 32px;
		height: 32px;
		fill: $color-primary;
		margin-right: 16px;
		cursor: pointer;
	}

	&__settings {
		width: 21px;
		height: 21px;
		fill: $color-icon-line;
		stroke: $color-icon-line;
	}

	&__bottom {
		background-color: $color-button;
		width: 100%;
	}

	&__input {
		color: $color-text-primary;
		width: 100%;
		padding: 8px 8px 8px 36px;
		border-radius: 10px;
		border: 0 solid;
		margin: 0;
	}

	&__icon {
		position: absolute;
		left: 12px;
		width: 18px;
		height: 18px;
	}
}
</style>
