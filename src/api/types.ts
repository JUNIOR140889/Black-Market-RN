export interface PaginateQuery<T> {
  results: T[];
  count: number;
  next: string | null;
  previous: string | null;
}

export type Pagination = {
  first_url: string;
  prev_url: string;
  page_url: string;
  next_url: string;
  last_url: string;
  count: number;
  page: number;
  items: number;
};

export type Category = {
  id: number;
  name: string;
  description: string;
};

export type Product = {
  id: number;
  title: string;
  description: string;
  state: string;
  stock: number;
  unitPrice: string;
  pictures: string[];
  category: Category;
  subcategories: Category[];
};

export type CartItem = {
  id: number;
  quantity: number;
  totalPriceInShoppingCart: string;
  product: Product;
};
