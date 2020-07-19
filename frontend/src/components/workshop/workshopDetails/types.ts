export interface Workshop {
  name: string;
  description: string;
  category: string;
  gallery: string[];
  offerings: Offering[];
  reviews: Review[];
  _instructor: Instructor;
  rating: number;
  _id: string;
}

export interface Instructor {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface Review {
  rating: number;
  description: string;
  email: string;
  name: string;
}

export interface Offering {
  price: number;
  startDate: Date;
  endDate: Date;
  location: string;
  capacity: number;
  occupied: number;
  _id: string;
}
