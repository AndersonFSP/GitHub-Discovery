import { createTestingPinia } from '@pinia/testing';
import { fireEvent, render, screen } from '@testing-library/vue'
import { repositories } from '@/views/mocks/Discovery'
import Slide from './Slide.vue'
import { usePersistedData } from '@/stores/modules/persistedData'

const props = { title: 'Vue', items: repositories.vue, keyTopic: 'vue' }
const global = { plugins: [createTestingPinia()]}
const renderSlide = () => render(Slide, { props, global })

describe('Slide', () => {
  beforeEach(() => {
    window.open = vi.fn()
    vi.clearAllMocks()
  })
  it('should render Slide', () => {
    renderSlide()
    screen.getByText(props.title)
    screen.getByTestId('slide-button-left')
    screen.getByTestId('slide-button-right')
    expect(screen.getAllByTestId('favorite-icon')).toHaveLength(repositories.vue.length)
    expect(screen.getAllByTestId('slide-image')).toHaveLength(repositories.vue.length)
    expect(screen.getAllByTestId('slide-item')).toHaveLength(repositories.vue.length)
    repositories.vue.forEach(slide => {
      screen.getByText(slide.repositoryName)
    })
  })

  it('should open link on another tab', async () => {
    renderSlide()
    const slideImage = screen.getAllByTestId('slide-image')[0]
    await fireEvent.click(slideImage)
    expect(window.open).toBeCalledWith(repositories.vue[0].link, '_blank')
  })

  it('should update bookmark', async () => {
    renderSlide()
    const { updateBookmark } = usePersistedData()
    const favoreiteIcon = screen.getAllByTestId('favorite-icon')[0]
    await fireEvent.click(favoreiteIcon)
    expect(updateBookmark).toBeCalledWith(repositories.vue[0])
  })

  it('should update sorted filter', async () => {
    renderSlide()
    const { updateSorted } = usePersistedData()
    const filterDropdownItem = screen.getByText('Sort by Star')
    await fireEvent.click(filterDropdownItem)
    expect(updateSorted).toBeCalledWith(props.keyTopic, 'stars')
  })
})
