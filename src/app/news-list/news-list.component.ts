import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';
import NewsItem from '../models/NewsItem';

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
  newsItems: NewsItem[];
  errorOccurred: boolean;
  selectedNewsId: string;
  totalPagesNumber: number;

  ngOnInit() {
    this.getNews(this.pageNumber);
  }

  getNews(pageNumber) {
    this.newsService.getNews(pageNumber).subscribe(response  => {
      this.newsItems = response.results;
      this.totalPagesNumber = response.pages;
    }, err => {
      this.errorOccurred = true;
      this.newsItems = [];
    });
  }

  onRefresh() {
    this.getNews(this.pageNumber);
  }

  onSelectNewsItem(selectedNewsId) {
    this.selectedNewsId = selectedNewsId;
  }

  onPageNumberChange(pageNumber) {
    this.pageNumber = pageNumber;
    this.getNews(pageNumber);
  }

}
