<template>
	<div class="edit-directory">
		<Header
			:title="this.title"
			:isEditBtnShown="isEditBtnShown"
			@onEditBtnClick="checkBoxShown"
			:isDeleteBtnShown="isDeleteBtnShown"
			@onDeleteBtnClick="deleteBtnClick"
		/>
		<div class="edit-directory__container">
			<DirectoryRow
				v-for="(directory, index) in directories"
				:key="index"
				:prop_directory_row="directory"
				:isCheckBoxShown=isCheckBoxShown
				:onCloseModalDirectory="closeModalDirectory"
				@onCheckBoxCheck=onCheckBoxCheck
				:clearIndicator="clearIndicator"
			/>
			<div class="edit-directory__button" @click="onAddNewDirectory()">
				<svg class="edit-directory__plus">
					<use xlink:href="../../public/image/sprite.svg#plus"></use>
				</svg>
				<div class="edit-directory__text">Новая группа</div>
			</div>

		</div>
		<CreateDirectoryModal
			v-if="isCreateDirectoryModalShown"
			@onCloseModalDirectory="closeModalDirectory"
		/>
	</div>
</template>

<script>
import Header from "@/views/Header";
import DirectoryRow from "@/views/DirectoryRow";
import {mapActions, mapGetters} from "vuex";
import CreateDirectoryModal from "@/views/CreateDirectoryModal";

export default {
	name: "EditDirectory",
	data() {
		return {
			title: 'Редактирование групп',
			directories: [],
			isCreateDirectoryModalShown: false,
			isCheckBoxShown: false,
			isDeleteBtnShown: false,
			isEditBtnShown: true,
			checkBoxArray: [],
			clearIndicator: 0,
		}
	},
	components: {CreateDirectoryModal, Header, DirectoryRow},
	computed: {
		...mapGetters(['getDirectoriesSecrets'])
	},
	methods: {
		...mapActions(['loadDirectories', 'deleteDirectory', 'notify']),
		onAddNewDirectory() {
			this.isCreateDirectoryModalShown = true
		},
		closeModalDirectory(reload) {
			this.isCreateDirectoryModalShown = false
			if (reload) {
				this.getDirectories()
			}
		},
		getDirectories() {
			this.loadDirectories().then((directories) => {
				this.directories = directories
			}, () => {
			})
		},
		checkBoxShown() {
			this.isCheckBoxShown = true
			this.isEditBtnShown = false
			this.isDeleteBtnShown = true
		},
		deleteBtnClick() {
			let all = [];
			this.checkBoxArray.forEach((id) => {
				all.push(this.deleteDirectory(id))
			})
			Promise.all(all).then(errorTexts => {
				for (let i = 0; i < errorTexts.length; i++) {
					if (!!errorTexts[i]) {
						console.log('error:', errorTexts[i])
					}
				}
				this.getDirectories()
				if (this.checkBoxArray.length > 0)  {
					console.log('this.checkBoxArray.length', this.checkBoxArray.length)
					if (this.checkBoxArray.length > 1) {
						this.notify('Группы удалены!')
					} else {
						this.notify('Группа удалена!')
					}
				}
				this.isCheckBoxShown = false
				this.isEditBtnShown = true
				this.isDeleteBtnShown = false
				this.checkBoxArray = []
				this.clearChecks()
			})
		},
		onCheckBoxCheck(id, checked) {
			if (checked && !(this.checkBoxArray.includes(id))) {
				this.checkBoxArray.push(id)
			} else {
				let myIndex = this.checkBoxArray.indexOf(id);
				this.checkBoxArray.splice(myIndex, 1);
			}
		},
		clearChecks() {
			this.clearIndicator++
		}
	},
	created() {
		this.getDirectories()
	}
}
</script>

<style lang="scss">
.edit-directory {
	position: relative;

	&__container {
		width: 343px;
		margin: 24px auto 0 auto;
	}

	&__plus {
		width: 32px;
		height: 32px;
		margin-right: 16px;
	}

	&__button {
		display: flex;
		align-items: center;
		padding: 16px 0;
		cursor: pointer;
	}

	&__text {
		font-family: $font-family-sf-pro-medium;
		font-weight: 500;
		font-size: 16px;
		line-height: 20px;
	}
}
</style>
