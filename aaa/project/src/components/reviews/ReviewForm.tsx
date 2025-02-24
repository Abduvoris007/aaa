"use client"

import type React from "react"
import { useState } from "react"
import { X } from "lucide-react"

interface ReviewFormProps {
  courseId: number
  onSubmit: (review: { rating: number; comment: string }) => void
  onClose: () => void
}

const ReviewForm: React.FC<ReviewFormProps> = ({ courseId, onSubmit, onClose }) => {
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ rating, comment })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 text-white rounded-lg p-6 max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Fikr qoldirish</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-700 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Baholash</label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  className={`p-2 ${rating >= value ? "text-yellow-400" : "text-gray-500"}`}
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Fikringiz</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-2 border rounded-lg bg-gray-700 text-white border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={4}
              placeholder="Kurs haqida fikringizni yozing..."
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Yuborish
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ReviewForm

