"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { useLanguage } from "../context/LanguageContext"
import { X } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import AuthModal from "../components/auth/AuthModal"
import { useTheme } from "../context/ThemeContext"

interface FeaturedCourse {
  id: string
  title: string
  description: string
  level: string
  duration: string
  students: number
  rating: number
  price: string
  image: string
  features: string[]
}

interface Review {
  id: string
  userId: string
  userName: string
  userImage: string
  courseId: number
  rating: number
  comment: string
  date: string
}

interface PopularCourse {
  id: number
  title: string
  level: string
  students: number
  rating: number
  price: string
  image: string
  description: string
  features: string[]
  teacher: {
    name: string
    qualification: string
    experience: string
    image: string
  }
  monthlyProgress: {
    week1: string[]
    week2: string[]
    week3: string[]
    week4: string[]
  }
  reviews: Review[]
}

const Home = () => {
  const { t } = useLanguage()
  const [selectedCourse, setSelectedCourse] = useState<FeaturedCourse | null>(null)
  const { isAuthenticated } = useAuth()
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const { theme } = useTheme()

  const featuredCourses: FeaturedCourse[] = [
    {
      id: "1",
      title: "English for Beginners",
      description: "Master the basics of English with our comprehensive beginner course.",
      level: "Front End",
      duration: "12 weeks",
      students: 15420,
      rating: 4.8,
      price: "300000 so'm/oy",
      image: "/images/beginner-course.jpg",
      features: [
        "Basic grammar and vocabulary",
        "Daily conversation practice",
        "Interactive exercises",
        "Native speaker teachers",
        "Personal study plan",
      ],
    },
    {
      id: "2",
      title: "Business English",
      description: "Learn professional English for the workplace and international business.",
      level: "Back End",
      duration: "8 weeks",
      students: 8750,
      rating: 4.7,
      price: "400000 so'm/oy",
      image: "/images/business-course.jpg",
      features: [
        "Business vocabulary",
        "Email writing",
        "Presentation skills",
        "Meeting participation",
        "Negotiation techniques",
      ],
    },
    {
      id: "3",
      title: "IELTS Preparation",
      description: "Perfect your English skills with advanced IELTS preparation.",
      level: "No-Coding",
      duration: "10 weeks",
      students: 6320,
      rating: 4.9,
      price: "450000 so'm/oy",
      image: "/images/ielts-course.jpg",
      features: [
        "IELTS strategies",
        "Practice tests",
        "Writing correction",
        "Speaking practice",
        "Band score guarantee",
      ],
    },
  ]
  const featuredCourseseng: FeaturedCourse[] = [
    {
      id: "1",
      title: "English for Beginners",
      description: "Master the basics of English with our comprehensive beginner course.",
      level: "Beginner ",
      duration: "12 weeks",
      students: 15420,
      rating: 4.8,
      price: "300000 so'm/oy",
      image: "/images/beginner-course.jpg",
      features: [
        "Basic grammar and vocabulary",
        "Daily conversation practice",
        "Interactive exercises",
        "Native speaker teachers",
        "Personal study plan",
      ],
    },
    {
      id: "2",
      title: "Business English",
      description: "Learn professional English for the workplace and international business.",
      level: "Intermediate",
      duration: "8 weeks",
      students: 8750,
      rating: 4.7,
      price: "400000 so'm/oy",
      image: "/images/business-course.jpg",
      features: [
        "Business vocabulary",
        "Email writing",
        "Presentation skills",
        "Meeting participation",
        "Negotiation techniques",
      ],
    },
    {
      id: "3",
      title: "IELTS Preparation",
      description: "Perfect your English skills with advanced IELTS preparation.",
      level: "Upper-Intermediate",
      duration: "10 weeks",
      students: 6320,
      rating: 4.9,
      price: "450000 so'm/oy",
      image: "/images/ielts-course.jpg",
      features: [
        "IELTS strategies",
        "Practice tests",
        "Writing correction",
        "Speaking practice",
        "Band score guarantee",
      ],
    },
  ]

  const popularCourses: PopularCourse[] = [
    {
      id: 1,
      title: "General English Online",
      level: "Beginner (A1)",
      students: 1250,
      rating: 4.8,
      price: "300,000 so'm/oy",
      image: "/images/general-english.jpg",
      description: "Learn English from basics with professional teachers",
      features: [
        "Interactive online lessons",
        "Native speaker practice",
        "Homework assignments",
        "Progress tracking",
        "Certificate upon completion",
      ],
      teacher: {
        name: "Sarah Johnson",
        qualification: "CELTA certified, MA in TESOL",
        experience: "8 yillik tajriba, IELTS 8.5",
        image: "/images/teachers/sarah.jpg",
      },
      monthlyProgress: {
        week1: [
          "Ingliz tili grammatikasining asoslari",
          "Kundalik hayotda ishlatiladigan 100+ so'z",
          "O'zingiz haqingizda gapirish ko'nikmalari",
        ],
        week2: [
          "Present Simple va Present Continuous",
          "Oila a'zolari va do'stlar haqida suhbat",
          "Telefonda gaplashish ko'nikmalari",
        ],
        week3: [
          "Past Simple va Past Continuous",
          "Sayohat va transport mavzusidagi so'zlashuvlar",
          "Email yozish ko'nikmalari",
        ],
        week4: ["Future tense konstruksiyalari", "Ish va kasblar haqida suhbat", "Prezentatsiya qilish ko'nikmalari"],
      },
      reviews: [
        {
          id: "1",
          userId: "user1",
          userName: "Aziza Karimova",
          userImage: "/images/students/student1.jpg",
          courseId: 1,
          rating: 5,
          comment: "Juda ajoyib kurs! 3 oyda ingliz tilida bemalol gaplasha oladigan darajaga yetdim.",
          date: "2024-02-15",
        },
        {
          id: "2",
          userId: "user2",
          userName: "Jamshid Toshmatov",
          userImage: "/images/students/student2.jpg",
          courseId: 1,
          rating: 4,
          comment: "O'qituvchi juda professional, darslar qiziqarli o'tadi.",
          date: "2024-02-10",
        },
      ],
    },
    {
      id: 2,
      title: "IELTS Online Preparation",
      level: "Intermediate (B1+)",
      students: 850,
      rating: 4.9,
      price: "450,000 so'm/oy",
      image: "/images/ielts-prep.jpg",
      description: "Prepare for IELTS with expert teachers",
      features: [
        "Advanced IELTS strategies",
        "Practice tests",
        "Speaking practice",
        "Writing correction",
        "Band score guarantee",
      ],
      teacher: {
        name: "John Smith",
        qualification: "CELTA certified, MA in TESOL",
        experience: "10 yillik tajriba, IELTS 8.0",
        image: "/images/teachers/john.jpg",
      },
      monthlyProgress: {
        week1: [
          "Ingliz tili grammatikasining asoslari",
          "Kundalik hayotda ishlatiladigan 100+ so'z",
          "O'zingiz haqingizda gapirish ko'nikmalari",
        ],
        week2: [
          "Present Simple va Present Continuous",
          "Oila a'zolari va do'stlar haqida suhbat",
          "Telefonda gaplashish ko'nikmalari",
        ],
        week3: [
          "Past Simple va Past Continuous",
          "Sayohat va transport mavzusidagi so'zlashuvlar",
          "Email yozish ko'nikmalari",
        ],
        week4: ["Future tense konstruksiyalari", "Ish va kasblar haqida suhbat", "Prezentatsiya qilish ko'nikmalari"],
      },
      reviews: [],
    },
    {
      id: 4,
      title: "Virtual Speaking Club",
      level: "All Levels",
      students: 720,
      rating: 4.7,
      price: "200,000 so'm/oy",
      image: "/images/speaking-club.jpg",
      description: "Practice speaking with native speakers",
      features: [
        "Interactive speaking practice",
        "Native speaker feedback",
        "Progress tracking",
        "Certificate upon completion",
      ],
      teacher: {
        name: "Emily Davis",
        qualification: "CELTA certified, MA in TESOL",
        experience: "6 yillik tajriba, IELTS 8.5",
        image: "/images/teachers/emily.jpg",
      },
      monthlyProgress: {
        week1: [
          "Ingliz tili grammatikasining asoslari",
          "Kundalik hayotda ishlatiladigan 100+ so'z",
          "O'zingiz haqingizda gapirish ko'nikmalari",
        ],
        week2: [
          "Present Simple va Present Continuous",
          "Oila a'zolari va do'stlar haqida suhbat",
          "Telefonda gaplashish ko'nikmalari",
        ],
        week3: [
          "Past Simple va Past Continuous",
          "Sayohat va transport mavzusidagi so'zlashuvlar",
          "Email yozish ko'nikmalari",
        ],
        week4: ["Future tense konstruksiyalari", "Ish va kasblar haqida suhbat", "Prezentatsiya qilish ko'nikmalari"],
      },
      reviews: [],
    },
  ]

  const handleBuyClick = () => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true)
    } else {
      setSelectedCourse(selectedCourse)
    }
  }

  return (
    <div className={`pt-16 ${theme === "dark" ? "dark" : ""}`}>
     

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">DIGITAL KARMADA</h1>
            <p className="text-xl md:text-2xl mb-8">
              bilan kelajak sohalarini o'rganing va rivojlangan davlatlarda ishga joylashing
            </p>
            <Link
              to="/courses"
              className="inline-block bg-white text-blue-600 dark:bg-gray-800 dark:text-blue-400 px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Boshlash
            </Link>
          </div>
        </div>
      </div>

      {/* Featured IT Courses */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white dark:bg-gray-900">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Оммабоп IT курслар</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => setSelectedCourse(course)}
            >
              <div className="relative h-48">
                <img
                  src={course.image || "/placeholder.svg"}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                  {course.level}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 h-14 text-gray-900 dark:text-white">{course.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 h-20">{course.description}</p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="ml-1 text-sm font-medium">{course.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{course.duration}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">{course.price}</span>
                    <button
                      onClick={handleBuyClick}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors"
                    >
                      Sotib olish
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured English Courses */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gray-100 dark:bg-gray-900">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Оммабоп ингилиз тили курслари
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredCourseseng.map((course) => (
            <div
              key={course.id}
              className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => setSelectedCourse(course)}
            >
              <div className="relative h-48">
                <img
                  src={course.image || "/placeholder.svg"}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                  {course.level}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 h-14 text-gray-900 dark:text-white">{course.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 h-20">{course.description}</p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="ml-1 text-sm font-medium">{course.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{course.duration}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">{course.price}</span>
                    <button
                      onClick={handleBuyClick}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors"
                    >
                      Sotib olish
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Course Modal */}
      {selectedCourse && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedCourse(null)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={selectedCourse.image || "/placeholder.svg"}
                alt={selectedCourse.title}
                className="w-full h-64 object-cover"
              />
              <button
                type="button"
                onClick={() => setSelectedCourse(null)}
                className="absolute top-4 right-4 bg-white dark:bg-gray-700 rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                title="Close course details"
              >
                <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedCourse.title}</h2>
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">{selectedCourse.level}</span>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-6">{selectedCourse.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">{selectedCourse.duration}</span>
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">
                    {selectedCourse.students.toLocaleString()} students
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-bold mb-3 text-gray-900 dark:text-white">Course Features:</h3>
                <ul className="space-y-2">
                  {selectedCourse.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <svg
                        className="w-5 h-5 text-green-500 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{selectedCourse.price}</span>
                <Link
                  to={`/courses/${selectedCourse.id}`}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors"
                >
                  Enroll Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Why Choose Us */}
      <section className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Nega bizni tanlashingiz kerak?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-blue-600 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Professional o'qituvchilar</h3>
              <p className="text-gray-600 dark:text-gray-300">
                CELTA, TESOL va DELTA sertifikatlariga ega, 5+ yillik tajribaga ega malakali o'qituvchilar. Native
                speaker'lar bilan amaliyot.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-blue-600 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Interaktiv ta'lim</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Zamonaviy platformada jonli muloqot, video darslar va interaktiv mashqlar. AI texnologiyalari yordamida
                individual yondashuv.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-blue-600 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Kafolatlangan natija</h3>
              <p className="text-gray-600 dark:text-gray-300">
                3 oyda bir daraja ko'tarilish kafolati. IELTS da 6.5+ ball olish kafolati. Xalqaro sertifikatlar olish
                imkoniyati.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        customMessage="Kursni sotib olish uchun avval ro'yxatdan o'ting"
      />

      {/* Footer */}
    </div>
  )
}

export default Home

