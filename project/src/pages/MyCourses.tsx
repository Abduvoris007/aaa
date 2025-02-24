import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

interface LeaveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  courseName: string;
}

const LeaveModal: React.FC<LeaveModalProps> = ({ isOpen, onClose, onConfirm, courseName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h3 className="text-xl font-semibold mb-4">Kursni tark etish</h3>
        <p className="mb-6">Siz rostdan ham "{courseName}" kursini tark etishni xohlaysizmi?</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Bekor qilish
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Tark etish
          </button>
        </div>
      </div>
    </div>
  );
};

const MyCourses: React.FC = () => {
  const { purchasedCourses, removePurchasedCourse } = useCart();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  const handleLeaveCourse = (course: any) => {
    setSelectedCourse(course);
    setModalOpen(true);
  };

  const confirmLeaveCourse = () => {
    if (selectedCourse) {
      removePurchasedCourse(selectedCourse.id);
      setModalOpen(false);
      setSelectedCourse(null);
    }
  };

  if (!purchasedCourses.length) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Mening darslarim</h1>
        <p className="text-gray-600">Siz hali hech qanday kursga yozilmagansiz.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Mening darslarim</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {purchasedCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <div className="flex justify-between items-center">
                <button
                  onClick={() => navigate(`/courses/${course.id}`)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Darsga o'tish
                </button>
                <button
                  onClick={() => handleLeaveCourse(course)}
                  className="text-red-600 hover:text-red-700"
                >
                  Kursni tark etish
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <LeaveModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmLeaveCourse}
        courseName={selectedCourse?.title || ''}
      />
    </div>
  );
};

export default MyCourses;
