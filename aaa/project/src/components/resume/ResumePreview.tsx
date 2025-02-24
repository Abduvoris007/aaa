import type React from "react"
import type { Resume } from "../../types/Resume"
import { Mail, Phone, MapPin } from "lucide-react"

interface ResumePreviewProps {
  resume: Resume
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ resume }) => {
  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-8">
        <div className="flex flex-col md:flex-row items-center">
          {resume.avatar && (
            <img
              src={resume.avatar || "/placeholder.svg"}
              alt={resume.fullName}
              className="w-24 h-24 rounded-full mb-4 md:mb-0 md:mr-6"
            />
          )}
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold">{resume.fullName}</h1>
            <p className="text-xl opacity-90">{resume.title}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {/* About */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 dark:text-white">O'zim haqimda</h2>
          <p className="text-gray-700 dark:text-gray-300">{resume.about}</p>
        </section>

        {/* Contact */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 dark:text-white">Kontakt ma'lumotlar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <Mail className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" />
              <div>
                <p className="font-medium dark:text-white">Email:</p>
                <p className="text-gray-700 dark:text-gray-300">{resume.email}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Phone className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" />
              <div>
                <p className="font-medium dark:text-white">Telefon:</p>
                <p className="text-gray-700 dark:text-gray-300">{resume.phone}</p>
              </div>
            </div>
            <div className="flex items-center md:col-span-2">
              <MapPin className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" />
              <div>
                <p className="font-medium dark:text-white">Manzil:</p>
                <p className="text-gray-700 dark:text-gray-300">{resume.location}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 dark:text-white">Ish tajriba</h2>
          {resume.experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <h3 className="text-xl font-semibold dark:text-white">{exp.position}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {exp.company} - {exp.location}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                {exp.startYear} - {exp.endYear || "Hozirgi"}
              </p>
              <p className="mt-2 text-gray-700 dark:text-gray-300">{exp.description}</p>
            </div>
          ))}
        </section>

        {/* Education */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 dark:text-white">Ta'lim</h2>
          {resume.education.map((edu) => (
            <div key={edu.id} className="mb-4">
              <h3 className="text-xl font-semibold dark:text-white">{edu.school}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {edu.degree} - {edu.field}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                {new Date(edu.startDate).getFullYear()} -{edu.endDate ? new Date(edu.endDate).getFullYear() : "Hozirgi"}
              </p>
              {edu.description && <p className="mt-2 text-gray-700 dark:text-gray-300">{edu.description}</p>}
            </div>
          ))}
        </section>

        {/* Skills */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 dark:text-white">Ko'nikmalar</h2>
          <div className="flex flex-wrap gap-2">
            {resume.skills.map((skill) => (
              <span
                key={skill.id}
                className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 rounded-full text-sm"
              >
                {skill.name} - {skill.level}
              </span>
            ))}
          </div>
        </section>

        {/* Languages */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 dark:text-white">Tillar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resume.languages.map((lang) => (
              <div key={lang.id} className="flex justify-between items-center">
                <span className="dark:text-white">{lang.name}</span>
                <span className="text-gray-600 dark:text-gray-400">{lang.level}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default ResumePreview

