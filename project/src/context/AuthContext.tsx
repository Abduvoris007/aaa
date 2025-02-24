"use client"

import type React from "react"
import { createContext, useContext, useState, type ReactNode } from "react"
import { Language } from "../translations/index"
interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  englishLevel: string
}

interface RegisterData {
  firstName: string
  lastName: string
  email: string
  password: string
  phone: string
  address: string
  englishLevel: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { t } = Language // Moved useLanguage hook call to the top level
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const login = async (email: string, password: string) => {
    try {
      // API call imitatsiyasi
      const mockUser = {
        id: "1",
        firstName: "Test",
        lastName: "User",
        email: email,
        phone: "",
        address: "",
        englishLevel: "",
      }
      setUser(mockUser)
      setIsAuthenticated(true)
    } catch (error) {
      console.error(t("auth.errors.loginError"), error)
      throw error
    }
  }

  const register = async (data: RegisterData) => {
    try {
      // API call imitatsiyasi
      const mockUser = {
        id: "1",
        ...data,
      }
      setUser(mockUser)
      setIsAuthenticated(true)
    } catch (error) {
      console.error(t("auth.errors.registrationError"), error)
      throw error
    }
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated }}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error(Language.t("auth.errors.useAuthError"))
  }
  return context
}

export default AuthContext
