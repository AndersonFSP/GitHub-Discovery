import { createPinia } from 'pinia'
import persistedstatePlugin from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(persistedstatePlugin)

export default pinia
