import { Component, OnInit } from '@angular/core';
import { NewsService } from './news.service';
import NewsItem from './models/NewsItem';
import { FormControl } from '@angular/forms';
import {debounceTime, distinctUntilChanged, filter} from 'rxjs/internal/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private newsService: NewsService
  ) {}

  newsItems: NewsItem[];
  errorOccurred: boolean;
  selectedNewsId: string;
  shortText: string;
  total: number;
  currentPageNumberControl = new FormControl(1);


  getNews(pageNumber) {
    this.newsService.getNews(pageNumber).subscribe(response  => {
      this.newsItems = response.results;
      this.total = response.total;
      console.log(response);
      }, err => this.errorOccurred = true);
  }

  ngOnInit(): void {
    this.getNews(this.currentPageNumberControl.value);
    this.currentPageNumberControl.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      filter(value => value)
    )
      .subscribe(pageNumber => this.getNews(pageNumber));
  }

  onRefresh() {
    this.getNews(this.currentPageNumberControl.value);
  }

  onShowText(id) {
    if (id === this.selectedNewsId) {
      this.shortText = null;
      this.selectedNewsId = null;
    } else {
      this.newsService.getShortText(id).subscribe(shortText => {
        this.selectedNewsId = id;
        this.shortText = shortText;
      });
    }
  }
}
