export const moduleNotification = {
	state: () => ({
		queue: [],
		interval: null,
		message: '',
		isToastShown: false
	}),
	getters: {
		isToastShown: state => state.isToastShown,
		getToastMessage: state => state.message,
	},
	mutations: {
		notify(state, message) {
			if (!!state.interval) {
				state.queue.push(message);
				return
			}
			state.message = message;
			state.isToastShown = true;
			state.interval = setInterval(() => {
				state.isToastShown = false;
				const m = state.queue.shift()
				if (!!m) {
					state.message = m;
					setTimeout(()=>{
						state.isToastShown = true;
					}, 50)
				} else {
					clearInterval(state.interval);
					state.interval = null;
				}
			}, 3000)
		},
	},
	actions: {
		notify(ctx, message) {
			ctx.commit('notify', message)
		},
	},
}
