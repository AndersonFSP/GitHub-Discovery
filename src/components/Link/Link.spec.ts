import { render, screen } from '@testing-library/vue'
import Link from './Link.vue'

const myLink = 'My Link' 
const renderLink = () => render(Link, { slots: { default: myLink  }})

describe('Link', () => {
  it('should render Link', () => {
    renderLink()
    screen.getByText(myLink)
  })
})
