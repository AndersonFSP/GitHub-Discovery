import { render, screen } from '@testing-library/vue'
import Heading from './Heading.vue'

const myText = 'My Text'
const renderBaseText = () => render(Heading, { slots: { default: myText } })

describe('Heading', () => {
  it('should render Heading', () => {
    renderBaseText()
    screen.getByText(myText)
  })
})
