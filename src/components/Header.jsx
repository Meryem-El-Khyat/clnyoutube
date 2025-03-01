"use client"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toggleTheme } from "../redux/slices/themeSlice"
import { setSearchQuery } from "../redux/slices/searchSlice"
import { Moon, Sun, Search } from "lucide-react"

export default function Header() {
  const dispatch = useDispatch()
  const isDarkMode = useSelector((state) => state.theme.darkMode)
  const [searchInput, setSearchInput] = useState("")

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value)
    dispatch(setSearchQuery(e.target.value))
  }

  return (
    <header className="h-16 bg-white dark:bg-gray-800 shadow-md flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-primary dark:text-primary-foreground">VideoHub</h1>
      </div>

      <div className="flex-1 max-w-xl mx-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </div>
          <input
            type="text"
            value={searchInput}
            onChange={handleSearchChange}
            placeholder="Search playlists or videos..."
            className="w-full py-2 pl-10 pr-4 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <button
        onClick={() => dispatch(toggleTheme())}
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        aria-label="Toggle theme"
      >
        {isDarkMode ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-gray-700" />}
      </button>
    </header>
  )
}

