import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Camera, Upload, ChevronRight, ChevronLeft, Check } from 'lucide-react';
import BackButton from '../components/common/BackButton';
import AuthModal from '../components/auth/AuthModal';
import Notification from '../components/common/Notification';

interface Document {
  number: string;
  image: File | null;
  previewUrl: string;
}

interface JobApplication {
  passport: Document;
  drivingLicense: Document;
  diploma: Document;
  certificates: Document[];
  position: string;
  fullName: string;
  email: string;
  phone: string;
  experience: string;
  education: string;
  englishLevel: string;
  coverLetter: string;
}

const initialDocumentState = {
  number: '',
  image: null,
  previewUrl: ''
};

const Jobs = () => {
  const { isAuthenticated, user } = useAuth();
  const { t } = useLanguage();
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [application, setApplication] = useState<JobApplication>({
    passport: { ...initialDocumentState },
    drivingLicense: { ...initialDocumentState },
    diploma: { ...initialDocumentState },
    certificates: [],
    position: '',
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    experience: '',
    education: '',
    englishLevel: '',
    coverLetter: ''
  });
  const [notification, setNotification] = useState<{
    isOpen: boolean;
    message: string;
    type: 'success' | 'info' | 'error';
  }>({ isOpen: false, message: '', type: 'info' });

  const handleApplyClick = () => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
    } else {
      setShowApplicationForm(true);
    }
  };

  const countries = [
    {
      id: 1,
      name: "Amerika Qo'shma Shtatlari",
      flag: "🇺🇸",
      positions: [
        {
          title: "English Teacher",
          salary: "$3,500 - $5,000",
          requirements: [
            "CELTA/TESOL sertifikati",
            "2+ yillik o'qitish tajribasi",
            "C1 darajadagi ingliz tili",
            "Bachelor's degree"
          ],
          benefits: [
            "Viza sponsorligi",
            "Bepul turar joy",
            "Tibbiy sug'urta",
            "Yo'l xarajatlari qoplanadi"
          ]
        }
      ]
    },
    {
      id: 2,
      name: "Buyuk Britaniya",
      flag: "🇬🇧",
      positions: [
        {
          title: "IELTS Instructor",
          salary: "£2,500 - £3,500",
          requirements: [
            "IELTS 8.0+",
            "3+ yillik IELTS o'qitish tajribasi",
            "Master's degree afzallik",
            "Ingliz tilida erkin muloqot"
          ],
          benefits: [
            "Tier 2 viza sponsorligi",
            "Relocation package",
            "Professional development",
            "Pension scheme"
          ]
        }
      ]
    },
    {
      id: 3,
      name: "Kanada",
      flag: "🇨🇦",
      positions: [
        {
          title: "ESL Teacher",
          salary: "CAD 4,000 - 5,500",
          requirements: [
            "TESL Canada sertifikati",
            "Bachelor's degree",
            "2+ yillik tajriba",
            "Ingliz tilida C1 daraja"
          ],
          benefits: [
            "Work permit sponsorship",
            "Accommodation assistance",
            "Health insurance",
            "Professional development"
          ]
        }
      ]
    }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, documentType: keyof JobApplication) => {
    const file = event.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setApplication(prev => ({
        ...prev,
        [documentType]: {
          ...prev[documentType],
          image: file,
          previewUrl
        }
      }));
    }
  };

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>, documentType: keyof JobApplication) => {
    const { value } = event.target;
    setApplication(prev => ({
      ...prev,
      [documentType]: {
        ...prev[documentType],
        number: value
      }
    }));
  };

  const renderDocumentStep = (title: string, documentType: keyof JobApplication, description: string) => (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>
      <p className="text-gray-600 mb-8 text-center">{description}</p>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hujjat raqami
          </label>
          <input
            type="text"
            value={application[documentType].number}
            onChange={(e) => handleNumberChange(e, documentType)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Hujjat raqamini kiriting"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hujjat rasmi
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            {application[documentType].previewUrl ? (
              <div className="relative">
                <img
                  src={application[documentType].previewUrl}
                  alt="Preview"
                  className="max-h-48 mx-auto rounded-lg"
                />
                <button
                  onClick={() => setApplication(prev => ({
                    ...prev,
                    [documentType]: { ...initialDocumentState }
                  }))}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                >
                  ✕
                </button>
              </div>
            ) : (
              <div>
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <label className="block mt-2">
                  <span className="text-blue-600 hover:text-blue-700 cursor-pointer">
                    Rasmni tanlang
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, documentType)}
                  />
                </label>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        {currentStep > 1 && (
          <button
            onClick={() => setCurrentStep(prev => prev - 1)}
            className="flex items-center px-6 py-2 text-gray-600 hover:text-gray-800"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Orqaga
          </button>
        )}
        <button
          onClick={() => setCurrentStep(prev => prev + 1)}
          disabled={!application[documentType].number || !application[documentType].image}
          className={`flex items-center px-6 py-2 rounded-lg ${
            application[documentType].number && application[documentType].image
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Keyingisi
          <ChevronRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return renderDocumentStep(
          'Passport ma\'lumotlari',
          'passport',
          'Passportingiz ma\'lumotlarini kiriting va rasmini yuklang'
        );
      case 2:
        return renderDocumentStep(
          'Haydovchilik guvohnomasi',
          'drivingLicense',
          'Haydovchilik guvohnomangiz ma\'lumotlarini kiriting va rasmini yuklang'
        );
      case 3:
        return renderDocumentStep(
          'Diplom',
          'diploma',
          'Diplomingiz ma\'lumotlarini kiriting va rasmini yuklang'
        );
      case 4:
        return (
          <div className="max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold mb-6">Тасдиқлаш</h3>
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h4 className="font-medium mb-4">Юборилган маълумотлар:</h4>
              <ul className="space-y-2">
                <li><span className="font-medium">Ф.И.Ш:</span> {application.fullName}</li>
                <li><span className="font-medium">Email:</span> {application.email}</li>
                <li><span className="font-medium">Телефон:</span> {application.phone}</li>
                <li><span className="font-medium">Тажриба:</span> {application.experience}</li>
                <li><span className="font-medium">Таълим:</span> {application.education}</li>
                <li><span className="font-medium">Инглиз тили даражаси:</span> {application.englishLevel}</li>
              </ul>
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => setCurrentStep(3)}
                className="px-6 py-2 text-gray-600 hover:text-gray-800"
              >
                <ChevronLeft className="w-5 h-5 inline-block mr-2" />
                Орқага
              </button>
              <button
                onClick={() => handleSubmitApplication()}
                className="bg-blue-600 text-white px-8 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                Тасдиқлаш
                <Check className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const handleSubmitApplication = async () => {
    // Show processing notification
    setNotification({
      isOpen: true,
      message: 'Сизнинг ҳужжатларингиз кўрилмоқда...',
      type: 'info'
    });

    // Close the form
    setShowApplicationForm(false);

    // Simulate processing delay
    setTimeout(() => {
      // Show success notification
      setNotification({
        isOpen: true,
        message: 'Ҳужжатларингиз қабул қилинди. Тез орада сиз билан алоқага чиқамиз!',
        type: 'success'
      });
    }, 3000);
  };

  if (showApplicationForm) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Ариза топшириш</h2>
              <button
                onClick={() => setShowApplicationForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {/* Progress bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="flex justify-between mb-2">
                {['Passport', 'Guvohnoma', 'Diplom', 'Tasdiqlash'].map((step, index) => (
                  <div
                    key={step}
                    className={`text-sm ${
                      currentStep > index + 1
                        ? 'text-green-600'
                        : currentStep === index + 1
                        ? 'text-blue-600'
                        : 'text-gray-400'
                    }`}
                  >
                    {step}
                  </div>
                ))}
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                />
              </div>
            </div>

            {renderStep()}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <BackButton />
        <h1 className="text-3xl font-bold ml-4">Хорижда ишлаш</h1>
      </div>

      {/* Country Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {countries.map((country) => (
          <div 
            key={country.id}
            className={`bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105 ${
              selectedCountry === country.name ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => setSelectedCountry(country.name)}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">{country.name}</h2>
                <span className="text-4xl">{country.flag}</span>
              </div>
              {country.positions.map((position, index) => (
                <div key={index}>
                  <h3 className="text-xl font-semibold mb-2">{position.title}</h3>
                  <p className="text-blue-600 font-bold mb-4">{position.salary}</p>
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Talablar:</h4>
                    <ul className="space-y-1">
                      {position.requirements.map((req, i) => (
                        <li key={i} className="text-gray-600 flex items-center">
                          <span className="mr-2">•</span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Imtiyozlar:</h4>
                    <ul className="space-y-1">
                      {position.benefits.map((benefit, i) => (
                        <li key={i} className="text-gray-600 flex items-center">
                          <span className="mr-2">✓</span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
              <button
                className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                onClick={handleApplyClick}
              >
                Ariza topshirish
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        customMessage="Ариза топшириш учун аввал рўйхатдан ўтинг"
      />

      {/* Notification */}
      <Notification
        isOpen={notification.isOpen}
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification(prev => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
};

export default Jobs;