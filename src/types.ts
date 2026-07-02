export interface NewsPost {
  id: string;
  title: string;
  author: string;
  date: string;
  content: string;
  tags: string[];
}

export interface StorePackage {
  id: string;
  name: string;
  price: string;
  inrPrice?: string;
  description?: string;
  features: string[];
  detailedFeatures?: { category: string; items: string[] }[];
  image?: string;
  themeColor?: string;
  tag?: string;
}

export interface PlayerStats {
  rank: number;
  username: string;
  avatar: string;
  kills: number;
  playtime: string; // e.g. "120h 45m"
  wealth: number;
}

export interface ForumThread {
  id: string;
  title: string;
  author: string;
  replies: number;
  views: number;
  lastActive: string;
  category: string;
}
