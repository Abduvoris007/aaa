"use client"

import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useCart } from "../context/CartContext"
import { useLanguage } from "../context/LanguageContext"
import AuthModal from "../components/auth/AuthModal"
import { Link } from "react-router-dom"
import BackButton from "../components/common/BackButton"

interface Course {
  id: number
  title: string
  level: string
  duration: string
  price: string
  description: string
  image: string
  category: string
}

const Courses = () => {
  const { isAuthenticated } = useAuth()
  const { t } = useLanguage()
  const { addItem, isInCart } = useCart()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>("all")

  const courses: Course[] = [
    // Til kurslari
    {
      id: 1,
      title: "General English Online",
      level: "Beginner (A1)",
      duration: "3 oy",
      price: "300,000 so'm/oy",
      description:
        "Zoom orqali jonli darslar, interaktiv mashg'ulotlar va individual yondashuv bilan ingliz tilini online o'rganing.",
      image: "/images/general-english.jpg",
      category: "language",
    },
    {
      id: 2,
      title: "IELTS Online Preparation",
      level: "Intermediate (B1+)",
      duration: "4 oy",
      price: "450,000 so'm/oy",
      description:
        "IELTS imtihoniga online tayyorgarlik. Mock testlar va individual feedback. Band score 7.0+ kafolati.",
      image: "/images/ielts-prep.jpg",
      category: "language",
    },
    {
      id: 3,
      title: "Business English Online",
      level: "Upper-Intermediate (B2)",
      duration: "3 oy",
      price: "400,000 so'm/oy",
      description: "Biznes ingliz tilini online o'rganing. Virtual biznes muhitda muloqot va taqdimot ko'nikmalari.",
      image: "/images/business-english.jpg",
      category: "language",
    },
    {
      id: 4,
      title: "Virtual Speaking Club",
      level: "All Levels",
      duration: "1 oy",
      price: "200,000 so'm/oy",
      description: "Native speaker bilan Zoom orqali jonli muloqot va suhbat amaliyoti. Har kuni yangi mavzular.",
      image: "/images/speaking-club.jpg",
      category: "language",
    },
    {
      id: 5,
      title: "Grammar Intensive Online",
      level: "Elementary (A2)",
      duration: "2 oy",
      price: "250,000 so'm/oy",
      description: "Grammatikani online formatda chuqur o'rganish. Video darslar va interaktiv mashqlar.",
      image: "/images/grammar.jpg",
      category: "language",
    },
    {
      id: 6,
      title: "Kids English Online",
      level: "Beginner",
      duration: "6 oy",
      price: "250,000 so'm/oy",
      description:
        "6-12 yoshli bolalar uchun maxsus online kurs. O'yin va multimedialar orqali ingliz tilini o'rganish.",
      image: "/images/kids-english.jpg",
      category: "language",
    },
    // IT kurslari
    {
      id: 7,
      title: "Full Stack Web Development",
      level: "Beginner to Advanced",
      duration: "6 oy",
      price: "800,000 so'm/oy",
      description:
        "Zamonaviy web dasturlash texnologiyalari (React, Node.js, TypeScript). Real loyihalar va portfolio yaratish.",
      image: "/images/web-development.jpg",
      category: "it",
    },
    {
      id: 8,
      title: "Mobile App Development",
      level: "Intermediate",
      duration: "4 oy",
      price: "900,000 so'm/oy",
      description:
        "React Native va Flutter orqali mobil ilovalar yaratishni o'rganing. App Store va Play Market uchun loyihalar.",
      image: "/images/mobile-dev.jpg",
      category: "it",
    },
    {
      id: 9,
      title: "UI/UX Design",
      level: "Beginner",
      duration: "3 oy",
      price: "600,000 so'm/oy",
      description: "Figma, Adobe XD va Sketch dasturlarida interfeys dizayni. User Research va Prototyping.",
      image: "/images/ui-ux.jpg",
      category: "it",
    },
    {
      id: 10,
      title: "Data Science va AI",
      level: "Advanced",
      duration: "5 oy",
      price: "1,000,000 so'm/oy",
      description: "Python, Machine Learning va Deep Learning asoslari. Real data science loyihalar va portfolio.",
      image: "/images/data-science.jpg",
      category: "it",
    },
    {
      id: 11,
      title: "Cyber Security",
      level: "Intermediate to Advanced",
      duration: "4 oy",
      price: "900,000 so'm/oy",
      description:
        "Xavfsizlik audit, penetration testing va xavfsizlik protokollari. Ethical hacking va himoya usullari.",
      image: "/images/cyber-security.jpg",
      category: "it",
    },
    {
      id: 12,
      title: "DevOps Engineering",
      level: "Advanced",
      duration: "4 oy",
      price: "950,000 so'm/oy",
      description:
        "Docker, Kubernetes, CI/CD va Cloud platformalar. Zamonaviy DevOps amaliyotlari va avtomatlashtirish.",
      image: "/images/devops.jpg",
      category: "it",
    },
  ]

  const categories = [
    { id: "all", name: "Barcha kurslar" },
    { id: "language", name: "Til kurslari" },
    { id: "it", name: "IT kurslari" },
  ]

  const filteredCourses =
    activeCategory === "all" ? courses : courses.filter((course) => course.category === activeCategory)

  const handleEnrollClick = (course: Course) => {
    if (!isAuthenticated) {
      setSelectedCourse(course)
      setIsModalOpen(true)
    } else {
      addItem({
        id: course.id,
        title: course.title,
        price: course.price,
        duration: course.duration,
        level: course.level,
        image: course.image,
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 dark:bg-gray-900">
      <BackButton />
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 dark:text-white">{t("courses", "title")}</h1>

      {/* Kategoriya filterlari */}
      <div className="flex flex-wrap gap-4 mb-8">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2 rounded-full ${
              activeCategory === category.id
                ? "bg-blue-600 text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Kurslar ro'yxati */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <Link to={`/courses/${course.id}`}>
              <img src={course.image || "/placeholder.svg"} alt={course.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 line-clamp-2 dark:text-white">{course.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">{course.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-sm text-gray-600 dark:text-gray-300 rounded">
                    {course.duration}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-sm text-gray-600 dark:text-gray-300 rounded">
                    {course.level}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-blue-600 dark:text-blue-400">{course.price}</span>
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      handleEnrollClick(course)
                    }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      isInCart(course.id)
                        ? "bg-green-600 text-white hover:bg-green-700"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    {isInCart(course.id) ? "Savatda" : "Yozilish"}
                  </button>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Kurslar topilmadi */}
      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-300">Afsuski, hech qanday kurs topilmadi.</p>
        </div>
      )}

      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}

export default Courses

