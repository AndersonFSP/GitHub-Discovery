import { render, screen, fireEvent } from '@testing-library/vue'
import DropdownList from './DropdownList.vue'

const props = {
  title: 'My Dropdown',
  options: [
    { label: 'Option 1', value: 'option 1' },
    { label: 'Option 2', value: 'option 2' }
  ]
}
interface OverrideProps {
  selected?: string
}
const renderDropdownList = (overrideProps?: OverrideProps) =>
  render(DropdownList, {
    props: {
      ...props,
      ...overrideProps
    }
  })

describe('Button', () => {
  beforeEach(() => vi.clearAllMocks())
  it('should render DropdownList', () => {
    renderDropdownList()
    screen.getByText(props.title)
    const listItems = screen.getAllByTestId('list-item')
    expect(listItems).toHaveLength(props.options.length)
    listItems.forEach((item, index) => {
      const label = props.options[index].label
      screen.getByText(label)
    })
  })

  it('should have the correct icon when dropdown is open and closed', async () => {
    renderDropdownList()
    const icon = screen.getByTestId('dropdown-icon')
    expect(icon).toHaveClass('fa-chevron-down')
    await fireEvent.click(icon)
    expect(icon).toHaveClass('fa-chevron-up')
  })

  it('should have active class when item is selected', async () => {
    renderDropdownList()
    const { label } = props.options[0]
    const item = screen.getByText(label)
    expect(item).not.toHaveClass('active')
    await fireEvent.click(item)
    expect(item).toHaveClass('active')
  })

  it('should have active class when item is selected', async () => {
    renderDropdownList({ selected: 'option 2' })
    const item = screen.getByText('Option 2')
    expect(item).toHaveClass('active')
  })

  it('should emitt event on change', async () => {
    const { emitted } = renderDropdownList()
    const { label, value } = props.options[0]
    const item = screen.getByText(label)
    await fireEvent.click(item)
    expect(emitted('on-change')).toEqual([[value]])
  })
})
