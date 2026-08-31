export interface ContactInfo {
  phone: string;
  email: string;
  linkedin: string;
  github: string;
}

export interface ExperienceRole {
  title: string;
  period: string;
  summary: string | null;
  highlights: string[];
}

export interface ExperienceCompany {
  company: string;
  location: string;
  roles: ExperienceRole[];
}

export interface EducationItem {
  institution: string;
  location: string;
  degree: string;
  period: string;
  gpa: string | null;
  summary: string | null;
  highlights: string[];
}

export interface ResumeData {
  name: string;
  title: string;
  contact: ContactInfo;
  summary: string;
  experience: ExperienceCompany[];
  education: EducationItem[];
}
