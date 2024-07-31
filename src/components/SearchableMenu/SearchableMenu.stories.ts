import type { Meta, StoryObj } from '@storybook/react'
import { SearchableMenu, MenuItem } from './SearchableMenu'

const meta = {
  title: 'SearchableMenu',
  component: SearchableMenu,
  parameters: {
    layout: 'centered',
  },
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
    items: items,
    label: 'Elige un usuario',
    onSelect: (item: MenuItem) => console.log('Selected:', item),
  },
}

export const WithManyItems: Story = {
  args: {
    items: [
      ...items,
      { value: 'ana', label: 'Ana García' },
      { value: 'carlos', label: 'Carlos Rodríguez' },
      { value: 'laura', label: 'Laura Fernández' },
      { value: 'diego', label: 'Diego Morales' },
      { value: 'sofia', label: 'Sofía Pérez' },
      { value: 'maria', label: 'María López' },
      { value: 'javier', label: 'Javier Martínez' },
    ],
    label: 'Elige un usuario',
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
