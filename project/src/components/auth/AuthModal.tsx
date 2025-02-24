"use client"

import type React from "react"
import { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { useTheme } from "../../context/ThemeContext"
import { X } from "lucide-react"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  customMessage?: string
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, customMessage }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [englishLevel, setEnglishLevel] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loginSurname, setLoginSurname] = useState("")
  const [loginFirstName, setLoginFirstName] = useState("")
  const [loginPhoneNumber, setLoginPhoneNumber] = useState("")
  const [loginResidence, setLoginResidence] = useState("")
  const [formData, setFormData] = useState({
    surname: "",
    firstName: "",
    phoneNumber: "",
    residence: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { login, register } = useAuth()
  const { theme } = useTheme()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (isLogin) {
        await login(email, password)
        setFormData({
          surname: loginSurname,
          firstName: loginFirstName,
          phoneNumber: loginPhoneNumber,
          residence: loginResidence,
        })
      } else {
        await register({
          firstName,
          lastName,
          email,
          password,
          phone,
          address,
          englishLevel,
        })
        setFormData({
          surname: lastName,
          firstName,
          phoneNumber: phone,
          residence: address,
        })
      }
      setIsSubmitted(true)
      onClose()
      // Reset form fields
      setFirstName("")
      setLastName("")
      setEmail("")
      setPassword("")
      setPhone("")
      setAddress("")
      setEnglishLevel("")
      setLoginSurname("")
      setLoginFirstName("")
      setLoginPhoneNumber("")
      setLoginResidence("")
    } catch (error) {
      console.error("Auth error:", error)
    }
  }

  if (!isOpen) return null

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 ${theme === "dark" ? "dark" : ""}`}
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full relative overflow-y-auto max-h-[90vh]">
        {customMessage && (
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded">
            {customMessage}
          </div>
        )}

        <h2 className="text-2xl font-bold mb-6 dark:text-white">{isLogin ? "Tizimga Kirish" : "Ro'yxatdan O'tish"}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isLogin ? (
            <>
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">Familiya</label>
                <input
                  type="text"
                  value={loginSurname}
                  onChange={(e) => setLoginSurname(e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">Ism</label>
                <input
                  type="text"
                  value={loginFirstName}
                  onChange={(e) => setLoginFirstName(e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">Telefon Raqami</label>
                <input
                  type="tel"
                  value={loginPhoneNumber}
                  onChange={(e) => setLoginPhoneNumber(e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">Turar Joy</label>
                <input
                  type="text"
                  value={loginResidence}
                  onChange={(e) => setLoginResidence(e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">Ism</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                  placeholder="Ismingizni kiriting"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">Familiya</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                  placeholder="Familiyangizni kiriting"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">Telefon raqam</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                  placeholder="+998 XX XXX XX XX"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">Manzil</label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                  placeholder="To'liq manzilingizni kiriting"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">Ingliz tili darajasi</label>
                <select
                  value={englishLevel}
                  onChange={(e) => setEnglishLevel(e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                >
                  <option value="">Tanlang</option>
                  <option value="beginner">Boshlang'ich (Beginner)</option>
                  <option value="elementary">Elementary (A1)</option>
                  <option value="preIntermediate">Pre-Intermediate (A2)</option>
                  <option value="intermediate">Intermediate (B1)</option>
                  <option value="upperIntermediate">Upper-Intermediate (B2)</option>
                  <option value="advanced">Advanced (C1)</option>
                  <option value="proficiency">Proficiency (C2)</option>
                </select>
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Parol</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
          >
            {isLogin ? "Kirish" : "Ro'yxatdan O'tish"}
          </button>
        </form>

        {isSubmitted && (
          <div className="mt-4 p-4 bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-200 rounded">
            <h3 className="font-bold mb-2">Shaxsiy Ma'lumotlar</h3>
            <p>Familiya: {formData.surname}</p>
            <p>Ism: {formData.firstName}</p>
            <p>Telefon Raqami: {formData.phoneNumber}</p>
            <p>Turar Joy: {formData.residence}</p>
          </div>
        )}

        <button onClick={() => setIsLogin(!isLogin)} className="mt-4 text-blue-600 dark:text-blue-400 hover:underline">
          {isLogin ? "Ro'yxatdan o'tish uchun bu yerga bosing" : "Kirish uchun bu yerga bosing"}
        </button>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}

export default AuthModal

