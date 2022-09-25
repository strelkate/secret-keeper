import http from "@/store/axios";
import router from "@/router";

export const moduleDirectorySecret = {
	state: () => ({
		directoriesSecrets: [],
	}),
	getters: {
		getDirectoriesSecrets(state) {
			return state.directoriesSecrets
		},
	},
	mutations: {
		setDirectoriesSecrets(state, directoriesSecrets) {
			state.directoriesSecrets = directoriesSecrets
		},
	},
	actions: {
		addDirectory(context, directory) {
			const json = JSON.stringify({name: directory.name});
			const params = {
				headers: {
					"Authorization": context.getters.getToken,
					'Content-Type': 'application/json'
				}
			};
			return http.post("/api/v1/directory", json, params).then(response => {
				if (response.status !== 200) {
					return 'unknown server response'
				}
				return response.data
			}, error => {
				if (error.response.status === 500) {
					if ('error' in error.response.data) {
						return error.response.data.error
					}
					return 'unknown server response'
				}
				if (error.response.status === 401) {
					router.push({name: 'Login'})
					return
				}
				return 'unknown server response'
			})
		},
		editDirectory(context, directory) {
			const json = JSON.stringify({id: directory.id, name: directory.name});
			return http.put("/api/v1/directory", json, {
				headers: {
					"Authorization": context.getters.getToken,
					'Content-Type': 'application/json'
				}
			}).then((response) => {
				if (response.status !== 200) {
					return 'unknown server response'
				}
				return null
			}, (error) => {
				if (error.response.status === 500) {
					if ('error' in error.response.data) {
						return error.response.data.error
					}
					return 'unknown server response'
				}
				if (error.response.status === 401) {
					router.push({name: 'Login'})
					return
				}
				return 'unknown server response'
			})
		},
		deleteDirectory(context, id) {
			const json = JSON.stringify({
				id: id,
			});
			return http.delete("/api/v1/directory", {
				headers: {
					"Authorization": context.getters.getToken,
					'Content-Type': 'application/json'
				},
				data: json,
			}).then((response) => {
				if (response.status !== 200) {
					return 'unknown server response'
				}
				return response.data
			}, (error) => {
				if (error.response.status === 500) {
					if ('error' in error.response.data) {
						return error.response.data.error
					}
					return 'unknown server response'
				}
				if (error.response.status === 401) {
					router.push({name: 'Login'})
					return
				}
				return 'unknown server response'
			})
		},
		addSecret(context, secret) {
			const json = JSON.stringify({
				directory_id: secret.directory_id,
				website: secret.website,
				login: secret.login,
				password: secret.password,
			});
			return http.post("/api/v1/secret", json, {
				headers: {
					"Authorization": context.getters.getToken,
					'Content-Type': 'application/json'
				}
			}).then((response) => {
				if (response.status !== 200) {
					return 'unknown server response'
				}
				return null
			}, (error) => {
				if (error.response.status === 500) {
					if ('error' in error.response.data) {
						return error.response.data.error
					}
					return 'unknown server response'
				}
				if (error.response.status === 401) {
					router.push({name: 'Login'})
					return
				}
				return 'unknown server response'
			})
		},
		editSecret(context, secret) {
			const json = JSON.stringify({
				id: secret.id,
				directory_id: secret.directory_id,
				website: secret.website,
				login: secret.login,
				password: secret.password,
			});
			return http.put("/api/v1/secret", json, {
				headers: {
					"Authorization": context.getters.getToken,
					'Content-Type': 'application/json'
				}
			}).then((response) => {
				if (response.status !== 200) {
					return 'unknown server response'
				}
				return null
			}, (error) => {
				if (error.response.status === 500) {
					if ('error' in error.response.data) {
						return error.response.data.error
					}
					return 'unknown server response'
				}
				if (error.response.status === 401) {
					router.push({name: 'Login'})
					return
				}
				return 'unknown server response'
			})
		},
		deleteSecret(context, id) {
			const json = JSON.stringify({
				id: id,
			});
			return http.delete("/api/v1/secret", {
				headers: {
					"Authorization": context.getters.getToken,
					'Content-Type': 'application/json'
				},
				data: json,
			}).then(response => {
				if (response.status !== 200) {
					return 'unknown server response'
				}
				return response.data
			}, (error) => {
				if (error.response.status === 500) {
					if ('error' in error.response.data) {
						return error.response.data.error
					}
					return 'unknown server response'
				}
				if (error.response.status === 401) {
					router.push({name: 'Login'})
					return
				}
				return 'unknown server response'
			})
		},
		secretById(context, id) {
			return http.get("/api/v1/secret/" + id, {
				headers: {
					"Authorization": context.getters.getToken,
				}
			}).then(response => {
				if (response.status !== 200) {
					return 'unknown server response'
				}
				return response.data
			}, (error) => {
				if (error.response.status === 500) {
					if ('error' in error.response.data) {
						return error.response.data.error
					}
					return 'unknown server response'
				}
				if (error.response.status === 401) {
					router.push({name: 'Login'})
					return
				}
				return 'unknown server response'
			})
		},
		loadDirectories(context) {
			return http.get("/api/v1/directories", {
				headers: {
					"Authorization": context.getters.getToken,
				}
			}).then(response => {
				if (response.status !== 200) {
					return 'unknown server response'
				}
				return response.data
			}, (error) => {
				if (error.response.status === 500) {
					if ('error' in error.response.data) {
						return error.response.data.error
					}
					return 'unknown server response'
				}
				if (error.response.status === 401) {
					router.push({name: 'Login'})
					return
				}
				return 'unknown server response'
			})
		},
		loadDirectoriesSecrets(context) {
			return http.get("/api/v1/directories/secrets", {
				headers: {
					"Authorization": context.getters.getToken,
				}
			}).then(response => {
				if (response.status !== 200) {
					return 'unknown server response'
				}
				context.commit('setDirectoriesSecrets', response.data)
				return response.data
			}, (error) => {
				if (error.response.status === 500) {
					if ('error' in error.response.data) {
						return error.response.data.error
					}
					return 'unknown server response'
				}
				if (error.response.status === 401) {
					router.push({name: 'Login'})
					return
				}
				return 'unknown server response'
			})
		},
		backUp(context) {
			return http.get("/api/v1/backup", {
				headers: {
					"Authorization": context.getters.getToken,
				},
				responseType: 'blob'
			}).then(response => {
				if (response.status !== 200) {
					return 'unknown server response'
				}

				const fileURL = window.URL.createObjectURL(new Blob([response.data]));
				const fURL = document.createElement('a');

				fURL.href = fileURL;
				fURL.setAttribute('download', 'backup.zip');
				document.body.appendChild(fURL);
				fURL.click();
				return null
			}, (error) => {
				if (error.response.status === 500) {
					if ('error' in error.response.data) {
						return error.response.data.error
					}
					return 'unknown server response'
				}
				if (error.response.status === 401) {
					router.push({name: 'Login'})
					return
				}
				return 'unknown server response'
			})
		},
		restoreFromBackup(context, file) {
			let body = new FormData();
			body.append('file', file);
			return http.post("/api/v1/backup", body, {
				headers: {
					"Authorization": context.getters.getToken,
					"Content-Type": "multipart/form-data",
				},
			})
		}
	},
}


