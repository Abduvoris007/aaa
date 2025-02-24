"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useAuth } from "../../context/AuthContext"
import type { Resume, Education, Experience } from "../../types/Resume"
import { Plus, X, Moon, Sun } from "lucide-react"

const ResumeBuilder = () => {
  const { user } = useAuth()
  const [darkMode, setDarkMode] = useState(false)
  const [resume, setResume] = useState<Resume>({
    userId: user?.id || "",
    fullName: user?.name || "",
    title: "",
    about: "",
    phone: "",
    email: user?.email || "",
    location: "",
    education: [],
    experience: [],
    skills: [],
    languages: [],
    certificates: [],
    isPublic: false,
  })

  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode") === "true"
    setDarkMode(isDarkMode)
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    localStorage.setItem("darkMode", (!darkMode).toString())
    document.documentElement.classList.toggle("dark")
  }

  const handleBasicInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setResume({
      ...resume,
      [e.target.name]: e.target.value,
    })
  }

  const addEducation = () => {
    setResume({
      ...resume,
      education: [
        ...resume.education,
        {
          id: Date.now().toString(),
          school: "",
          degree: "",
          field: "",
          status: "studying" as const,
          type: "education" as const,
          startDate: new Date(),
          description: "",
        },
      ],
    })
  }

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    const newEducation = [...resume.education]
    newEducation[index] = { ...newEducation[index], [field]: value }
    setResume({ ...resume, education: newEducation })
  }

  const removeEducation = (index: number) => {
    setResume({
      ...resume,
      education: resume.education.filter((_, i) => i !== index),
    })
  }

  const addExperience = () => {
    setResume({
      ...resume,
      experience: [
        ...resume.experience,
        {
          id: Date.now().toString(),
          company: "",
          position: "",
          location: "",
          status: "previous",
          startYear: "",
          description: "",
        },
      ],
    })
  }

  const updateExperience = (index: number, field: keyof Experience, value: string) => {
    const newExperience = [...resume.experience]
    newExperience[index] = { ...newExperience[index], [field]: value }
    setResume({ ...resume, experience: newExperience })
  }

  const updateExperienceStatus = (index: number, status: "current" | "previous", value?: string) => {
    const newExperience = [...resume.experience]
    if (status === "current") {
      newExperience[index] = {
        ...newExperience[index],
        status: "current",
        duration: value,
        endYear: undefined,
      }
    } else {
      newExperience[index] = {
        ...newExperience[index],
        status: "previous",
        endYear: value,
      }
    }
    setResume({ ...resume, experience: newExperience })
  }

  const removeExperience = (index: number) => {
    setResume({
      ...resume,
      experience: resume.experience.filter((_, i) => i !== index),
    })
  }

  const updateEducationStatus = (index: number, status: "studying" | "graduated", value?: string) => {
    const newEducation = [...resume.education]
    if (status === "studying") {
      newEducation[index] = {
        ...newEducation[index],
        status: "studying",
        duration: value,
        graduationYear: undefined,
      }
    } else {
      newEducation[index] = {
        ...newEducation[index],
        status: "graduated",
        graduationYear: value,
      }
    }
    setResume({ ...resume, education: newEducation })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Backend API call to save resume
    console.log("Resume saved:", resume)
  }

  return (
    <div className={`container mx-auto px-4 py-8 ${darkMode ? "dark" : ""}`}>
      <button
        onClick={toggleDarkMode}
        className="fixed top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
      >
        {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
      </button>
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4 dark:text-white">Asosiy ma'lumotlar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-white">To'liq ism</label>
              <input
                type="text"
                name="fullName"
                value={resume.fullName}
                onChange={handleBasicInfoChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                placeholder="Masalan: Abdullayev Abdullo Abdullayevich"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-white">Lavozim</label>
              <input
                type="text"
                name="title"
                value={resume.title}
                onChange={handleBasicInfoChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                placeholder="Masalan: Frontend Developer"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1 dark:text-white">O'zingiz haqingizda</label>
              <textarea
                name="about"
                value={resume.about}
                onChange={handleBasicInfoChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                placeholder="O'zingiz haqingizda qisqacha ma'lumot. Masalan: 3 yillik tajribaga ega Frontend Developer"
                rows={4}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-white">Email</label>
              <input
                type="email"
                name="email"
                value={resume.email}
                onChange={handleBasicInfoChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                placeholder="example@gmail.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-white">Telefon</label>
              <input
                type="tel"
                name="phone"
                value={resume.phone}
                onChange={handleBasicInfoChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                placeholder="+998 90 123 45 67"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-white">Location</label>
              <input
                type="text"
                name="location"
                value={resume.location}
                onChange={handleBasicInfoChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                placeholder="Your Location"
              />
            </div>
          </div>
        </div>

        {/* Education Section */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold dark:text-white">Ta'lim</h2>
            <button
              type="button"
              onClick={addEducation}
              className="flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <Plus className="w-5 h-5 mr-1" />
              Qo'shish
            </button>
          </div>
          {resume.education.map((edu, index) => (
            <div key={edu.id} className="mb-4 p-4 border rounded relative">
              <button
                type="button"
                onClick={() => removeEducation(index)}
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400"
                aria-label="Ta'limni o'chirish"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  placeholder="O'quv muassasasi nomi (Masalan: Toshkent Davlat Universiteti)"
                  value={edu.school}
                  onChange={(e) => updateEducation(index, "school", e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
                <input
                  placeholder="Mutaxassislik nomi (Masalan: Kompyuter muhandisligi)"
                  value={edu.field}
                  onChange={(e) => updateEducation(index, "field", e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-600 mb-2 dark:text-gray-400">Ta'lim holati</label>
                  <div className="flex flex-col space-y-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name={`education-status-${index}`}
                        className="form-radio h-4 w-4 text-blue-600 dark:text-blue-400"
                        onChange={() => updateEducationStatus(index, "studying")}
                        checked={edu.status === "studying"}
                      />
                      <span className="ml-2 dark:text-gray-400">Hozirda o'qiyapman</span>
                    </label>

                    {edu.status === "studying" && (
                      <div className="ml-6">
                        <select
                          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
                          value={edu.duration}
                          onChange={(e) => updateEducationStatus(index, "studying", e.target.value)}
                          aria-label="O'qish davomiyligi"
                        >
                          <option value="">O'qish davomiyligini tanlang</option>
                          <option value="1-kurs">1-kurs</option>
                          <option value="2-kurs">2-kurs</option>
                          <option value="3-kurs">3-kurs</option>
                          <option value="4-kurs">4-kurs</option>
                          <option value="magistratura">Magistratura</option>
                        </select>
                      </div>
                    )}

                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name={`education-status-${index}`}
                        className="form-radio h-4 w-4 text-blue-600 dark:text-blue-400"
                        onChange={() => updateEducationStatus(index, "graduated")}
                        checked={edu.status === "graduated"}
                      />
                      <span className="ml-2 dark:text-gray-400">Bitirganman</span>
                    </label>

                    {edu.status === "graduated" && (
                      <div className="ml-6">
                        <select
                          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
                          value={edu.graduationYear}
                          onChange={(e) => updateEducationStatus(index, "graduated", e.target.value)}
                          aria-label="Bitirgan yili"
                        >
                          <option value="">Bitirgan yilingizni tanlang</option>
                          {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Experience Section */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold dark:text-white">Ish tajribasi</h2>
            <button
              type="button"
              onClick={addExperience}
              className="flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <Plus className="w-5 h-5 mr-1" />
              Qo'shish
            </button>
          </div>
          {resume.experience.map((exp, index) => (
            <div key={exp.id} className="mb-4 p-4 border rounded relative">
              <button
                type="button"
                onClick={() => removeExperience(index)}
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400"
                aria-label="Ish tajribani o'chirish"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  placeholder="Tashkilot nomi"
                  value={exp.company}
                  onChange={(e) => updateExperience(index, "company", e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
                <input
                  placeholder="Lavozim"
                  value={exp.position}
                  onChange={(e) => updateExperience(index, "position", e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
                <input
                  placeholder="Joylashuv (Shahar, Davlat)"
                  value={exp.location}
                  onChange={(e) => updateExperience(index, "location", e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-600 mb-2 dark:text-gray-400">Ish holati</label>
                  <div className="flex flex-col space-y-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name={`experience-status-${index}`}
                        className="form-radio h-4 w-4 text-blue-600 dark:text-blue-400"
                        onChange={() => updateExperienceStatus(index, "current")}
                        checked={exp.status === "current"}
                      />
                      <span className="ml-2 dark:text-gray-400">Hozirda ishlayman</span>
                    </label>

                    {exp.status === "current" && (
                      <div className="ml-6">
                        <select
                          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
                          value={exp.duration}
                          onChange={(e) => updateExperienceStatus(index, "current", e.target.value)}
                          aria-label="Ishlash davomiyligi"
                        >
                          <option value="">Qancha vaqtdan beri ishlayapsiz?</option>
                          <option value="3-oydan kam">3 oydan kam</option>
                          <option value="3-6 oy">3-6 oy</option>
                          <option value="6-12 oy">6-12 oy</option>
                          <option value="1-2 yil">1-2 yil</option>
                          <option value="2-3 yil">2-3 yil</option>
                          <option value="3-5 yil">3-5 yil</option>
                          <option value="5+ yil">5+ yil</option>
                        </select>
                      </div>
                    )}

                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name={`experience-status-${index}`}
                        className="form-radio h-4 w-4 text-blue-600 dark:text-blue-400"
                        onChange={() => updateExperienceStatus(index, "previous")}
                        checked={exp.status === "previous"}
                      />
                      <span className="ml-2 dark:text-gray-400">Oldingi ish joyim</span>
                    </label>

                    {exp.status === "previous" && (
                      <div className="grid grid-cols-2 gap-4 ml-6">
                        <div>
                          <label className="block text-sm text-gray-600 mb-1 dark:text-gray-400">Boshlagan yil</label>
                          <select
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
                            value={exp.startYear}
                            onChange={(e) => updateExperience(index, "startYear", e.target.value)}
                            aria-label="Ishni boshlagan yili"
                          >
                            <option value="">Tanlang</option>
                            {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-1 dark:text-gray-400">Tugatgan yil</label>
                          <select
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
                            value={exp.endYear}
                            onChange={(e) => updateExperienceStatus(index, "previous", e.target.value)}
                            aria-label="Ishni tugatgan yili"
                          >
                            <option value="">Tanlang</option>
                            {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-600 mb-1 dark:text-gray-400">
                    Vazifalaringiz va yutuqlaringiz
                  </label>
                  <textarea
                    value={exp.description}
                    onChange={(e) => updateExperience(index, "description", e.target.value)}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    rows={3}
                    placeholder="Asosiy vazifalaringiz va erishgan yutuqlaringizni kiriting"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Saqlash
          </button>
        </div>
      </form>
    </div>
  )
}

export default ResumeBuilder

