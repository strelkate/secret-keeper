import {createStore} from 'vuex'
import {moduleDirectorySecret} from "@/store/directorySecret";
import {moduleMaster} from "@/store/master";
import {moduleLogin} from "@/store/login";
import {moduleNotification} from "@/store/notifications";

export const store = createStore ({
	modules: {
		master: moduleMaster,
		directorySecret: moduleDirectorySecret,
		login: moduleLogin,
		notifications: moduleNotification
	}
})
