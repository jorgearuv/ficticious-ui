import type { Meta, StoryObj } from '@storybook/react'
import { SearchableMenu, MenuItem } from './SearchableMenu'

const meta = {
  title: 'SearchableMenu',
  component: SearchableMenu,
  tags: ['autodocs'],
  argTypes: {
    onSelect: (item: MenuItem) => console.log('Selected:', item),
  },
} satisfies Meta<typeof SearchableMenu>

export default meta
type Story = StoryObj<typeof meta>

const items = [
  { value: 'max', label: 'Max Mendez' },
  { value: 'victor', label: 'Victor Díaz' },
  { value: 'jesus', label: 'Jesús Millán' },
]

export const Default: Story = {
  args: {
    items,
    label: 'Elige un usuario',
    onSelect: (item: MenuItem) => console.log('Selected:', item),
  },
}

export const WithManyItems: Story = {
  args: {
    items: Array.from({ length: 1000 }, (_, i) => ({
      label: `Item ${i + 1}`,
      value: `item-${i + 1}`,
    })),
    label: 'Select an item',
    onSelect: item => console.log('Selected:', item),
  },
}

export const EmptyList: Story = {
  args: {
    items: [],
    label: 'Elige un usuario',
    onSelect: item => console.log('Selected:', item),
  },
}
