import React from 'react';
import { Clock, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  level: string;
  duration: string;
  students: number;
  rating: number;
  image: string;
}

export default function CourseCard({
  id,
  title,
  description,
  level,
  duration,
  students,
  rating,
  image
}: CourseCardProps) {
  return (
    <Link 
      to={`/course/${id}`} 
      className="block w-full sm:w-auto"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 dark:shadow-gray-900/30 hover:scale-[1.02]">
        <div className="relative">
          <img
            src={image}
            alt={title}
            className="w-full h-48 sm:h-52 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
        <div className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/50 px-3 py-1 rounded-full">
              {level}
            </span>
            <div className="flex items-center text-yellow-400">
              <Star className="h-4 w-4 fill-current" />
              <span className="ml-1 text-sm text-gray-600 dark:text-gray-300">{rating}</span>
            </div>
          </div>
          
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
            {description}
          </p>
          
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 flex-wrap gap-2">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              <span>{students.toLocaleString()} students</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}