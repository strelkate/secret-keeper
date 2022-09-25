<template xmlns="http://www.w3.org/1999/html">
  <div>
	  <MasterPasswordModal/>
	  <Toast v-if="isToastShown" />
	  <router-view/>
  </div>
</template>

<script>
import MasterPasswordModal from "@/views/MasterPasswordModal";
import Toast from "@/views/Toast";
import {mapGetters} from "vuex";
export default {
	name: "App",
	components: {Toast, MasterPasswordModal},
	computed: {
		...mapGetters(['isToastShown'])
	},
}
</script>
<style lang="scss">

.container {
	max-width: 1240px;
	width: 100%;
	margin: auto;
}

</style>
