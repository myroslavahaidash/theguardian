import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { environment } from '../environments/environment';
import { map } from 'rxjs/operators';
import ContentResponse from './models/ContentResponse';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(
    private http: HttpClient
  ) { }

  private apiUrl = environment.apiUrl;
  private apiKey = environment.apiKey;

  getNews(pageNumber) {
    return this.http.get(`${this.apiUrl}/search?page=${pageNumber}&api-key=${this.apiKey}`).pipe(
      map((data: ContentResponse) => data.response)
    );
  }

  getShortText(newsId) {
    return this.http.get(`${this.apiUrl}/${newsId}?show-blocks=body&api-key=${this.apiKey}`).pipe(
      map((data: ContentResponse) => data.response.content.blocks.body[0].bodyTextSummary.slice(0, 300) + '...')
    );
  }
}
