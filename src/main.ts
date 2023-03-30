import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { onAuthStateChanged } from 'firebase/auth'
import './assets/main.less'
import { firebaseAuth } from '@/firebase'
import pinia from '@/stores'

let app: unknown
onAuthStateChanged(firebaseAuth, () => {
  if (!app) app = createApp(App).use(pinia).use(router).mount('#app')
})
