import React, { useState, useEffect, useRef } from 'react'

import { filterAndSortItems } from '../../utils/sort'

export interface MenuItem {
  label: string
  value: string
}

export interface SearchableMenuProps {
  items: MenuItem[]
  onSelect: (item: MenuItem) => void
  label: string
}

export const SearchableMenu = ({
  items,
  onSelect,
  label,
}: SearchableMenuProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>(items)
  const [activeIndex, setActiveIndex] = useState(-1)
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
  const [isFocused, setIsFocused] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      // Clear close timeout if it exists
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!isOpen) {
      setFilteredItems(filterAndSortItems(items, searchTerm, selectedItem))
    }
  }, [isOpen, items, searchTerm, selectedItem])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    setIsOpen(true)
    setFilteredItems(filterAndSortItems(items, event.target.value, null))
  }

  const handleSelect = (item: MenuItem) => {
    setSelectedItem(item)
    onSelect(item)

    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
    }

    closeTimeoutRef.current = setTimeout(() => {
      setSearchTerm(item.label)
      setIsOpen(false)
    }, 400)
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        setIsOpen(true)
        setActiveIndex(prevIndex =>
          prevIndex < filteredItems.length - 1 ? prevIndex + 1 : prevIndex,
        )
        break
      case 'ArrowUp':
        event.preventDefault()
        setIsOpen(true)
        setActiveIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : prevIndex))
        break
      case 'Enter':
        event.preventDefault()
        if (activeIndex >= 0 && activeIndex < filteredItems.length) {
          handleSelect(filteredItems[activeIndex])
        }
        break
      case 'Escape':
        setIsOpen(false)
        setActiveIndex(-1)
        inputRef.current?.blur()
        break
    }
  }

  const handleInputFocus = () => {
    setIsOpen(true)
    setIsFocused(true)
    setSearchTerm('')
    setFilteredItems(filterAndSortItems(items, '', selectedItem))
  }

  const handleInputBlur = () => {
    setIsFocused(false)
    if (selectedItem) {
      setSearchTerm(selectedItem.label)
    }
  }

  return (
    <div className="relative w-full" ref={menuRef}>
      <div
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-owns={isOpen ? 'search-listbox' : undefined}
        className="relative h-[58px]"
      >
        <label
          id="searchable-menu-label"
          className={`absolute left-4 transition-all duration-200 pointer-events-none text-gray-500
            ${
              isFocused || searchTerm
                ? 'text-xs left-[6px] -top-2 bg-white px-1'
                : 'text-sm top-5'
            }`}
        >
          {label}
        </label>
        <input
          data-testid="textbox"
          ref={inputRef}
          type="text"
          aria-autocomplete="list"
          aria-controls={isOpen ? 'search-listbox' : undefined}
          aria-labelledby="searchable-menu-label"
          aria-activedescendant={
            activeIndex >= 0 && filteredItems.length > 0
              ? `option-${filteredItems[activeIndex].value}`
              : undefined
          }
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none text-sm
            ${isOpen ? 'border-cyan-900' : 'border-gray-300'}
            hover:shadow-md h-[58px]`}
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
        <span className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
          <svg
            className={`w-4 h-4 transition-transform ${isOpen ? 'transform rotate-180 text-black' : 'text-gray-500'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.67}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </div>
      {isOpen ? (
        <ul
          id="search-listbox"
          data-testid="listbox"
          role="listbox"
          className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg max-h-40 overflow-y-auto gap-1 px-1 py-2"
          aria-label="Search results"
        >
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <li
                key={item.value}
                id={`option-${item.value}`}
                role="option"
                aria-selected={item.value === selectedItem?.value}
                className={`px-2 py-1 cursor-pointer text-sm flex items-center justify-between
            ${
              item.value === selectedItem?.value
                ? 'text-black'
                : index === activeIndex
                  ? 'text-gray-800'
                  : 'text-gray-500 hover:text-gray-800'
            }`}
                onClick={() => handleSelect(item)}
              >
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                    className="w-4 h-4 flex-shrink-0"
                  >
                    <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24ZM74.08,197.5a64,64,0,0,1,107.84,0,87.83,87.83,0,0,1-107.84,0ZM96,120a32,32,0,1,1,32,32A32,32,0,0,1,96,120Zm97.76,66.41a79.66,79.66,0,0,0-36.06-28.75,48,48,0,1,0-59.4,0,79.66,79.66,0,0,0-36.06,28.75,88,88,0,1,1,131.52,0Z"></path>
                  </svg>
                  {item.label}
                </div>
                {item.value === selectedItem?.value ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5 text-black"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : null}
              </li>
            ))
          ) : (
            <li className="px-2 py-1 text-sm text-gray-500">
              No items available
            </li>
          )}
        </ul>
      ) : null}
    </div>
  )
}
