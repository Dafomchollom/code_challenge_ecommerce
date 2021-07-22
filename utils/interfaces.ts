// Recommendation interface
export interface Recommendations {
  src: string;
  alt: string;
}
// Dimentions Interface
export interface Dimmentions {
  width: number;
  height: number;
}
// Image Interface
export interface Images {
  src: string;
  alt: string;
}
// Details interface
export interface Details {
  dimmentions?: Dimmentions;
  size?: number;
  description?: string;
  recommendations?: Recommendations[];
}
// Featured product Interface
export interface AppFeatureProductInterface {
  productObj: {
    name: string;
    category: string;
    price: number;
    currency: string;
    image: Images;
    details?: Details;
  };
}
