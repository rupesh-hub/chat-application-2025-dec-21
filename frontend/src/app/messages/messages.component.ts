import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MessagesService} from './messages.service';
import {MessageResponse} from './message.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'chat-messages',
  imports: [CommonModule],
  standalone: true,
  template: `
    <div class="space-y-3 container mx-auto mt-5">

      <div
        *ngFor="let message of messages$ | async"
        class="bg-white border border-gray-200 rounded-xl p-4 shadow-sm
           hover:shadow-md transition-shadow"
      >

        <!-- Message Text -->
        <p class="text-gray-800 text-md leading-relaxed font-semibold">
          {{ message.message }}
        </p>

        <!-- Footer -->
        <div class="flex justify-between items-center mt-3 text-xs text-gray-500">

          <!-- Timestamp -->
          <span>
        {{ message.timestamp | date:'MMM d, y • h:mm a' }}
      </span>

          <!-- Message ID -->
          <span class="bg-gray-100 px-2 py-0.5 rounded-full text-gray-600">
        #{{ message.id }}
      </span>

        </div>
      </div>

    </div>
  `,
  styles: ``
})
export class MessagesComponent implements OnInit {

  private _messageService: MessagesService = inject(MessagesService);
  protected messages$: Observable<MessageResponse[]>;

  ngOnInit() {
    this.messages$ = this._messageService.messages();
  }


}
