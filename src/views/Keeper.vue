<template>
	<div class="keeper">
		<Search/>
		<div class="keeper__container">
			<Directory
				v-for="(directory, index) in getDirectoriesSecrets"
				:key="index"
				:prop_directory="directory"
			/>
			<div v-if="getDirectoriesSecrets.length === 0" class="keeper__empty">
				<svg class="keeper__lock">
					<use xlink:href="../../public/image/sprite.svg#lock"></use>
				</svg>
				<label class="keeper__label">
					Здесь появятся ваши пароли, нажмите +
				</label>
			</div>
		</div>
	</div>
</template>

<script>
import CreateDirectoryModal from "@/views/CreateDirectoryModal";
import PasswordRow from "@/views/PasswordRow";
import Directory from "@/views/Directory";
import {mapActions, mapGetters} from "vuex";
import Search from "@/views/Search";

export default {
	name: "Keeper",
	components: {Search, Directory, PasswordRow, CreateDirectoryModal},
	data() {
		return {
			showModalDirectory: false,
		}
	},
	methods: {
		...mapActions(['loadDirectoriesSecrets', 'resetMasterPassword']),
	},
	computed: {
		...mapGetters(['getDirectoriesSecrets', 'isToken', 'isMasterKey'])
	},
	created() {
		window.addEventListener('blur', ()=> {
			this.resetMasterPassword()
		});
		if (!this.isToken) {
			this.$router.push({name: 'Login'})
		}
		if (!this.isMasterKey) {
			this.$router.push({name: 'Secret'})
		}
		this.loadDirectoriesSecrets()
	}
};
</script>

<style lang="scss">
.keeper {
	position: relative;

	&__container {
		width: 343px;
		margin: 24px auto 0 auto;
	}

	&__empty {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	&__lock {
		margin-top: 166px;
		width: 41px;
		height: 50px;
	}

	&__label {
		margin: 16px 0;
		font-family: $font-family-sf-pro-regular;
		font-size: 16px;
		line-height: 18px;
	}
}

</style>
