export interface Program {
  _id: string;
  uuid: string;
  name: string;
  contact_email: string;
  commission_in_percentage: number;
  commission_in_percentage_formatted: string;
  commission_amount: number;
  commission_amount_formatted: string;
  duration: string;
  cash_limit: string;
  cash_limit_per_referal: string;
  promoted: number;
  is_international: number;
  commission_type: string | null;
  product_type: object | null;
  platform: any;
  tags: any[];
  langs: any[];
  current_user_apply?: any[];
  current_favorite_user?: any[];
  average_ratings?: any[];
  current_user_review?: any[];
  link_data?: object;
  link?: string;
  description?: string;
  image?: string;
  contacts?: Array<string>;
  up_votes: string[];
  down_votes: string[];
}

export interface Comment {
  _id: string;
  user: any;
  program: object;
  content: string;
  up_votes: string[];
  down_votes: string[];
  createdAt: string;
}
