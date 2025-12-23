import {inject, Injectable} from '@angular/core';
import {catchError, map, Observable, throwError} from 'rxjs';
import {API} from '../constants';
import {HttpClient} from '@angular/common/http';
import {GlobalResponse, MessageRequest, MessageResponse} from './message.model';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private http: HttpClient = inject(HttpClient);

  public messages = (): Observable<MessageResponse[]> => {
    return this.http.get<GlobalResponse<MessageResponse[]>>(API.MESSAGES.BASE)
      .pipe(
        map((response: GlobalResponse<MessageResponse[]>) => {
          return response.data;
        }),
        catchError(error => {
          console.error('Error:', error);
          return throwError(() => error);
        })
      );
  }
  public send = (request: MessageRequest): Observable<MessageResponse> => {
    return this.http.post(API.MESSAGES.BASE, request)
      .pipe(
        map((response: GlobalResponse<MessageResponse>) => {
          return response.data;
        }),
        catchError(error => {
          console.error('Error:', error);
          return throwError(() => error);
        })
      )
  }


}
