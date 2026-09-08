export interface TrustedByItem {
  id: string;
  name: string;
  logo: string;
  category: string;
  description: {
    id: string;
    en: string;
  };
  website?: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: {
    id: string;
    en: string;
  };
  company: string;
  avatar: string;
  rating: number;
  maxRating: number;
  date?: string;
  content: {
    id: string;
    en: string;
  };
  badge?: string;
}
