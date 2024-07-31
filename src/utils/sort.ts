import { MenuItem } from '../components/SearchableMenu'

export const filterAndSortItems = (
  items: MenuItem[],
  search: string,
  selected: MenuItem | null,
) => {
  let sorted = [...items]

  if (selected && !search) {
    sorted = [
      selected,
      ...sorted
        .filter(item => item.value !== selected.value)
        .sort((a, b) => a.label.localeCompare(b.label)),
    ]
  } else {
    sorted.sort((a, b) => a.label.localeCompare(b.label))
  }

  return sorted.filter(item =>
    item.label.toLowerCase().includes(search.toLowerCase()),
  )
}
