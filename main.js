import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '../src/assets/css/rest.css'
import '@/assets/font/iconfont.css'

// element-plus
import 'element-plus/theme-chalk/base.css'

createApp(App).use(store).use(router).mount('#app')