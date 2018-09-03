import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../news.service';
import NewsItem from '../../models/NewsItem';
import ResponseData from '../../models/NewsListResponseData';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit {

  constructor(
    private newsService: NewsService
  ) { }

  pageNumber = 1;
  newsItems: NewsItem[] = [];
  errorOccurred: boolean;
  selectedNewsId: string;
  totalPagesNumber: number;
  isLoading: boolean;

  ngOnInit() {
    this.getNews(this.pageNumber);
  }

  getNews(pageNumber: number): void {
    this.isLoading = true;
    this.newsService.getNews(pageNumber).subscribe((response: ResponseData)  => {
      this.errorOccurred = false;
      this.isLoading = false;
      this.newsItems = response.results;
      this.totalPagesNumber = response.pages;
    }, () => {
      this.isLoading = false;
      this.errorOccurred = true;
      this.newsItems = [];
    });
  }

  onRefresh(): void {
    this.getNews(this.pageNumber);
  }

  onSelectNewsItem(selectedNewsId: string): void {
    this.selectedNewsId = selectedNewsId;
  }

  onPageNumberChange(pageNumber: number): void {
    this.pageNumber = pageNumber;
    this.getNews(pageNumber);
  }

}
