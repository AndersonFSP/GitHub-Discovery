import { render, screen } from '@testing-library/vue'
import BaseText from './BaseText.vue'

const myText = 'My Text'
const renderBaseText = () => render(BaseText, { slots: { default: myText } })

describe('BaseText', () => {
  it('should render Link', () => {
    renderBaseText()
    screen.getByText(myText)
  })
})
