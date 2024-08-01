import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import { SearchableMenu, SearchableMenuProps } from '../SearchableMenu'
import userEvent from '@testing-library/user-event'

const mockItems = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
]

const defaultProps: SearchableMenuProps = {
  items: [],
  onSelect: vi.fn(),
  label: 'Select a fruit',
}

describe('SearchableMenu', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('renders with the correct label', () => {
    render(<SearchableMenu {...defaultProps} items={mockItems} />)
    expect(screen.getByLabelText('Select a fruit')).toBeInTheDocument()
  })

  it('opens the menu on input focus', async () => {
    const user = userEvent.setup()
    render(<SearchableMenu {...defaultProps} />)
    const input = screen.getByRole('combobox')
    await user.click(input)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('filters items based on input', async () => {
    const user = userEvent.setup()
    render(<SearchableMenu {...defaultProps} />)
    const input = screen.getByRole('combobox')
    await user.click(input)
    await user.type(input, 'a')
    await user.type(input, 'p')
    await user.type(input, 'p')

    expect(screen.queryByText('Banana')).not.toBeInTheDocument()
    waitFor(() => expect(screen.getByText('Apple')).toBeInTheDocument())
  })

  it('selects an item when clicked', async () => {
    const user = userEvent.setup()
    render(<SearchableMenu {...defaultProps} items={mockItems} />)
    const input = screen.getByTestId('textbox')
    await user.click(input)

    await waitFor(() => {
      expect(screen.getByTestId('listbox')).toBeInTheDocument()
    })

    const appleOption = screen.getByText('Apple')
    await user.click(appleOption)

    await waitFor(() => {
      expect(defaultProps.onSelect).toHaveBeenCalledWith({
        label: 'Apple',
        value: 'apple',
      })
      expect(input).toHaveValue('Apple')
    })
  })

  it('navigates through items with arrow keys', async () => {
    const user = userEvent.setup()
    render(<SearchableMenu {...defaultProps} items={mockItems} />)
    const input = screen.getByTestId('textbox')
    await user.click(input)

    await waitFor(() => {
      expect(screen.getByTestId('listbox')).toBeInTheDocument()
    })

    await user.keyboard('{ArrowDown}')
    await user.keyboard('{ArrowDown}')
    await user.keyboard('{Enter}')

    await waitFor(() => {
      expect(defaultProps.onSelect).toHaveBeenCalledWith({
        label: 'Banana',
        value: 'banana',
      })
    })
  })

  it('closes the menu when clicking outside', async () => {
    const user = userEvent.setup()
    render(
      <div>
        <SearchableMenu {...defaultProps} items={mockItems} />
        <div data-testid="outside">Outside</div>,
      </div>,
    )
    const input = screen.getByTestId('textbox')
    await user.click(input)

    await waitFor(() => {
      expect(screen.getByTestId('listbox')).toBeInTheDocument()
    })

    fireEvent.mouseDown(screen.getByTestId('outside'))

    await waitFor(() =>
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument(),
    )
  })

  it('displays "No items available" when no items match the search', async () => {
    const user = userEvent.setup()
    render(<SearchableMenu {...defaultProps} items={mockItems} />)
    const input = screen.getByTestId('textbox')
    await user.click(input)

    await waitFor(() => {
      expect(screen.getByTestId('listbox')).toBeInTheDocument()
    })

    user.type(input, 'xyz')

    await waitFor(() => {
      expect(screen.getByText('No items available')).toBeInTheDocument()
    })
  })
})
