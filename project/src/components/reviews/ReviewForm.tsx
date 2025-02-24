"use client"

import type React from "react"
import { useState } from "react"
import { X } from "lucide-react"
import { useLanguage } from "../../translations/index"

interface ReviewFormProps {
  courseId: number
  onSubmit: (review: { rating: number; comment: string }) => void
  onClose: () => void
}

const ReviewForm: React.FC<ReviewFormProps> = ({ courseId, onSubmit, onClose }) => {
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")
  const { t } = useLanguage()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ rating, comment })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg sm:text-xl font-bold dark:text-white">{t("review.title")}</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
            <X className="w-5 h-5 dark:text-white" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 dark:text-gray-300">{t("review.rating")}</label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  className={`p-2 ${rating >= value ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}`}
                >
                  <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 dark:text-gray-300">{t("review.comment")}</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              rows={4}
              placeholder={t("review.placeholder")}
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              {t("review.submit")}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ReviewForm

