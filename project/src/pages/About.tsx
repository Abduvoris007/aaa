import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import BackButton from '../components/common/BackButton';

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-8">
      <BackButton />
      <div className="max-w-4xl mx-auto">
        {/* Main Title */}
        <h1 className="text-4xl font-bold text-center mb-8">
          {t('about', 'title')}
        </h1>

        {/* Introduction */}
        <div className="mb-12 text-center">
          <p className="text-xl text-gray-600 mb-6">
            {t('about', 'introduction')}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">5+</div>
            <div className="text-gray-600">{t('about', 'yearsExperience')}</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">1000+</div>
            <div className="text-gray-600">{t('about', 'students')}</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">20+</div>
            <div className="text-gray-600">{t('about', 'teachers')}</div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">{t('about', 'onlineLearningTitle')}</h3>
            <p className="text-gray-600">{t('about', 'onlineLearningText')}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">{t('about', 'qualifiedTeachersTitle')}</h3>
            <p className="text-gray-600">{t('about', 'qualifiedTeachersText')}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">{t('about', 'modernMethodsTitle')}</h3>
            <p className="text-gray-600">{t('about', 'modernMethodsText')}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">{t('about', 'individualApproachTitle')}</h3>
            <p className="text-gray-600">{t('about', 'individualApproachText')}</p>
          </div>
        </div>

        {/* Mission */}
        <div className="bg-blue-50 p-8 rounded-lg mb-16">
          <h2 className="text-2xl font-bold mb-4 text-center">{t('about', 'ourMissionTitle')}</h2>
          <p className="text-gray-600 text-center">{t('about', 'ourMissionText')}</p>
        </div>

        {/* Contact CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">{t('about', 'contactTitle')}</h2>
          <p className="text-gray-600 mb-6">{t('about', 'contactText')}</p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            {t('about', 'contactButton')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;