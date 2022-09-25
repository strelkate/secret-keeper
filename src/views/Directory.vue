<template>
	<div class="directory">
		<div class="directory__wrapper" @click="onSecretsShownClick">
			<div class="directory__name">{{ prop_directory.name }}</div>
			<div class="directory__icon">
				<svg class="directory__arrow" :class="isSecretsShown? 'directory__arrow--top' : ''">
					<use xlink:href="../../public/image/sprite.svg#keeper-arrow"></use>
				</svg>
			</div>
		</div>
		<PasswordRow
			v-if="isSecretsShown"
			v-for="(secret, index) in this.secrets"
			:key="index"
			:secret="secret"
		/>
	</div>
</template>

<script>
import PasswordRow from "@/views/PasswordRow";

export default {
	name: "Directory",
	components: {PasswordRow},
	data() {
		return {
			isSecretsShown: false
		}
	},
	props: {
		prop_directory: {
			type: Object,
			required: true
		},
	},
	computed: {
		secrets() {
			return this.isSecretsShown ? this.prop_directory.secrets : [];
		}
	},
	methods: {
		onSecretsShownClick() {
			this.isSecretsShown = !this.isSecretsShown;
		}
	}
}
</script>

<style lang="scss">
.directory {
	width: 100%;
	margin-bottom: 8px;

	&__wrapper {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 25px;
		cursor: pointer;
	}

	&__name {
		font-family: $font-family-sf-pro-semi-bold;
		color: $color-primary;
		font-weight: 600;
		font-size: 16px;
		line-height: 20px;
	}

	&__icon {
		text-align: center;
		width: 24px;
		height: 100%;
		cursor: pointer;
	}

	&__arrow {
		width: 6px;
		height: 12px;
		fill: $color-primary;
		transform: rotate(270deg);

		&--top {
			transform: rotate(90deg);
		}
	}

}


</style>
