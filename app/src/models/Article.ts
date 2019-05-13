export interface Comment {
  id: string;
  authorId: string;
  date: Date;
  content: string;
}

export interface Article {
  id: string;
  authorId: string;
  datePublished: string;
  dateModified: string;
  headline: string;
  description: string;
  content: string;
  comments?: Comment[];
}