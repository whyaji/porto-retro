export interface TrustedByItem {
  id: string;
  name: string;
  logo: string;
  category: {
    id: string;
    en: string;
  } | string;
  relationship?: {
    id: string;
    en: string;
  };
  description: {
    id: string;
    en: string;
  };
  highlights?: {
    id: string[];
    en: string[];
  };
  bgDark?: boolean;
  withLabel?: boolean;
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
