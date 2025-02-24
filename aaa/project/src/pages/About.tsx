import { useLanguage } from "../context/LanguageContext"
import BackButton from "../components/common/BackButton"

const About = () => {
  const { t } = useLanguage()

  return (
    <div className="container mx-auto px-4 py-8 dark:bg-gray-900">
      <BackButton />
      <div className="max-w-4xl mx-auto">
        {/* Main Title */}
        <h1 className="text-4xl font-bold text-center mb-8 dark:text-white">{t("about", "title")}</h1>

        {/* Introduction */}
        <div className="mb-12 text-center">
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">{t("about", "introduction")}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">5+</div>
            <div className="text-gray-600 dark:text-gray-300">{t("about", "yearsExperience")}</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">1000+</div>
            <div className="text-gray-600 dark:text-gray-300">{t("about", "students")}</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">20+</div>
            <div className="text-gray-600 dark:text-gray-300">{t("about", "teachers")}</div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4 dark:text-white">{t("about", "onlineLearningTitle")}</h3>
            <p className="text-gray-600 dark:text-gray-300">{t("about", "onlineLearningText")}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4 dark:text-white">{t("about", "qualifiedTeachersTitle")}</h3>
            <p className="text-gray-600 dark:text-gray-300">{t("about", "qualifiedTeachersText")}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4 dark:text-white">{t("about", "modernMethodsTitle")}</h3>
            <p className="text-gray-600 dark:text-gray-300">{t("about", "modernMethodsText")}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4 dark:text-white">{t("about", "individualApproachTitle")}</h3>
            <p className="text-gray-600 dark:text-gray-300">{t("about", "individualApproachText")}</p>
          </div>
        </div>

        {/* Mission */}
        <div className="bg-blue-50 dark:bg-blue-900 p-8 rounded-lg mb-16">
          <h2 className="text-2xl font-bold mb-4 text-center dark:text-white">{t("about", "ourMissionTitle")}</h2>
          <p className="text-gray-600 dark:text-gray-300 text-center">{t("about", "ourMissionText")}</p>
        </div>

        {/* Contact CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 dark:text-white">{t("about", "contactTitle")}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{t("about", "contactText")}</p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors dark:bg-blue-500 dark:hover:bg-blue-600">
            {t("about", "contactButton")}
          </button>
        </div>
      </div>
    </div>
  )
}

export default About

