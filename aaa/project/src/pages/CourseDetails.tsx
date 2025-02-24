"use client"

import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useLanguage } from "../context/LanguageContext"
import { useAuth } from "../context/AuthContext"
import { useCart } from "../context/CartContext"
import AuthModal from "../components/auth/AuthModal"
import RelatedJobs from "../components/jobs/RelatedJobs"
import BackButton from "../components/common/BackButton"

interface CourseDetails {
  id: number
  title: string
  level: string
  duration: string
  price: string
  description: string
  image: string
  category: string
  schedule: string[]
  features: string[]
  curriculum: {
    title: string
    topics: {
      name: string
      task: {
        description: string
        requirements: string[]
        deadline: string
      }
      isCompleted?: boolean
    }[]
  }[]
  progress?: {
    completedTopics: number
    totalTopics: number
    isCompleted: boolean
  }
  teacher: {
    name: string
    position: string
    image: string
    bio: string
  }
}

const CourseDetails = () => {
  const { id } = useParams()
  const { t } = useLanguage()
  const { isAuthenticated } = useAuth()
  const { addItem, isInCart } = useCart()
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  // Ma'lumotlar bazasidan kurs ma'lumotlarini olish
  const getCourseDetails = (id: string): CourseDetails => {
    const courses: { [key: string]: CourseDetails } = {
      "1": {
        id: 1,
        title: "General English Online",
        level: "Beginner (A1)",
        duration: "3 oy",
        price: "300,000 so'm/oy",
        description:
          "Ingliz tilini online formatda noldan o'rganish. Zoom orqali jonli darslar, interaktiv mashg'ulotlar va individual yondashuv.",
        image: "/images/general-english.jpg",
        category: "language",
        schedule: ["Dushanba/Chorshanba/Juma - 09:00-10:30 (Zoom)", "Seshanba/Payshanba - Individual mashg'ulotlar"],
        features: [
          "Zoom orqali jonli darslar",
          "Kichik guruhlar (4-6 talaba)",
          "Online o'quv materiallari va videolar",
          "Interaktiv topshiriqlar",
          "24/7 o'qituvchi bilan aloqa",
          "Mobil ilova orqali o'rganish",
          "Online speaking club",
          "Progress tracking tizimi",
        ],
        curriculum: [
          {
            title: "1-oy",
            topics: [
              {
                name: "Online platforma bilan tanishish",
                task: {
                  description: "Platformaning asosiy funksiyalari bilan tanishish va shaxsiy profilni to'ldirish",
                  requirements: [
                    "Profildagi barcha ma'lumotlarni to'ldirish",
                    "Birinchi video darsni ko'rish",
                    "O'zingiz haqingizda qisqa taqdimot tayyorlash",
                  ],
                  deadline: "1-hafta",
                },
                isCompleted: false,
              },
            ],
          },
        ],
        teacher: {
          name: "John Smith",
          position: "Senior English Teacher",
          image: "/images/teacher.jpg",
          bio: "5 yillik online o'qitish tajribasiga ega CELTA sertifikatli o'qituvchi.",
        },
      },
      "7": {
        id: 7,
        title: "Full Stack Web Development",
        level: "Beginner to Advanced",
        duration: "6 oy",
        price: "800,000 so'm/oy",
        description:
          "Zamonaviy web dasturlash texnologiyalari (React, Node.js, TypeScript). Real loyihalar va portfolio yaratish.",
        image: "/images/web-development.jpg",
        category: "it",
        schedule: [
          "Dushanba/Chorshanba/Juma - 18:00-20:00 (Live coding)",
          "Seshanba/Payshanba - Amaliy mashg'ulotlar",
          "Shanba - Loyiha ustida ishlash",
        ],
        features: [
          "Live coding sessiyalari",
          "Real loyihalar ustida ishlash",
          "GitHub portfolio yaratish",
          "Code review va mentorlik",
          "Zamonaviy dasturlash tillari",
          "Deployment va hosting",
          "Texnik intervyularga tayyorgarlik",
          "Karyera konsultatsiyasi",
        ],
        curriculum: [
          {
            title: "Frontend Development",
            topics: [
              {
                name: "HTML5, CSS3 va JavaScript asoslari",
                task: {
                  description: "Responsive web sayt yaratish",
                  requirements: ["Landing page yaratish", "Mobil qurilmalarga moslash", "GitHub Pages da joylash"],
                  deadline: "2-hafta",
                },
                isCompleted: false,
              },
              {
                name: "React va TypeScript",
                task: {
                  description: "Todo ilovasi yaratish",
                  requirements: ["TypeScript bilan React komponetlar", "State management", "Unit testlar yozish"],
                  deadline: "3-hafta",
                },
                isCompleted: false,
              },
            ],
          },
          {
            title: "Backend Development",
            topics: [
              {
                name: "Node.js va Express",
                task: {
                  description: "REST API yaratish",
                  requirements: ["CRUD operatsiyalari", "Authentication", "API dokumentatsiya"],
                  deadline: "3-hafta",
                },
                isCompleted: false,
              },
              {
                name: "Database va ORM",
                task: {
                  description: "PostgreSQL va Prisma bilan ishlash",
                  requirements: ["Database schema yaratish", "Migrations yozish", "Query optimization"],
                  deadline: "2-hafta",
                },
                isCompleted: false,
              },
            ],
          },
        ],
        teacher: {
          name: "Alex Johnson",
          position: "Senior Full Stack Developer",
          image: "/images/teacher-alex.jpg",
          bio: "10 yillik tajribaga ega Full Stack dasturchi. Amazon va Google da ishlagan. Open source loyihalarda faol ishtirokchi.",
        },
      },
      "8": {
        id: 8,
        title: "Mobile App Development",
        level: "Intermediate",
        duration: "4 oy",
        price: "900,000 so'm/oy",
        description:
          "React Native va Flutter orqali mobil ilovalar yaratishni o'rganing. App Store va Play Market uchun loyihalar.",
        image: "/images/mobile-dev.jpg",
        category: "it",
        schedule: ["Seshanba/Payshanba - 19:00-21:00 (Live coding)", "Shanba - 15:00-18:00 (Amaliy mashg'ulot)"],
        features: [
          "Cross-platform development",
          "Native komponentlar bilan ishlash",
          "State management",
          "Push notifications",
          "API integration",
          "App Store va Play Market ga joylash",
          "Performance optimization",
          "Real loyihalar portfoliosi",
        ],
        curriculum: [
          {
            title: "React Native",
            topics: [
              {
                name: "React Native asoslari",
                task: {
                  description: "Instagram clone yaratish",
                  requirements: ["UI komponentlar", "Navigation", "Camera integration"],
                  deadline: "3-hafta",
                },
                isCompleted: false,
              },
            ],
          },
          {
            title: "Flutter",
            topics: [
              {
                name: "Flutter va Dart asoslari",
                task: {
                  description: "E-commerce ilova yaratish",
                  requirements: ["State management", "API integration", "Payment gateway"],
                  deadline: "4-hafta",
                },
                isCompleted: false,
              },
            ],
          },
        ],
        teacher: {
          name: "Sarah Chen",
          position: "Mobile Development Lead",
          image: "/images/teacher-sarah.jpg",
          bio: "8 yillik mobil dasturlash tajribasi. 50+ dan ortiq App Store va Play Market dagi ilovalar muallifi.",
        },
      },
      "9": {
        id: 9,
        title: "UI/UX Design",
        level: "Beginner",
        duration: "3 oy",
        price: "600,000 so'm/oy",
        description: "Figma, Adobe XD va Sketch dasturlarida interfeys dizayni. User Research va Prototyping.",
        image: "/images/ui-ux.jpg",
        category: "it",
        schedule: ["Dushanba/Chorshanba - 18:00-20:00 (Design sessions)", "Juma - 18:00-21:00 (Portfolio review)"],
        features: [
          "Design thinking",
          "User research",
          "Wireframing",
          "Prototyping",
          "Design systems",
          "Usability testing",
          "Portfolio yaratish",
          "Real loyihalar",
        ],
        curriculum: [
          {
            title: "UX Research",
            topics: [
              {
                name: "User Research Methods",
                task: {
                  description: "User research o'tkazish",
                  requirements: ["Intervyu o'tkazish", "Survey yaratish", "Research report"],
                  deadline: "2-hafta",
                },
                isCompleted: false,
              },
            ],
          },
          {
            title: "UI Design",
            topics: [
              {
                name: "Design Systems",
                task: {
                  description: "Design system yaratish",
                  requirements: ["Component library", "Style guide", "Documentation"],
                  deadline: "3-hafta",
                },
                isCompleted: false,
              },
            ],
          },
        ],
        teacher: {
          name: "Emma Wilson",
          position: "Senior UI/UX Designer",
          image: "/images/teacher-emma.jpg",
          bio: "7 yillik dizayn tajribasi. Google va Apple uchun freelance dizayner. Design awards sovrindori.",
        },
      },
    }

    return courses[id] || courses["1"]
  }

  const course = getCourseDetails(id || "1")

  useEffect(() => {
    // Kurs topshiriqlarini tekshirish
    const checkCompletion = () => {
      if (!course.curriculum) return false

      const allTopics = course.curriculum.flatMap((section) => section.topics)
      const completedTopics = allTopics.filter((topic) => topic.isCompleted)

      return completedTopics.length === allTopics.length
    }

    setIsCompleted(checkCompletion())
  }, [course])

  const handleEnrollClick = () => {
    if (!isAuthenticated) {
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

  const handleApplyJob = () => {
    if (!isAuthenticated) {
      setIsModalOpen(true)
      return
    }

    // Ishga topshirish logikasi
    if (course.category === "it") {
      alert("Tabriklaymiz! Sizning arizangiz qabul qilindi. Tez orada siz bilan bog'lanamiz.")
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 dark:bg-gray-900">
      <BackButton />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Asosiy ma'lumotlar */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <img src={course.image || "/placeholder.svg"} alt={course.title} className="w-full h-64 object-cover" />
            <div className="p-6">
              <h1 className="text-2xl sm:text-3xl font-bold mb-4 dark:text-white">{course.title}</h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6">{course.description}</p>

              {/* Kurs xususiyatlari */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="font-semibold dark:text-white">Davomiyligi:</span>
                  <span className="dark:text-gray-300">{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold dark:text-white">Daraja:</span>
                  <span className="dark:text-gray-300">{course.level}</span>
                </div>
              </div>

              {/* O'qituvchi haqida */}
              <div className="border-t dark:border-gray-700 pt-6">
                <h2 className="text-xl font-semibold mb-4 dark:text-white">O'qituvchi</h2>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <img
                    src={course.teacher.image || "/placeholder.svg"}
                    alt={course.teacher.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold dark:text-white">{course.teacher.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{course.teacher.position}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{course.teacher.bio}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Curriculum */}
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6 dark:text-white">Kurs dasturi</h2>
            <div className="space-y-6">
              {course.curriculum?.map((section, index) => (
                <div key={index}>
                  <h3 className="font-semibold mb-4 dark:text-white">{section.title}</h3>
                  <div className="space-y-4">
                    {section.topics.map((topic, topicIndex) => (
                      <div key={topicIndex} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium dark:text-white">{topic.name}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{topic.task.description}</p>
                          </div>
                          {topic.isCompleted && <span className="text-green-600 dark:text-green-400">✓</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Yon panel */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-8">
            <div className="text-2xl font-bold mb-6 dark:text-white">{course.price}</div>

            <button
              onClick={handleEnrollClick}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors mb-4"
            >
              Kursga yozilish
            </button>

            {course.category === "it" && isCompleted && (
              <button
                onClick={handleApplyJob}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Ishga topshirish
              </button>
            )}

            {/* Dars jadvali */}
            <div className="mt-6">
              <h3 className="font-semibold mb-4 dark:text-white">Dars jadvali</h3>
              <ul className="space-y-2">
                {course.schedule?.map((time, index) => (
                  <li key={index} className="text-sm text-gray-600 dark:text-gray-300">
                    {time}
                  </li>
                ))}
              </ul>
            </div>

            {/* Kurs xususiyatlari */}
            <div className="mt-6">
              <h3 className="font-semibold mb-4 dark:text-white">Kurs xususiyatlari</h3>
              <ul className="space-y-2">
                {course.features?.map((feature, index) => (
                  <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
                    <span>•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Related Jobs komponenti */}
      {course.category === "it" && (
        <div className="mt-8">
         <RelatedJobs courseCategory={course.category} isCompleted={isCompleted} />
        </div>
      )}

      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}

export default CourseDetails

