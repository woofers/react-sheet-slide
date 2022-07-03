import React from 'react'
import { jest } from '@jest/globals'
import {
  act,
  render,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
  screen
} from '@testing-library/react'
import { Sheet } from '../src'

describe('react-sheet-slide', () => {
  describe('<Sheet />', () => {
    it('Sheet opens', async () => {
      render(<div>hi</div>)
      const element = screen.getByText('hi')
      expect(element).toBeInTheDocument()
    })
  })
})
