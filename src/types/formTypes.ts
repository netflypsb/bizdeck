export interface FormData {
  profilePic: string;
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  tagline: string;
  linkedin: string;
  twitter: string;
  whatsapp: string;
  telegram: string;
  tiktok: string;
  specialties: string[];
  skills: string[];
  services: string[];
  ctaButtons: Array<{ text: string; link: string; color: string; enabled: boolean }>;
  otherLinks: Array<{ title: string; url: string }>;
  experiences: Array<{
    jobTitle: string;
    organization: string;
    startDate: string;
    endDate: string;
    currentlyWorking: boolean;
    responsibilities: string;
  }>;
  education: Array<{
    degree: string;
    institution: string;
    startDate: string;
    graduationDate: string;
    achievements: string;
  }>;
  displaySections: {
    specialties: boolean;
    skills: boolean;
    services: boolean;
  };
}