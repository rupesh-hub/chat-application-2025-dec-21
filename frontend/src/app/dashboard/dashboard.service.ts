import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, switchMap, timer} from 'rxjs';
import {DashboardData} from './dashboard.model';
import {API} from '../constants';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private readonly http: HttpClient = inject(HttpClient);

  // Automatically refresh data every 5 seconds
  public getLiveStats = (): Observable<DashboardData> => {
    return timer(0, 5000).pipe(
      switchMap(() =>
        this.http.get<DashboardData>(API.DASHBOARD.BASE)
      )
    );
  }

}
