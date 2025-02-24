"use client"

import type React from "react"
import { useState } from "react"
import { useCart } from "../../context/CartContext"
import { useLanguage } from "../../context/LanguageContext"
import { useTheme } from "../../context/ThemeContext"
import { useNavigate } from "react-router-dom"
import { X } from "lucide-react"

interface CartModalProps {
  isOpen: boolean
  onClose: () => void
}

type PaymentMethod = "click" | "payme" | "bank" | "cash"

interface PaymentDetails {
  click?: {
    cardNumber: string
    phone: string
    verificationCode?: string
  }
  payme?: {
    cardNumber: string
    expiry: string
    verificationCode?: string
  }
  bank?: {
    fullName: string
    passport: string
    bankAccount: string
  }
  cash?: {
    location: string
    preferredTime: string
    fullName: string
    phone: string
  }
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const { items, removeItem, clearCart, totalPrice } = useCart()
  const { t } = useLanguage()
  const { theme } = useTheme()
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({})
  const [verificationSent, setVerificationSent] = useState(false)
  const navigate = useNavigate()

  if (!isOpen) return null

  const handleCheckout = () => {
    onClose()
    navigate("/dashboard", { state: { activeTab: "payments" } })
  }

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      clearCart()
      onClose()
    } catch (error) {
      console.error("Payment error:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  const renderPaymentForm = () => {
    switch (selectedPayment) {
      case "click":
        return (
          <form onSubmit={handlePaymentSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Karta raqami</label>
              <input
                type="text"
                placeholder="8600 **** **** ****"
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Telefon raqam</label>
              <input
                type="tel"
                placeholder="+998 ** *** ** **"
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            {!verificationSent ? (
              <button
                type="button"
                onClick={() => setVerificationSent(true)}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Tasdiqlash kodini olish
              </button>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-gray-300">Tasdiqlash kodi</label>
                  <input
                    type="text"
                    placeholder="SMS orqali yuborilgan kod"
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors"
                >
                  {isProcessing ? "To'lov amalga oshirilmoqda..." : "To'lash"}
                </button>
              </>
            )}
          </form>
        )

      case "payme":
        return (
          <form onSubmit={handlePaymentSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Karta raqami</label>
              <input
                type="text"
                placeholder="8600 **** **** ****"
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Telefon raqam</label>
              <input
                type="tel"
                placeholder="+998 ** *** ** **"
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            {!verificationSent ? (
              <button
                type="button"
                onClick={() => setVerificationSent(true)}
                className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition-colors"
              >
                Tasdiqlash kodini olish
              </button>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-gray-300">Tasdiqlash kodi</label>
                  <input
                    type="text"
                    placeholder="SMS orqali yuborilgan kod"
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition-colors"
                >
                  {isProcessing ? "To'lov amalga oshirilmoqda..." : "To'lash"}
                </button>
              </>
            )}
          </form>
        )

      case "bank":
        return (
          <form onSubmit={handlePaymentSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">To'liq ism</label>
              <input
                type="text"
                placeholder="Familiya Ism Sharif"
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Passport seriyasi va raqami</label>
              <input
                type="text"
                placeholder="AA 1234567"
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <div>
              <h4 className="font-medium mb-2 dark:text-gray-300">Bank rekvizitlari:</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Bank: Example Bank</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Hisob raqam: 1234 5678 9012 3456</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">MFO: 12345</p>
            </div>
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700 transition-colors dark:bg-gray-600 dark:hover:bg-gray-500"
            >
              To'lov chekini yuklash
            </button>
          </form>
        )

      case "cash":
        return (
          <form onSubmit={handlePaymentSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">To'liq ism</label>
              <input
                type="text"
                placeholder="Familiya Ism Sharif"
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Telefon raqam</label>
              <input
                type="tel"
                placeholder="+998 ** *** ** **"
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Filial</label>
              <select
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              >
                <option value="">Filialni tanlang</option>
                <option value="chilonzor">Chilonzor filiali</option>
                <option value="yunusobod">Yunusobod filiali</option>
                <option value="sergeli">Sergeli filiali</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Qulay vaqt</label>
              <select
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              >
                <option value="">Vaqtni tanlang</option>
                <option value="morning">09:00 - 12:00</option>
                <option value="afternoon">14:00 - 17:00</option>
                <option value="evening">17:00 - 19:00</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors"
            >
              Tasdiqlash
            </button>
          </form>
        )

      default:
        return null
    }
  }

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 ${theme === "dark" ? "dark" : ""}`}
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md max-h-[90vh] overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold dark:text-white">Savat</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            title="Yopish"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto max-h-[calc(90vh-10rem)]">
          {items.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">Savat bo'sh</p>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium dark:text-white">{item.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.level}</p>
                    <p className="text-blue-600 dark:text-blue-400">{item.price}</p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                    title="O'chirish"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium dark:text-white">Jami:</span>
              <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                {totalPrice.toLocaleString()} so'm
              </span>
            </div>

            {!selectedPayment ? (
              <div className="space-y-3">
                <h3 className="font-medium mb-2 dark:text-white">To'lov usulini tanlang:</h3>
                <button
                  onClick={() => setSelectedPayment("click")}
                  className="w-full flex items-center justify-between p-3 border rounded hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-white transition-colors"
                >
                  <span>Click</span>
                  <img src="/images/click.png" alt="Click" className="h-8" />
                </button>
                <button
                  onClick={() => setSelectedPayment("payme")}
                  className="w-full flex items-center justify-between p-3 border rounded hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-white transition-colors"
                >
                  <span>Payme</span>
                  <img src="/images/payme.png" alt="Payme" className="h-8" />
                </button>
                <button
                  onClick={() => setSelectedPayment("bank")}
                  className="w-full flex items-center justify-between p-3 border rounded hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-white transition-colors"
                >
                  <span>Bank o'tkazmasi</span>
                  <span className="text-gray-500 dark:text-gray-400">🏦</span>
                </button>
                <button
                  onClick={() => setSelectedPayment("cash")}
                  className="w-full flex items-center justify-between p-3 border rounded hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-white transition-colors"
                >
                  <span>Naqd pul</span>
                  <span className="text-gray-500 dark:text-gray-400">💵</span>
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <button
                  onClick={() => {
                    setSelectedPayment(null)
                    setVerificationSent(false)
                  }}
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  ← Orqaga
                </button>
                {renderPaymentForm()}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default CartModal

