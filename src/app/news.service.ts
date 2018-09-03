import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';

import NewListContentResponse from './models/NewListContentResponse';
import NewsListResponseData from './models/NewsListResponseData';
import NewsItemContentResponse from './models/NewsItemContentResponse';
import NewsItemResponseData from './models/NewsItemResponseData';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(
    private http: HttpClient
  ) { }

  private apiUrl: string = environment.apiUrl;
  private apiKey: string = environment.apiKey;

  getNews(pageNumber: number): Observable<NewsListResponseData> {
    return this.http.get<NewListContentResponse>(`${this.apiUrl}/search?page=${pageNumber}&api-key=${this.apiKey}`).pipe(
      map((data: NewListContentResponse) => data.response)
    );
  }

  getNewsShortText(newsId: string): Observable<string> {
    return this.http.get<NewsItemContentResponse>(`${this.apiUrl}/${newsId}?show-blocks=body&api-key=${this.apiKey}`).pipe(
      map((data: NewsItemContentResponse) => {
        return data.response.content.blocks.body[0].bodyTextSummary.slice(0, 300) + '...';
      })
    );
  }
}
