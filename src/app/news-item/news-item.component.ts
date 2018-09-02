import { Component, OnInit, OnChanges, SimpleChanges, SimpleChange, Input, EventEmitter, Output } from '@angular/core';
import NewsItem from '../models/NewsItem';

import { NewsService } from '../news.service';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss']
})
export class NewsItemComponent implements OnInit, OnChanges {

  constructor(
    private newsService: NewsService
  ) { }

  @Input() newsItem: NewsItem;
  @Input() isOpen: boolean;
  shortText: string;
  @Output() selectId = new EventEmitter<string>();

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.isOpen && changes.isOpen.currentValue) {
      this.newsService.getShortText(this.newsItem.id).subscribe(shortText => {
        this.shortText = shortText;
      });
    }
  }

  onShowText() {
    this.selectId.emit(this.isOpen ? null : this.newsItem.id);
  }
}
