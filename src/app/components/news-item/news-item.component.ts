import { Component, OnChanges, SimpleChanges, Input, EventEmitter, Output } from '@angular/core';
import { trigger, style, animate, transition, group } from '@angular/animations';

import NewsItem from '../../models/NewsItem';
import { NewsService } from '../../news.service';

@Component({
  selector: 'app-news-item',
  animations: [
    trigger(
      'showAnimation', [
        transition(':leave', [
          style({height: '*', opacity: 1}),

          group([
            animate(150, style({height: 0})),
            animate('50ms ease-in-out', style({opacity: 0}))
          ])

        ]),
        transition(':enter', [
          style({height: 0, opacity: 0}),

          group([
            animate(200, style({height: '*'})),
            animate('300ms ease-in-out', style({opacity: 1}))
          ])

        ])
      ]
    )
  ],

  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss']
})
export class NewsItemComponent implements OnChanges {

  constructor(
    private newsService: NewsService
  ) { }

  @Input() newsItem: NewsItem;
  @Input() isOpen: boolean;
  @Output() selectId = new EventEmitter<string>();

  shortText: string;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.isOpen && changes.isOpen.currentValue) {
      this.newsService.getNewsShortText(this.newsItem.id).subscribe((shortText: string) => {
        this.shortText = shortText;
      }, () => {
        this.shortText = 'Oops, can\'t load news text...';
      });
    }
  }

  onToggleShowText(): void {
    this.selectId.emit(this.isOpen ? null : this.newsItem.id);
  }
}
