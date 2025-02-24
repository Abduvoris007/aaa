import type React from "react"
import { useNavigate } from "react-router-dom"
import { useTheme } from "../../context/ThemeContext"
import { ArrowLeft } from "lucide-react"

const BackButton: React.FC = () => {
  const navigate = useNavigate()
  const { theme } = useTheme()

  return (
    <button
      onClick={() => navigate(-1)}
      className={`flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 mb-4 transition-colors duration-200 ${
        theme === "dark" ? "dark" : ""
      }`}
      aria-label="Orqaga"
    >
      <ArrowLeft className="h-5 w-5" />
      <span className="text-sm md:text-base">Orqaga</span>
    </button>
  )
}

export default BackButton

