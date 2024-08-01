import { MenuItem } from '../components/SearchableMenu'

export const filterAndSortItems = (
  items: MenuItem[],
  search: string,
  selected: MenuItem | null,
) => {
  const compareItems = (a: MenuItem, b: MenuItem) => {
    const aMatch = a.label.match(/^(.*?)(\d+)(.*)$/)
    const bMatch = b.label.match(/^(.*?)(\d+)(.*)$/)

    if (aMatch && bMatch) {
      const [, aPre, aNum, aPost] = aMatch
      const [, bPre, bNum, bPost] = bMatch

      // Comparar la parte antes del número
      const preCompare = aPre.localeCompare(bPre)
      if (preCompare !== 0) return preCompare

      // Comparar los números
      const numCompare = parseInt(aNum) - parseInt(bNum)
      if (numCompare !== 0) return numCompare

      // Comparar la parte después del número
      return aPost.localeCompare(bPost)
    }

    // Si no hay números o solo uno tiene número, usa la comparación de cadenas normal
    return a.label.localeCompare(b.label)
  }

  let sorted = [...items]

  if (selected && !search) {
    sorted = [
      selected,
      ...sorted
        .filter(item => item.value !== selected.value)
        .sort(compareItems),
    ]
  } else {
    sorted.sort(compareItems)
  }

  return sorted.filter(item =>
    item.label.toLowerCase().includes(search.toLowerCase()),
  )
}
