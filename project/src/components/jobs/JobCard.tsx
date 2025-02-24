import React from 'react';
import { MapPin, DollarSign, Calendar, Clock } from 'lucide-react';

export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  requirements: string[];
  type: string;
  courseCategory: string;
  postedDate: string;
  deadline: string;
  companyLogo: string;
}

interface JobCardProps {
  job: Job;
  onApply: (jobId: number) => void;
  isCompleted?: boolean;
}

const JobCard: React.FC<JobCardProps> = ({ job, onApply, isCompleted = false }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 sm:p-6 mb-4 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-all hover:shadow-lg dark:shadow-gray-900/30">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
        <div className="flex items-start">
          <div className="relative flex-shrink-0">
            <img 
              src={job.companyLogo} 
              alt={job.company} 
              className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100 dark:ring-gray-700"
            />
          </div>
          <div className="ml-4">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
              {job.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">{job.company}</p>
          </div>
        </div>
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
          job.type === 'full-time' 
            ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' 
            : job.type === 'part-time' 
            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300'
            : 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300'
        }`}>
          {job.type}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <div className="flex items-center text-gray-600 dark:text-gray-300">
          <MapPin className="w-5 h-5 mr-2 text-gray-400 dark:text-gray-500" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center text-gray-600 dark:text-gray-300">
          <DollarSign className="w-5 h-5 mr-2 text-gray-400 dark:text-gray-500" />
          <span>{job.salary}</span>
        </div>
      </div>

      <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
        {job.description}
      </p>

      <div className="mb-4">
        <h4 className="font-medium text-gray-900 dark:text-white mb-2">Talablar:</h4>
        <ul className="space-y-1">
          {job.requirements.map((req, index) => (
            <li key={index} className="flex items-start">
              <span className="mr-2 text-blue-500 dark:text-blue-400">•</span>
              <span className="text-gray-600 dark:text-gray-300">{req}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            <span>E'lon: {job.postedDate}</span>
          </div>
          <div className="hidden sm:block">•</div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>Muddat: {job.deadline}</span>
          </div>
        </div>
        <button
          onClick={() => onApply(job.id)}
          disabled={!isCompleted}
          className={`px-6 py-2 rounded-lg transition-all ${
            isCompleted 
              ? 'bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 shadow-sm hover:shadow'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
          }`}
        >
          {isCompleted ? 'Ariza topshirish' : 'Kursni yakunlang'}
        </button>
      </div>
    </div>
  );
};

export default JobCard;