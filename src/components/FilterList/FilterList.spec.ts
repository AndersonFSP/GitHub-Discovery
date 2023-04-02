import { fireEvent, render, screen } from '@testing-library/vue'
import FilterList from './FilterList.vue'

const options = [
  { label: 'Vue', value: 'vue' },
  { label: 'Typescript', value: 'typescript' }
]
const title = 'My title'
const props = { options, title, checked: [] }
interface overrideProps {
  checked: string[]
}
const renderFilterList = (overrideProps?: overrideProps) =>
  render(FilterList, {
    props: {
      ...props,
      ...overrideProps
    }
  })

describe('FilterList', () => {
  beforeEach(() => vi.clearAllMocks())
  it('should render FilterList', () => {
    renderFilterList()
    screen.getByText(title)
    options.forEach((option) => {
      screen.getByText(option.label)
    })
  })

  it('should emitt event on click filters', async () => {
    const { emitted } = renderFilterList()
    const option = screen.getByText(options[0].label)
    await fireEvent.click(option)
    expect(emitted('on-change')[0]).toEqual([['vue']])

    const option2 = screen.getByText(options[1].label)
    await fireEvent.click(option2)
    expect(emitted('on-change')[1]).toEqual([['vue', 'typescript']])
  })

  it('should emitt event on click filters', async () => {
    const { emitted } = renderFilterList({ checked: ['vue'] })
    const option = screen.getByText(options[0].label)
    await fireEvent.click(option)
    expect(emitted('on-change')[0]).toEqual([['vue']])
  })
})
