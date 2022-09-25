<template>
	<div class="directory-row">
		<div
			class="directory-row__content"
			:class="isCheckBoxShown? 'directory-row__content--checkbox' : ''"
		>
			<div
				v-if="isCheckBoxShown"
				class="directory-row__checkbox"
				@click="onCheckBoxCheck"
			>
				<svg v-if="!isCheckBox" class="directory-row__icon">
					<use xlink:href="../../public/image/sprite.svg#circle"></use>
				</svg>
				<svg v-else class="directory-row__icon">
					<use xlink:href="../../public/image/sprite.svg#checkbox"></use>
				</svg>
			</div>
			<div class="directory-row__name">{{ prop_directory_row.name }}</div>
			<svg
				v-if="!isCheckBoxShown"
				class="directory-row__icon"
				@click="onEditDirectoryNameClick()"
			>
				<use xlink:href="../../public/image/sprite.svg#pen"></use>
			</svg>
		</div>
		<div class="directory-row__line"></div>
		<CreateDirectoryModal
			v-if="isCreateDirectoryModalShown"
			@onCloseModalDirectory="closeModalDirectory"
			:prop_directory="prop_directory_row"
		/>
	</div>
</template>

<script>
import CreateDirectoryModal from "@/views/CreateDirectoryModal";
import {mapActions} from "vuex";

export default {
	name: "DirectoryRow",
	components: {CreateDirectoryModal},
	data() {
		return {
			isCreateDirectoryModalShown: false,
			isCheckBox: false,
		}
	},
	props: {
		prop_directory_row: {
			type: Object,
			required: true
		},
		isCheckBoxShown: {
			type: Boolean,
			required: false
		},
		onCloseModalDirectory: {
			type: Function,
			required: true
		},
		clearIndicator: {
			type: Number,
			required: true
		},
	},
	methods: {
		...mapActions(['loadDirectories']),
		onEditDirectoryNameClick() {
			this.isCreateDirectoryModalShown = true
		},
		closeModalDirectory(reload) {
			this.isCreateDirectoryModalShown = false
			if (reload) {
				this.onCloseModalDirectory(true)
			}
		},
		checkBoxCheck() {
			this.isCheckBox = !this.isCheckBox;
			this.$emit('onCheckBoxCheck', this.prop_directory_row.id, this.isCheckBox)
		},
		onCheckBoxCheck() {
			this.checkBoxCheck()
		},
	},
	watch: {
		clearIndicator() {
				this.isCheckBox = false
		}
	}
}
</script>

<style lang="scss">
.directory-row {
	&__content {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 16px 0;

		&--checkbox {
			justify-content: start
		}
	}

	&__name {
		font-family: $font-family-sf-pro-medium;
		font-weight: 500;
		font-size: 16px;
		line-height: 20px;
	}

	&__icon {
		width: 24px;
		height: 24px;
		cursor: pointer;
	}

	&__line {
		width: 100%;
		height: 1px;
		background-color: $color-icon-line;
		margin-bottom: 16px;
	}

	&__checkbox {
		width: 24px;
		height: 24px;
		margin-right: 16px;
	}

}
</style>
