export interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  status: 'studying' | 'graduated';
  duration?: string;  // For current students (e.g., "2-kurs")
  graduationYear?: string;  // For graduates
  description?: string;
  type: 'education' | 'course' | 'training'; // Ta'lim turi
  startDate: Date;
  endDate?: Date;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  status: 'current' | 'previous';
  duration?: string;  // For current job
  startYear: string;
  endYear?: string;  // For previous jobs
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface Language {
  id: string;
  name: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
}

export interface Resume {
  userId: string;
  fullName: string;
  title: string;
  about: string;
  phone: string;
  email: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  languages: Language[];
  certificates: string[];
  avatar?: string;
  isPublic: boolean;
} 