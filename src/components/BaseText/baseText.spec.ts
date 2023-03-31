import { render, screen } from '@testing-library/vue'
import BaseText from './BaseText.vue'

const myText = 'My Text'
const renderBaseText = () => render(BaseText, { slots: { default: myText } })

describe('BaseText', () => {
  it('should render BaseText', () => {
    renderBaseText()
    screen.getByText(myText)
  })
})
