"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, type ReactNode, useCallback } from "react"
import { useLanguage } from "../translations/index"

// Cart item interfeysi
export interface CartItem {
  id: number
  title: string
  price: string
  duration: string
  level: string
  image: string
}

// Cart context interfeysi
interface CartContextType {
  items: CartItem[]
  totalItems: number
  totalPrice: number
  addItem: (item: CartItem) => void
  removeItem: (id: number) => void
  clearCart: () => void
  isInCart: (id: number) => boolean
  updateItemQuantity: (id: number, quantity: number) => void
  purchasedCourses: any[]
  addPurchasedCourse: (course: any) => void
  removePurchasedCourse: (id: number) => void
  isPurchased: (id: number) => boolean
}

// Cart context yaratish
const CartContext = createContext<CartContextType | undefined>(undefined)

// Local storage key
const CART_STORAGE_KEY = "shopping_cart"
const PURCHASED_COURSES_STORAGE_KEY = "purchased_courses"

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Removed the unused useLanguage hook call
  // const { t } = useLanguage()

  // Local storage dan cart ma'lumotlarini olish
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY)
      return savedCart ? JSON.parse(savedCart) : []
    }
    return []
  })

  // Local Storage dan sotib olingan kurslar ma'lumotlarini olish
  const [purchasedCourses, setPurchasedCourses] = useState<any[]>(() => {
    if (typeof window !== "undefined") {
      const savedPurchases = localStorage.getItem(PURCHASED_COURSES_STORAGE_KEY)
      return savedPurchases ? JSON.parse(savedPurchases) : []
    }
    return []
  })

  // Calculate total items
  const totalItems = items.length

  // Item cart da borligini tekshirish
  const isInCart = useCallback(
    (id: number) => {
      return items.some((item) => item.id === id)
    },
    [items],
  )

  // Cart ga yangi item qo'shish
  const addItem = useCallback(
    (item: CartItem) => {
      if (!isInCart(item.id)) {
        const updatedItems = [...items, item]
        setItems(updatedItems)
        if (typeof window !== "undefined") {
          localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedItems))
        }
      }
    },
    [items, isInCart],
  ) // Added isInCart to dependencies

  // Cart dan item ni o'chirish
  const removeItem = useCallback(
    (id: number) => {
      const updatedItems = items.filter((item) => item.id !== id)
      setItems(updatedItems)
      if (typeof window !== "undefined") {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedItems))
      }
    },
    [items],
  )

  // Cart ni tozalash
  const clearCart = useCallback(() => {
    setItems([])
    if (typeof window !== "undefined") {
      localStorage.removeItem(CART_STORAGE_KEY)
    }
  }, [])

  // Item miqdorini yangilash
  const updateItemQuantity = useCallback(
    (id: number, quantity: number) => {
      if (quantity < 1) {
        removeItem(id)
        return
      }

      const updatedItems = items.map((item) => (item.id === id ? { ...item, quantity } : item))
      setItems(updatedItems)
      if (typeof window !== "undefined") {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedItems))
      }
    },
    [items, removeItem],
  )

  // Jami narx
  const totalPrice = items.reduce((sum, item) => {
    const price = Number.parseInt(item.price.replace(/[^0-9]/g, ""))
    return sum + price
  }, 0)

  // Kurs sotib olish
  const addPurchasedCourse = useCallback(
    (course: any) => {
      if (!purchasedCourses.some((c) => c.id === course.id)) {
        setPurchasedCourses([...purchasedCourses, course])
        // Kurs sotib olinganda savatdan olib tashlanadi
        removeItem(course.id)
      }
    },
    [purchasedCourses, removeItem],
  )

  // Sotib olingan kursni o'chirish
  const removePurchasedCourse = useCallback(
    (id: number) => {
      setPurchasedCourses(purchasedCourses.filter((course) => course.id !== id))
    },
    [purchasedCourses],
  )

  // Kurs sotib olinganligini tekshirish
  const isPurchased = useCallback(
    (id: number) => {
      return purchasedCourses.some((course) => course.id === id)
    },
    [purchasedCourses],
  )

  // Ma'lumotlarni Local Storage ga saqlash
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
      localStorage.setItem(PURCHASED_COURSES_STORAGE_KEY, JSON.stringify(purchasedCourses))
    }
  }, [items, purchasedCourses])

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        totalPrice,
        addItem,
        removeItem,
        clearCart,
        isInCart,
        updateItemQuantity,
        purchasedCourses,
        addPurchasedCourse,
        removePurchasedCourse,
        isPurchased,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

// Custom hook
export const useCart = () => {
  const context = useContext(CartContext)
  const { t } = useLanguage() // Moved useLanguage call here
  if (context === undefined) {
    throw new Error(t("cart.errors.useCartError")) // Use t directly
  }
  return context
}

