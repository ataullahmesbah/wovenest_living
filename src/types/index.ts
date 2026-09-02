export type Category = {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  parentId?: string | null;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  salePrice?: number | null;
  categorySlug: string;
  images: string[];
  colors: { name: string; hex: string }[];
  material: string;
  dimensions: string;
  stock: number;
  rating: number;
  reviewCount: number;
  isFeatured: boolean;
  isNew: boolean;
  isBestSeller: boolean;
  tags: string[];
  createdAt: string;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string[];
  coverImage: string;
  tags: string[];
  author: string;
  publishedAt: string;
  readingTime: number;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  review: string;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  category: string;
};

export type CartLine = {
  productId: string;
  quantity: number;
  color?: string;
};
