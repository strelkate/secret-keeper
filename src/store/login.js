import http from "@/store/axios";
import router from "@/router";

export const moduleLogin = {
	state: () => ({
		token: localStorage.getItem('token'),
	}),
	getters: {
		getToken(state) {
			return state.token
		},
		isToken: state => state.token != null
	},
	mutations: {
		setToken(state, token) {
			state.token = token
			localStorage.setItem('token', token)
		},
		logout(state) {
			state.token = ''
			localStorage.setItem('token', '')
		},
	},
	actions: {
		logIn(context, {login, password}) {
			const json = JSON.stringify({login: login, password: password});
			return http.post("/auth/v1/login", json, {
				headers: {
					'Content-Type': 'application/json'
				}
			}).then((response) => {
				if ('error' in response.data) {
					return response.data.error
				}
				if (!('token' in response.data)) {
					return 'unknown server response'
				}
				context.commit('setToken', response.data.token)
				return null
			}, error => {
				return 'unknown server response'
			})
		},
		logout(context) {
			console.log('login logout')
			context.commit('logout')
			router.push({name: "Login"})
		},
		signUp(context, {login, password}) {
			const json = JSON.stringify({login: login, password: password});
			return http.post("/auth/v1/signup", json, {
				headers: {
					'Content-Type': 'application/json'
				},
			}).then((response) => {
				if (response.status === 200) {
					return null
				}
				if ('error' in response.data) {
					return response.data.error
				}
				return null
			}, error => {
				if (error.response.status === 500) {
					if ('error' in error.response.data) {
						return error.response.data.error
					}
					return 'unknown server response'
				}
			})
		},
	},
}


