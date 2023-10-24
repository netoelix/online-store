import { APISearchItem } from './apiSearchItem';

export type APISearchResults = {
  query: string;
  results: APISearchItem[];
};
