import {Component, inject, OnInit} from '@angular/core';
import {CommonModule, KeyValuePipe} from '@angular/common';
import {DashboardService} from '../../dashboard/dashboard.service';
import {Observable} from 'rxjs';
import {DashboardData} from '../../dashboard/dashboard.model';

@Component({
  selector: 'chat-system-analytics',
  imports: [CommonModule, KeyValuePipe],
  standalone: true,
  template: `
    @if (stats$ | async; as data) {
      <div class="min-h-screen bg-slate-50 p-8 font-sans">
        <div class="max-w-6xl mx-auto">

          <header class="flex justify-between items-end mb-10">
            <div>
              <h1 class="text-3xl font-bold text-slate-900 tracking-tight">System Control Tower</h1>
              <p class="text-slate-500 mt-1">Real-time telemetry for Chat Service Backend</p>
            </div>
            <div [ngClass]="getHealthClass(data.healthStatus)"
                 class="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm flex items-center gap-2">
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                      [ngClass]="data.healthStatus === 'UP' ? 'bg-green-400' : 'bg-red-400'"></span>
                <span class="relative inline-flex rounded-full h-2 w-2"
                      [ngClass]="data.healthStatus === 'UP' ? 'bg-green-500' : 'bg-red-500'"></span>
              </span>
              {{ data.healthStatus }}
            </div>
          </header>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <div class="flex items-center gap-3 mb-6">
                <div class="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                       stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"/>
                  </svg>
                </div>
                <h3 class="font-bold text-slate-800">Deployment Info</h3>
              </div>

              <div class="space-y-4">
                @for (item of data.info | keyvalue; track item.key) {
                  <div class="flex justify-between items-center text-sm">
                    <span class="text-slate-500 capitalize">{{ item.key }}</span>
                    <span class="font-semibold text-slate-700 bg-slate-50 px-2 py-1 rounded">{{ item.value }}</span>
                  </div>
                }
              </div>
            </div>

            <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <div class="flex items-center gap-3 mb-6">
                <div class="p-2 bg-orange-50 text-orange-600 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                       stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                  </svg>
                </div>
                <h3 class="font-bold text-slate-800">Live Resources</h3>
              </div>

              <div class="space-y-4">
                @for (item of data.system | keyvalue; track item.key) {
                  <div class="flex justify-between items-center text-sm">
                    <span class="text-slate-500 capitalize">{{ item.key }}</span>
                    <span class="font-semibold text-slate-700">{{ item.value }}</span>
                  </div>
                }
              </div>
            </div>

            <div class="bg-slate-900 rounded-2xl p-6 shadow-xl text-white">
              <h3 class="text-slate-400 text-xs font-bold uppercase tracking-widest mb-8">CPU Utilization</h3>

              <div class="flex items-center justify-center mb-6">
                <div class="relative flex items-center justify-center">
                  <svg class="w-32 h-32 transform -rotate-90">
                    <circle cx="64" cy="64" r="58" stroke="currentColor" stroke-width="8" fill="transparent"
                            class="text-slate-800"/>
                    <circle cx="64" cy="64" r="58" stroke="currentColor" stroke-width="8" fill="transparent"
                            [attr.stroke-dasharray]="364.4"
                            [attr.stroke-dashoffset]="364.4 - (364.4 * data.cpu.raw)"
                            class="text-indigo-500 transition-all duration-1000 ease-out"/>
                  </svg>
                  <span class="absolute text-2xl font-bold">{{ data.cpu.formatted }}</span>
                </div>
              </div>
              <p class="text-center text-slate-500 text-xs italic">Auto-refreshing every 5 seconds</p>
            </div>

          </div>

          <footer class="mt-12 text-center">
            <p class="text-slate-400 text-xs">
              &copy; 2025 <a href="https://alfarays.tech"
                             class="text-indigo-500 font-semibold hover:underline text-decoration-none">Alfarays
              Tech</a>.
              Engineered for high-performance messaging.
            </p>
          </footer>

        </div>
      </div>
    } @else {
      <div class="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <div class="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p class="mt-4 text-slate-500 font-medium">Connecting to Control Tower...</p>
      </div>
    }
  `,
  styles: ``
})
export class SystemAnalyticsComponent implements OnInit {
  private _dashboardService = inject(DashboardService);
  protected stats$!: Observable<DashboardData>;

  ngOnInit(): void {
    this.stats$ = this._dashboardService.getLiveStats();
  }

  getHealthClass(status: string | undefined): string {
    return status === 'UP' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700';
  }
}

