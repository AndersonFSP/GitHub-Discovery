import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { onAuthStateChanged } from 'firebase/auth'
import './assets/main.less'
import { firebaseAuth } from '@/firebase'

let app: unknown
onAuthStateChanged(firebaseAuth, () => {
  if (!app)
    app = createApp(App).use(createPinia()).use(router).mount('#app')
})
