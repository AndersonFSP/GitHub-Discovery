import { render, screen, fireEvent } from '@testing-library/vue'
import FormBox from './FormBox.vue'

const myText = 'My Text'
const title = 'Register'
const renderFormBox = () => render(FormBox, { props: { title }, slots: { default: myText, button: '<button>Submit</button>' } })

describe('FormBox', () => {
  it('should render FormBox', () => {
    renderFormBox()
    screen.getByText(title)
    screen.getByText(myText)
    screen.getByText('Submit')
  })

  it('should emitt event on sumbit', async () => {
    const { emitted } = renderFormBox()
    const button = screen.getByText('Submit')
    await fireEvent.click(button)
    expect(emitted('on-submit')).toBeDefined()
  })
})
