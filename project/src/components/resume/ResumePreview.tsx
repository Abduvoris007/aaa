import type React from "react"
import type { Resume } from "../../types/Resume"
import { useLanguage } from "../../translations/index"
import { ErrorBoundary } from "react-error-boundary"
import Image from "next/image"

interface ResumePreviewProps {
  resume: Resume
}

const ErrorFallback = ({ error }: { error: Error }) => (
  <div className="text-red-500 p-4" role="alert">
    <p>Something went wrong:</p>
    <pre>{error.message}</pre>
  </div>
)

const ResumePreview: React.FC<ResumePreviewProps> = ({ resume }) => {
  const { t } = useLanguage()

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return ""
    return new Date(date).getFullYear().toString()
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden print:shadow-none">
        {/* Header */}
        <div className="bg-blue-600 dark:bg-blue-800 text-white p-4 md:p-8 print:bg-black">
          <div className="flex flex-col md:flex-row items-center">
            {resume.avatar && (
              <div className="relative w-24 h-24 mb-4 md:mb-0 md:mr-6">
                <Image
                  src={resume.avatar || "/placeholder.svg"}
                  alt=""
                  width={96}
                  height={96}
                  className="rounded-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg"
                  }}
                />
              </div>
            )}
            <div className="text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold" id="resume-title">
                {resume.fullName}
              </h1>
              <p className="text-lg md:text-xl opacity-90">{resume.title}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 md:p-8 dark:text-white">
          {/* About */}
          {resume.about && (
            <section className="mb-6 md:mb-8" aria-labelledby="about-heading">
              <h2 id="about-heading" className="text-xl md:text-2xl font-bold mb-2 md:mb-4">
                {t("resume.aboutMe")}
              </h2>
              <p className="text-gray-700 dark:text-gray-300">{resume.about}</p>
            </section>
          )}

          {/* Contact */}
          <section className="mb-6 md:mb-8" aria-labelledby="contact-heading">
            <h2 id="contact-heading" className="text-xl md:text-2xl font-bold mb-2 md:mb-4">
              {t("resume.contactInfo")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
              {resume.email && (
                <div>
                  <p className="font-medium">{t("resume.email")}:</p>
                  <p className="text-gray-700 dark:text-gray-300">{resume.email}</p>
                </div>
              )}
              {resume.phone && (
                <div>
                  <p className="font-medium">{t("resume.phone")}:</p>
                  <p className="text-gray-700 dark:text-gray-300">{resume.phone}</p>
                </div>
              )}
              {resume.location && (
                <div>
                  <p className="font-medium">{t("resume.address")}:</p>
                  <p className="text-gray-700 dark:text-gray-300">{resume.location}</p>
                </div>
              )}
            </div>
          </section>

          {/* Experience */}
          {resume.experience.length > 0 && (
            <section className="mb-6 md:mb-8" aria-labelledby="experience-heading">
              <h2 id="experience-heading" className="text-xl md:text-2xl font-bold mb-2 md:mb-4">
                {t("resume.experience")}
              </h2>
              {resume.experience.map((exp) => (
                <div key={exp.id} className="mb-4">
                  <h3 className="text-lg md:text-xl font-semibold">{exp.position}</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {exp.company} {exp.location && `- ${exp.location}`}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {exp.startYear} - {exp.status === "current" ? t("resume.current") : exp.endYear}
                    {exp.status === "current" && exp.duration && ` (${exp.duration})`}
                  </p>
                  {exp.description && <p className="mt-2 text-gray-700 dark:text-gray-300">{exp.description}</p>}
                </div>
              ))}
            </section>
          )}

          {/* Education */}
          {resume.education.length > 0 && (
            <section className="mb-6 md:mb-8" aria-labelledby="education-heading">
              <h2 id="education-heading" className="text-xl md:text-2xl font-bold mb-2 md:mb-4">
                {t("resume.education")}
              </h2>
              {resume.education.map((edu) => (
                <div key={edu.id} className="mb-4">
                  <h3 className="text-lg md:text-xl font-semibold">{edu.school}</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {edu.degree} {edu.field && `- ${edu.field}`}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(edu.startDate)} -{" "}
                    {edu.status === "studying" ? t("resume.current") : formatDate(edu.graduationYear)}
                    {edu.status === "studying" && edu.duration && ` (${edu.duration})`}
                  </p>
                  {edu.description && <p className="mt-2 text-gray-700 dark:text-gray-300">{edu.description}</p>}
                </div>
              ))}
            </section>
          )}

          {/* Skills */}
          {resume.skills.length > 0 && (
            <section className="mb-6 md:mb-8" aria-labelledby="skills-heading">
              <h2 id="skills-heading" className="text-xl md:text-2xl font-bold mb-2 md:mb-4">
                {t("resume.skills")}
              </h2>
              <div className="flex flex-wrap gap-2">
                {resume.skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                  >
                    {skill.name} {skill.level && `- ${skill.level}`}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {resume.languages.length > 0 && (
            <section className="mb-6 md:mb-8" aria-labelledby="languages-heading">
              <h2 id="languages-heading" className="text-xl md:text-2xl font-bold mb-2 md:mb-4">
                {t("resume.languages")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                {resume.languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between items-center">
                    <span>{lang.name}</span>
                    <span className="text-gray-600 dark:text-gray-400">{lang.level}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </ErrorBoundary>
  )
}

export default ResumePreview

