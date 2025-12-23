import {inject, Injectable} from '@angular/core';
import {API_CONSTANTS} from '../constants';
import {HttpClient} from '@angular/common/http';
import {Observable, switchMap, timer} from 'rxjs';
import {DashboardData} from './dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private readonly BACKEND_BASE_PATH = `${API_CONSTANTS.BACKEND_BASE_PATH}`;
  private readonly http: HttpClient = inject(HttpClient);

  // Automatically refresh data every 5 seconds
  public getLiveStats = (): Observable<DashboardData> => {
    return timer(0, 5000).pipe(
      switchMap(() => this.http.get<DashboardData>(`${this.BACKEND_BASE_PATH}/dashboard`))
    );
  }

}
