export interface Workshop {
  name: string;
  description: string;
  category: string;
  gallery: string[];
  offerings: [];
  reviews: Review[];
  _instructor: Instructor;
}

export interface Instructor {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface Review {
  rating: number;
  text: string;
}