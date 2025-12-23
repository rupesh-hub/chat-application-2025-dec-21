import {Component, inject, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, NgForm} from '@angular/forms';
import {MessagesService} from '../messages.service';
import {MessageResponse} from '../message.model';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'chat-create',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './create.component.html',
  styles: ``
})
export class CreateComponent {

  private _messageService: MessagesService = inject(MessagesService);

  protected message: string = '';
  @ViewChild('messageForm', {static: false})
  protected messageForm!: NgForm;

  protected sendMessage(): void {
    if (this.messageForm.invalid) return;
    this._messageService.send({
      message: this.messageForm.controls["message"].value
    }).subscribe({
      next: (response: MessageResponse) => {
        console.log(response)
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    })
    this.messageForm.resetForm();
  }
}
