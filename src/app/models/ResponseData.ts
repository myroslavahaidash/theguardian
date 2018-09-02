import NewsItem from './NewsItem';

export default class ResponseData {
  userTier: string;
  status: string;
  total: number;
  pageSize:	number;
  currentPage: number;
  pages: number;
  orderBy: string;
  results: NewsItem[];
}
