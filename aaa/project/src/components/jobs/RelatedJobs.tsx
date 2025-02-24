import React, { useState } from 'react';
import JobCard, { Job } from './JobCard';
import { useAuth } from '../../context/AuthContext';
import { AlertTriangle, X, Upload, Send } from 'lucide-react';

interface RelatedJobsProps {
  courseCategory: string;
  isCompleted: boolean;
}

const RelatedJobs: React.FC<RelatedJobsProps> = ({ courseCategory, isCompleted }) => {
  const { isAuthenticated } = useAuth();
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showWarning, setShowWarning] = useState(false);

  // Bu yerda backend API dan tegishli ishlarni olish kerak
  const jobs: Job[] = [
    {
      id: 1,
      title: "English Teacher",
      company: "Cambridge Learning Center",
      location: "Tashkent",
      salary: "4,000,000 - 8,000,000 so'm",
      description: "We are looking for an experienced English teacher to join our team.",
      requirements: [
        "IELTS 7.0 or equivalent",
        "Teaching experience",
        "Strong communication skills"
      ],
      type: "full-time",
      courseCategory: "english",
      postedDate: "2024-02-01",
      deadline: "2024-03-01",
      companyLogo: "/images/company-logos/cambridge.png"
    },
    // Boshqa ishlar...
  ];

  const handleApply = (jobId: number) => {
    if (!isAuthenticated) {
      // Autentifikatsiya modalini ko'rsatish
      return;
    }
    
    if (!isCompleted) {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 3000);
      return;
    }

    const job = jobs.find(j => j.id === jobId);
    if (job) {
      setSelectedJob(job);
      setShowApplicationModal(true);
    }
  };

  return (
    <div className="mt-8">
      <div className="border-l-4 border-blue-500 dark:border-blue-400 pl-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Ish imkoniyatlari
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-1">
          {isCompleted 
            ? "Siz kursni muvaffaqiyatli tugatdingiz! Quyidagi ish o'rinlariga ariza topshirishingiz mumkin."
            : "Quyidagi ish o'rinlari sizni kutmoqda. Ariza topshirish uchun kursni yakunlang."}
        </p>
      </div>

      {/* Ogohlantirish xabari */}
      {showWarning && (
        <div className="fixed top-4 right-4 z-50 w-full max-w-sm transform transition-all duration-300 ease-in-out">
          <div className="bg-yellow-50 dark:bg-yellow-900/50 border-l-4 border-yellow-500 dark:border-yellow-600 text-yellow-800 dark:text-yellow-200 p-4 rounded-lg shadow-lg">
            <div className="flex items-start space-x-4">
              <AlertTriangle className="w-5 h-5 text-yellow-500 dark:text-yellow-400" />
              <div className="flex-1">
                <p className="font-semibold">Kurs yakunlanmagan</p>
                <p className="text-sm mt-1 text-yellow-700 dark:text-yellow-300">
                  Ish o'rniga ariza topshirish uchun avval kursni yakunlang
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {jobs.filter(job => job.courseCategory === courseCategory).map(job => (
          <JobCard
            key={job.id}
            job={job}
            onApply={handleApply}
            isCompleted={isCompleted}
          />
        ))}
      </div>

      {/* Application Modal */}
      {showApplicationModal && selectedJob && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-lg w-full">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Ariza topshirish - {selectedJob.title}
                </h3>
                <button
                  onClick={() => setShowApplicationModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <form className="p-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    CV/Resume
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
                    <div className="space-y-2 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
                      <div className="flex text-sm text-gray-600 dark:text-gray-300">
                        <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300">
                          <span>Faylni yuklang</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            accept=".pdf,.doc,.docx"
                          />
                        </label>
                        <p className="pl-1">yoki bu yerga tashlang</p>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        PDF, DOC yoki DOCX (max. 10MB)
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    Xat
                  </label>
                  <textarea
                    className="w-full min-h-[120px] rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 text-gray-900 dark:text-gray-100 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 transition-colors"
                    placeholder="O'zingiz haqingizda qisqacha ma'lumot..."
                  />
                </div>

                <div className="flex items-center justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowApplicationModal(false)}
                    className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors"
                  >
                    Bekor qilish
                  </button>
                  <button
                    type="submit"
                    className="flex items-center px-6 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 shadow-sm hover:shadow transition-all"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Yuborish
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RelatedJobs;