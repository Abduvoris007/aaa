import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useLocation } from 'react-router-dom';

interface UserProfile {
  fullName: string;
  phone: string;
  birthDate: string;
  level: string;
  goals: string;
}

interface PurchasedCourse {
  id: number;
  title: string;
  progress: number;
  nextLesson: {
    date: string;
    time: string;
    topic: string;
    zoomLink: string;
  };
  materials: {
    title: string;
    type: 'video' | 'pdf' | 'quiz';
    completed: boolean;
    url: string;
  }[];
  teacher: {
    name: string;
    image: string;
  };
}

const Dashboard = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { addItem, isInCart } = useCart();
  const location = useLocation();
  
  // Payments tabini olib tashlaymiz
  const [activeTab, setActiveTab] = useState<'courses' | 'profile'>(
    location.state?.activeTab || 'courses'
  );
  const [profile, setProfile] = useState<UserProfile>({
    fullName: user?.name || '',
    phone: '',
    birthDate: '',
    level: '',
    goals: ''
  });

  // Sotib olingan kurslar
  const purchasedCourses: PurchasedCourse[] = [
    {
      id: 1,
      title: "General English",
      progress: 45,
      nextLesson: {
        date: "2024-03-20",
        time: "15:00",
        topic: "Present Perfect Tense",
        zoomLink: "https://zoom.us/j/123456789"
      },
      materials: [
        {
          title: "Grammar Video",
          type: "video",
          completed: true,
          url: "/materials/video1.mp4"
        },
        {
          title: "Workbook Unit 3",
          type: "pdf",
          completed: false,
          url: "/materials/workbook3.pdf"
        },
        {
          title: "Progress Test",
          type: "quiz",
          completed: false,
          url: "/quiz/unit3"
        }
      ],
      teacher: {
        name: "Sarah Johnson",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
      }
    },
    {
      id: 2,
      title: "IELTS Preparation",
      progress: 30,
      nextLesson: {
        date: "2024-03-21",
        time: "17:00",
        topic: "Writing Task 2",
        zoomLink: "https://zoom.us/j/987654321"
      },
      materials: [
        {
          title: "Writing Strategies",
          type: "video",
          completed: true,
          url: "/materials/writing-video.mp4"
        },
        {
          title: "Practice Tests",
          type: "pdf",
          completed: false,
          url: "/materials/practice-tests.pdf"
        }
      ],
      teacher: {
        name: "Michael Brown",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
      }
    }
  ];

  // Tavsiya etilgan kurslar
  const recommendedCourses = [
    {
      id: 3,
      title: "IELTS Advanced",
      level: "Advanced",
      duration: "3 months",
      price: "600,000 so'm/oy",
      image: "/images/ielts-advanced.jpg",
      description: "IELTS 7.0+ ball olish uchun maxsus kurs"
    },
    {
      id: 4,
      title: "Business English Pro",
      level: "Upper-Intermediate",
      duration: "2 months",
      price: "500,000 so'm/oy",
      image: "/images/business-english.jpg",
      description: "Biznes ingliz tili va professional muloqot"
    }
  ];

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // Backend bilan integratsiya
    console.log('Profile updated:', profile);
  };

  const handlePurchaseCourse = (course: any) => {
    addItem({
      id: course.id,
      title: course.title,
      price: course.price,
      duration: course.duration,
      level: course.level,
      image: course.image
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{t('dashboard', 'title')}</h1>

      {/* Tab Menu - payments tabini olib tashlaymiz */}
      <div className="flex border-b mb-8">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 ${
            activeTab === 'profile'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 hover:text-blue-600'
          }`}
        >
          {('profile')}
        </button>
        <button
          onClick={() => setActiveTab('courses')}
          className={`px-4 py-2 ${
            activeTab === 'courses'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 hover:text-blue-600'
          }`}
        >
          {('myCourses')}
        </button>
      </div>

      {/* Profil ma'lumotlari */}
      {activeTab === 'profile' && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Shaxsiy Ma'lumotlar</h2>
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">To'liq ism</label>
              <input
                type="text"
                value={profile.fullName}
                onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                className="w-full p-2 border rounded"
                placeholder="To'liq ismingizni kiriting"
                title="To'liq ism"
                aria-label="To'liq ism"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Telefon</label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile({...profile, phone: e.target.value})}
                className="w-full p-2 border rounded"
                placeholder="Telefon raqamingizni kiriting"
                title="Telefon raqam"
                aria-label="Telefon raqam"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Tug'ilgan sana</label>
              <input
                type="date"
                value={profile.birthDate}
                onChange={(e) => setProfile({...profile, birthDate: e.target.value})}
                className="w-full p-2 border rounded"
                title="Tug'ilgan sana"
                aria-label="Tug'ilgan sana"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Ingliz tili darajasi</label>
              <select
                value={profile.level}
                onChange={(e) => setProfile({...profile, level: e.target.value})}
                className="w-full p-2 border rounded"
                title="Ingliz tili darajasi"
                aria-label="Ingliz tili darajasi"
              >
                <option value="">Tanlang</option>
                <option value="A1">Beginner (A1)</option>
                <option value="A2">Elementary (A2)</option>
                <option value="B1">Intermediate (B1)</option>
                <option value="B2">Upper-Intermediate (B2)</option>
                <option value="C1">Advanced (C1)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">O'rganish maqsadi</label>
              <textarea
                value={profile.goals}
                onChange={(e) => setProfile({...profile, goals: e.target.value})}
                className="w-full p-2 border rounded"
                rows={4}
                placeholder="O'rganish maqsadingizni kiriting"
                title="O'rganish maqsadi"
                aria-label="O'rganish maqsadi"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Saqlash
            </button>
          </form>
        </div>
      )}

      {/* Kurslar ro'yxati */}
      {activeTab === 'courses' && (
        <div className="space-y-8">
          {/* Sotib olingan kurslar */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Mening kurslarim</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {purchasedCourses.map((course) => (
                <div key={course.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-bold">{course.title}</h3>
                      <div className="text-sm text-gray-600">
                        Progress: {course.progress}%
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
                      <div 
                        className={`bg-blue-600 h-2.5 rounded-full w-[${course.progress}%]`}
                      />
                    </div>

                    {/* Next Lesson */}
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Keyingi dars:</h4>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="flex justify-between mb-2">
                          <span>{course.nextLesson.date}</span>
                          <span>{course.nextLesson.time}</span>
                        </div>
                        <p className="text-gray-600 mb-2">{course.nextLesson.topic}</p>
                        <a
                          href={course.nextLesson.zoomLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700"
                        >
                          Zoom orqali qo'shilish
                        </a>
                      </div>
                    </div>

                    {/* Teacher */}
                    <div className="flex items-center mt-4">
                      <img
                        src={course.teacher.image}
                        alt={course.teacher.name}
                        className="w-10 h-10 rounded-full object-cover mr-3"
                      />
                      <div>
                        <div className="font-medium">{course.teacher.name}</div>
                        <div className="text-sm text-gray-600">O'qituvchi</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tavsiya etilgan kurslar */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Tavsiya etilgan kurslar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendedCourses.map((course) => (
                <div key={course.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                    <p className="text-gray-600 mb-4">{course.description}</p>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-600">{course.level}</p>
                        <p className="text-sm text-gray-600">{course.duration}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-blue-600 font-bold mb-2">{course.price}</p>
                        <button 
                          onClick={() => handlePurchaseCourse(course)}
                          className={`px-4 py-2 rounded-lg transition-colors ${
                            isInCart(course.id)
                              ? 'bg-green-600 hover:bg-green-700 text-white'
                              : 'bg-blue-600 hover:bg-blue-700 text-white'
                          }`}
                        >
                          {isInCart(course.id) ? 'Savatda' : 'Sotib olish'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard; 