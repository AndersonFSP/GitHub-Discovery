import { render, screen, fireEvent } from '@testing-library/vue'
import Button from './Button.vue'

interface Props {
  disabled?: boolean
}
const label = 'label'
const listenerMock = vi.fn()
const renderButton = (props: Props = {}) => render(Button, { props: { label, ...props } })

describe('Button', () => {
  beforeEach(() => vi.clearAllMocks())
  it('should render Button', () => {
    renderButton()
    const button = screen.getByText(label)
    expect(button).not.toBeDisabled()
  })

  it('should emitt click', async () => {
    renderButton()
    const button = screen.getByText(label)
    button.addEventListener('click', listenerMock)
    await fireEvent.click(button)
    expect(listenerMock).toHaveBeenCalled()
  })

  it('should button be disabled', async () => {
    renderButton({ disabled: true })
    const button = screen.getByText(label)
    expect(button).toBeDisabled()
  })
})
