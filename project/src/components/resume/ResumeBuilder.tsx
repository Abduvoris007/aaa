"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useAuth } from "../../context/AuthContext"
import type { Resume, Education, Experience } from "../../types/Resume"
import { Plus, X, Moon, Sun, Globe } from 'lucide-react'
import { languages, type LanguageCode, translations } from "../../translations/index"

const ResumeBuilder = () => {
  const { user } = useAuth()
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

  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState<LanguageCode>("uz-latin")
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (isLanguageDropdownOpen && !(event.target as Element).closest(".language-selector")) {
        setIsLanguageDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isLanguageDropdownOpen])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const changeLanguage = (lang: LanguageCode) => {
    setLanguage(lang)
  }

  const t = translations[language]

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

  const saveResume = async (resume: Resume) => {
    // Replace with your actual API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate a successful API call
        resolve(true)
      }, 500)
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      // Backend API call to save resume
      await saveResume(resume)
      console.log("Resume saved:", resume)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save resume")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={`container mx-auto px-4 py-8 ${darkMode ? "dark" : ""}`}>
      <div className="flex justify-end space-x-4 mb-4">
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
          aria-label={darkMode ? t.lightMode : t.darkMode}
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        <div className="relative language-selector">
          <button
            onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
            aria-expanded={isLanguageDropdownOpen}
            aria-haspopup="true"
            aria-label={t.changeLanguage}
          >
            <Globe className="w-5 h-5" />
          </button>
          {isLanguageDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    changeLanguage(lang.code as LanguageCode)
                    setIsLanguageDropdownOpen(false)
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {lang.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-8">
        <div
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
          role="region"
          aria-labelledby="basic-info-heading"
        >
          <h2 id="basic-info-heading" className="text-xl font-bold mb-4 dark:text-white">
            {t.basicInfo}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">{t.fullName}</label>
              <input
                type="text"
                name="fullName"
                value={resume.fullName}
                onChange={handleBasicInfoChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder={t.fullNamePlaceholder}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">{t.title}</label>
              <input
                type="text"
                name="title"
                value={resume.title}
                onChange={handleBasicInfoChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder={t.titlePlaceholder}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">{t.about}</label>
              <textarea
                name="about"
                value={resume.about}
                onChange={handleBasicInfoChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder={t.aboutPlaceholder}
                rows={4}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">{t.email}</label>
              <input
                type="email"
                name="email"
                value={resume.email}
                onChange={handleBasicInfoChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder={t.emailPlaceholder}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">{t.phone}</label>
              <input
                type="tel"
                name="phone"
                value={resume.phone}
                onChange={handleBasicInfoChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder={t.phonePlaceholder}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">{t.location}</label>
              <input
                type="text"
                name="location"
                value={resume.location}
                onChange={handleBasicInfoChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder={t.locationPlaceholder}
              />
            </div>
          </div>
        </div>

        {/* Education Section */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg" role="region">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold dark:text-white">{t.education}</h2>
            <button
              type="button"
              onClick={addEducation}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  addEducation()
                }
              }}
              className="flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <Plus className="w-5 h-5 mr-1" />
              {t.add}
            </button>
          </div>
          {resume.education.map((edu, index) => (
            <div key={edu.id} className="mb-4 p-4 border rounded relative">
              <button
                type="button"
                onClick={() => removeEducation(index)}
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400"
                aria-label={t.removeEducation}
              >
                <X className="w-5 h-5" />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  placeholder={t.schoolPlaceholder}
                  value={edu.school}
                  onChange={(e) => updateEducation(index, "school", e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                />
                <input
                  placeholder={t.fieldPlaceholder}
                  value={edu.field}
                  onChange={(e) => updateEducation(index, "field", e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                />
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-600 dark:text-gray-300 mb-2">{t.educationStatus}</label>
                  <div className="flex flex-col space-y-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name={`education-status-${index}`}
                        className="form-radio h-4 w-4 text-blue-600 dark:text-blue-400"
                        onChange={() => updateEducationStatus(index, "studying")}
                        checked={edu.status === "studying"}
                      />
                      <span className="ml-2">{t.studying}</span>
                    </label>
                    {edu.status === "studying" && (
                      <div className="ml-6">
                        <select
                          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                          value={edu.duration}
                          onChange={(e) => updateEducationStatus(index, "studying", e.target.value)}
                          aria-label={t.studyDuration}
                        >
                          <option value="">{t.selectStudyDuration}</option>
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
                      <span className="ml-2">{t.graduated}</span>
                    </label>
                    {edu.status === "graduated" && (
                      <div className="ml-6">
                        <select
                          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                          value={edu.graduationYear}
                          onChange={(e) => updateEducationStatus(index, "graduated", e.target.value)}
                          aria-label={t.graduationYear}
                        >
                          <option value="">{t.selectGraduationYear}</option>
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
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg" role="region">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold dark:text-white">{t.experience}</h2>
            <button
              type="button"
              onClick={addExperience}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  addExperience()
                }
              }}
              className="flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <Plus className="w-5 h-5 mr-1" />
              {t.add}
            </button>
          </div>
          {resume.experience.map((exp, index) => (
            <div key={exp.id} className="mb-4 p-4 border rounded relative">
              <button
                type="button"
                onClick={() => removeExperience(index)}
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400"
                aria-label={t.removeExperience}
              >
                <X className="w-5 h-5" />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  placeholder={t.companyPlaceholder}
                  value={exp.company}
                  onChange={(e) => updateExperience(index, "company", e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                />
                <input
                  placeholder={t.positionPlaceholder}
                  value={exp.position}
                  onChange={(e) => updateExperience(index, "position", e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                />
                <input
                  placeholder={t.locationPlaceholder}
                  value={exp.location}
                  onChange={(e) => updateExperience(index, "location", e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                />
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-600 dark:text-gray-300 mb-2">{t.experienceStatus}</label>
                  <div className="flex flex-col space-y-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name={`experience-status-${index}`}
                        className="form-radio h-4 w-4 text-blue-600 dark:text-blue-400"
                        onChange={() => updateExperienceStatus(index, "current")}
                        checked={exp.status === "current"}
                      />
                      <span className="ml-2">{t.currentlyWorking}</span>
                    </label>
                    {exp.status === "current" && (
                      <div className="ml-6">
                        <select
                          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                          value={exp.duration}
                          onChange={(e) => updateExperienceStatus(index, "current", e.target.value)}
                          aria-label={t.workDuration}
                        >
                          <option value="">{t.selectWorkDuration}</option>
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
                      <span className="ml-2">{t.previousWork}</span>
                    </label>
                    {exp.status === "previous" && (
                      <div className="grid grid-cols-2 gap-4 ml-6">
                        <div>
                          <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">{t.startYear}</label>
                          <select
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                            value={exp.startYear}
                            onChange={(e) => updateExperience(index, "startYear", e.target.value)}
                            aria-label={t.startYear}
                          >
                            <option value="">{t.selectYear}</option>
                            {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">{t.endYear}</label>
                          <select
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                            value={exp.endYear}
                            onChange={(e) => updateExperienceStatus(index, "previous", e.target.value)}
                            aria-label={t.endYear}
                          >
                            <option value="">{t.selectYear}</option>
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
                  <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">{t.description}</label>
                  <textarea
                    value={exp.description}
                    onChange={(e) => updateExperience(index, "description", e.target.value)}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                    rows={3}
                    placeholder={t.descriptionPlaceholder}
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
            disabled={isSubmitting}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors dark:bg-blue-500 dark:hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? t.saving : t.save}
          </button>
          {error && <div className="text-red-500 dark:text-red-400 text-sm mt-2">{error}</div>}
        </div>
      </form>
    </div>
  )
}

export default ResumeBuilder
