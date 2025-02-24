"use client"

import { useState, useRef, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { useLanguage } from "../../context/LanguageContext"
import { useTheme } from "../../context/ThemeContext"
import AuthModal from "../auth/AuthModal"
import { useCart } from "../../context/CartContext"
import CartModal from "../cart/CartModal"
import { User, MessageSquare, FileText, ShoppingCart, Globe, Search, Sun, Moon, Menu, X } from "lucide-react"

interface SearchResult {
  id: string
  title: string
  description: string
  image?: string
  price?: number
  tags: string[]
}

const COURSES: SearchResult[] = [
  {
    id: "1",
    title: "IELTS Preparation Course",
    description: "Get ready for IELTS exam with professional teachers",
    price: 299000,
    image: "/courses/ielts.jpg",
    tags: ["english", "ielts", "exam"],
  },
  {
    id: "2",
    title: "General English Course",
    description: "Learn English from basics to advanced level",
    price: 199000,
    image: "/courses/general.jpg",
    tags: ["english", "general", "beginner"],
  },
  {
    id: "3",
    title: "Business English",
    description: "English for business and professional development",
    price: 399000,
    image: "/courses/business.jpg",
    tags: ["english", "business", "professional"],
  },
  {
    id: "4",
    title: "Beginner English",
    description: "Start learning English from zero",
    price: 149000,
    image: "/courses/beginner.jpg",
    tags: ["english", "beginner", "basic"],
  },
]

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth()
  const { language, setLanguage, t } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const { totalItems } = useCart()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const profileMenuRef = useRef<HTMLDivElement>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false)
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearching(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleLanguageChange = (lang: "uz" | "ru") => {
    setLanguage(lang)
    setIsLangMenuOpen(false)
  }

  const handleSearch = () => {
    if (searchQuery.length > 2) {
      setIsSearching(true)
      const results = COURSES.filter((course) => {
        const searchLower = searchQuery.toLowerCase()
        return (
          course.title.toLowerCase().includes(searchLower) ||
          course.description.toLowerCase().includes(searchLower) ||
          course.tags.some((tag) => tag.includes(searchLower))
        )
      })
      setSearchResults(results)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const handleResultClick = (courseId: string) => {
    setIsSearching(false)
    setSearchQuery("")
    navigate(`/courses/${courseId}`)
  }

  return (
    <header className={`bg-white dark:bg-gray-800 shadow-md fixed w-full top-0 z-50 ${theme === "dark" ? "dark" : ""}`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            Logo
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/courses"
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {("courses")}
            </Link>
            <Link
              to="/about"
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {("about")}
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {("contact")}
            </Link>
            <Link
              to="/jobs"
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {("jobs")}
            </Link>
          </nav>

          {/* Right Side Navigation */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title={theme === "dark" ? ("light") : ("dark")}
            >
              {theme === "dark" ? (
                <Sun className="w-6 h-6 text-gray-700 dark:text-gray-200" />
              ) : (
                <Moon className="w-6 h-6 text-gray-700 dark:text-gray-200" />
              )}
            </button>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 transition-colors"
              >
                <Globe className="w-6 h-6 mr-1" />
                <span>{language === "uz" ? "O'z" : "Ру"}</span>
              </button>

              {isLangMenuOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2">
                  <button
                    onClick={() => handleLanguageChange("uz")}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                      language === "uz" ? "text-blue-600 dark:text-blue-400" : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    O'zbekcha
                  </button>
                  <button
                    onClick={() => handleLanguageChange("ru")}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                      language === "ru" ? "text-blue-600 dark:text-blue-400" : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    Русский
                  </button>
                </div>
              )}
            </div>

            {isAuthenticated && (
              <>
                {/* Cart Button */}
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                  title={("cart")}
                >
                  <ShoppingCart className="w-6 h-6" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </button>

                {/* Chat Button */}
                <Link
                  to="/chat"
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                  title={("chat")}
                >
                  <MessageSquare className="w-6 h-6" />
                </Link>

                {/* CV Button */}
                <Link
                  to="/resume"
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                  title={("cv")}
                >
                  <FileText className="w-6 h-6" />
                </Link>
              </>
            )}

            {/* Auth/Profile Section */}
            {isAuthenticated ? (
              <div className="relative" ref={profileMenuRef}>
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 transition-colors"
                >
                  <User className="w-6 h-6 mr-1" />
                  <span className="hidden md:inline">{user?.email || ("profile")}</span>
                </button>

                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2">
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      {("dashboard")}
                    </Link>
                    <button
                      onClick={() => {
                        logout()
                        setIsProfileMenuOpen(false)
                      }}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      {("logout")}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {("login")}
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700 dark:text-gray-200" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700 dark:text-gray-200" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-200 dark:border-gray-700">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/courses"
                className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {("courses")}
              </Link>
              <Link
                to="/about"
                className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {("about")}
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {("contact")}
              </Link>
              <Link
                to="/jobs"
                className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {("jobs")}
              </Link>
            </nav>

            {/* Mobile Search */}
            <div className="mt-4" ref={searchRef}>
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setIsSearching(false)
                  }}
                  onKeyPress={handleKeyPress}
                  placeholder={("placeholder")}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="w-5 h-5 absolute left-3 text-gray-400" />
                {searchQuery.length > 2 && (
                  <button
                    onClick={handleSearch}
                    className="absolute right-2 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                  >
                    {(".button")}
                  </button>
                )}
              </div>

              {/* Mobile Search Results */}
              {isSearching && searchResults.length > 0 && (
                <div className="mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                  {searchResults.map((result) => (
                    <button
                      key={result.id}
                      onClick={() => {
                        handleResultClick(result.id)
                        setIsMobileMenuOpen(false)
                      }}
                      className="w-full px-4 py-3 flex items-center hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      {result.image && (
                        <img
                          src={result.image || "/placeholder.svg"}
                          alt={result.title}
                          className="w-12 h-12 object-cover rounded mr-4"
                        />
                      )}
                      <div className="text-left">
                        <h3 className="font-medium text-gray-900 dark:text-gray-100">{result.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{result.description}</p>
                        {result.price && (
                          <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                            {result.price.toLocaleString()} so'm
                          </p>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  )
}

export default Header

