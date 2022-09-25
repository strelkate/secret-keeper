import router from "@/router";

export const moduleMaster = {
	state: () => ({
		masterPassword: '',
		masterPasswordTimeout: null,
		masterKey: localStorage.getItem("masterKey"), // nullable
		salt: localStorage.getItem("salt"), // nullable
		isMasterPassModalShown: false,
		masterPassModalResolve: null,
	}),
	getters: {
		getMasterPassword: state => state.masterPassword,
		getMasterKey: state => state.masterKey,
		getSalt: state => state.salt,
		isMasterPassModalShown: state => state.isMasterPassModalShown,
		isMasterKey: state => !!state.masterKey && state.masterKey !== ''
	},
	mutations: {
		setMasterPassword(state, pass) {
			state.masterPassword = pass
			clearTimeout(state.masterPasswordTimeout)
			state.masterPasswordTimeout = setTimeout(() => {
				state.masterPassword = ''
			}, 10 * 60 * 1000)
		},
		showMasterPassModal(state) {
			state.isMasterPassModalShown = true
		},
		closeMasterPassModal(state) {
			state.isMasterPassModalShown = false
		},
		setMasterKey(state, {masterKey, salt}) {
			localStorage.setItem("masterKey", masterKey);
			localStorage.setItem("salt", salt);
			state.masterKey = masterKey
			state.salt = salt
		},
		setResolveMasterPassModal(state, resolve) {
			state.masterPassModalResolve = resolve
		},
		resolveMasterPassModal(state) {
			if (!!state.masterPassModalResolve) state.masterPassModalResolve(true);
			state.masterPassModalResolve = null
		},
		rejectMasterPassModal(state) {
			if (!!state.masterPassModalResolve) state.masterPassModalResolve(false);
			state.masterPassModalResolve = null
		},
		logout(state) {
			state.masterKey = null
			localStorage.removeItem('masterKey')
			state.salt = null
			localStorage.removeItem("salt");
			state.masterPassword = ''
		},
	},
	actions: {
		showMasterPassModal(ctx) {
			ctx.commit('showMasterPassModal')
			return new Promise((resolve)=>{
				ctx.commit('setResolveMasterPassModal', resolve)
			})
		},
		closeMasterPassModal(ctx) {
			ctx.commit('closeMasterPassModal')
			ctx.commit('rejectMasterPassModal')
		},
		setMasterPassword(ctx, pass) {
			ctx.commit('setMasterPassword', pass)
			ctx.commit('resolveMasterPassModal')
		},
		resetMasterPassword(ctx) {
			ctx.commit('setMasterPassword', '')
		},
		setMasterKey(ctx, masterKey) {
			ctx.commit('setMasterKey', masterKey)
		},
		generatePassword(ctx) {
			const generateFunc = (ctx) => {
				const n = 16
				let result = goRandom(n)
				if (!result) {
					console.log('result is null')
					return
				}
				if (!!result && ('error' in result)) {
					console.log(result.error)
					return
				}
				result = goEncryptPassword(result.random, ctx.getters.getMasterKey, ctx.getters.getMasterPassword,
					ctx.getters.getSalt)
				if (!result) {
					console.log('result is null')
					return
				}
				if (!!result && ('error' in result)) {
					console.log(result.error)
					return
				}
				return result.password
			}

			if (ctx.getters.getMasterPassword === '') {
				return ctx.dispatch('showMasterPassModal').then(() => {
					return generateFunc(ctx);
				})
			}
			return Promise.resolve(generateFunc(ctx));
		},
		decryptPassword(ctx, password) {
			const decryptFunc = (ctx, password) => {
				const result = goDecryptPassword(password, ctx.getters.getMasterKey, ctx.getters.getMasterPassword,
					ctx.getters.getSalt)
				if (!result) {
					console.log('result is null')
					return
				}
				if (!!result && ('error' in result)) {
					console.log('result.error', result.error)
					return
				}
				return result.password
			}

			if (ctx.getters.getMasterPassword === '') {
				return ctx.dispatch('showMasterPassModal').then(() => {
					return decryptFunc(ctx, password)
				})
			}
			return Promise.resolve(decryptFunc(ctx, password));
		},
		async encryptPassword(ctx, password) {
			const encryptFunc = (ctx, password) => {
				const result = goEncryptPassword(password, ctx.getters.getMasterKey, ctx.getters.getMasterPassword,
					ctx.getters.getSalt)
				if (!result) {
					console.log('result is null')
					return
				}
				if (!!result && ('error' in result)) {
					console.log(result.error)
					return
				}
				return result.password
			}

			if (ctx.getters.getMasterPassword === '') {
				const done = await ctx.dispatch('showMasterPassModal');
				if (done) {
					return encryptFunc(ctx, password);
				}
			}
			return encryptFunc(ctx, password);
		},
		logout(context) {
			console.log('master logout')
			context.commit('logout')
			router.push({name: "Login"})
		},
		dataReset(context) {
			context.commit('logout')
		}

	},
}
