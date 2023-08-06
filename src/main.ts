import './assets/main.css'
import './assets/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import Colada Plugin
import Colada, { PiniaColadaPlugin } from 'colada-plugin';
import App from './App.vue'
import router from './router'
import '@/assets/nprogress.css'; 


const app = createApp(App)
const pinia = createPinia();

app.use(pinia);
pinia.use(PiniaColadaPlugin);
app.use(Colada);

// app.use(createPinia())
app.use(router)

app.mount('#app')
