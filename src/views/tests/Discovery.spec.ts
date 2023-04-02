import { fireEvent, render, screen, within } from '@testing-library/vue'
import Discovery from '@/views/Discovery.vue'
import { createTestingPinia } from '@pinia/testing'
import { createRouter, createWebHistory } from 'vue-router'
import { defineComponent } from 'vue'
import { repositories } from '../mocks/Discovery'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '',
      component: defineComponent({ template: `<div></div>` }),
      name: 'login'
    },
    {
      path: '/discovery',
      component: defineComponent({ template: `<div></div>` }),
      name: 'discovery'
    },
    {
      path: '/register',
      component: defineComponent({ template: `<div></div>` }),
      name: 'register'
    }
  ]
})
const options = [
  { label: 'Vue', value: 'vue' },
  { label: 'Javascript', value: 'javascript' },
  { label: 'Typescript', value: 'typescript' },
  { label: 'Go', value: 'go' },
  { label: 'CSS', value: 'css' },
  { label: 'Node', value: 'node' }
]
const persistedData = {
  bookmarks: [],
  topics: ['vue', 'javascript'],
  sorteds: { vue: '', javascript: '', typescript: '', go: '', css: '', node: '' }
}
const renderDiscovery = () =>
  render(Discovery, {
    global: { plugins: [createTestingPinia({ initialState: { persistedData } }), router] }
  })

describe('Login', () => {
  it('should render Discovery', () => {
    renderDiscovery()
    screen.getByText('My Bookmarks')
    screen.getByText('Toggle topics to show')
    const filterList = screen.getAllByTestId('filter-list-item')
    filterList.forEach((filterItem, index) => {
      const { label } = options[index]
      within(filterItem).getByText(label)
    })

    screen.getByText('Vue')
  })

  it('should show vue slide when this topic is slected', async () => {
    renderDiscovery()
    await fireEvent.click(screen.getByText('Vue'))
    screen.getByTestId('dropdown-list')

    repositories.vue.forEach((vueRepositories) => {
      screen.getByText(vueRepositories.repositoryName)
    })
  })
})
