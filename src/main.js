import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import {store} from './store'
import '@/lib/wasm_exec'
import initGoWasm from "@/lib/lib";
import http from "@/store/axios";

const app = createApp(App)
app.use(store).use(router).mount('#app')
app.config.globalProperties.$axios = http

initGoWasm('/crypto.wasm')
