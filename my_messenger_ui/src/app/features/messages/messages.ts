import { Component, OnInit, OnDestroy} from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from '../../core/services/message';

@Component({
  selector: 'app-messages',
  imports: [ReactiveFormsModule],
  templateUrl: './messages.html',
  styleUrl: './messages.css',
})
export class Messages {
  form: FormGroup;
  sending = false;
  success = false;
  error = '';

  toasts: { message: string; type: 'success' | 'danger' }[] = [];
  messages: any[] = [];

  loadAllMessages() {
    this.messageService.getAll().subscribe(msgs => this.messages = msgs);
  }

  ngOnInit() {
    this.loadAllMessages();
  }

  constructor(private fb: FormBuilder, private messageService: Message) {
    this.form = this.fb.group({
      to: ['', Validators.required],
      body: ['', Validators.required],
    });
  }

  addToast(message: string, type: 'success' | 'danger') {
    this.toasts.push({ message, type });
    setTimeout(() => this.toasts.shift(), 4000);
  }

  send() {
    this.sending = true;
    this.success = false;
    this.error = '';

    const { to, body } = this.form.value;
  
    this.messageService.send(to, body).subscribe({
      next: () => {
        this.sending = false;
        this.addToast('Message sent!', 'success');
        this.form.reset();
        this.loadAllMessages();
      },
      error: (err) => {
        this.sending = false;
        const errors: string[] = err.error?.errors ?? [err.error?.message ?? 'Failed to send message.'];
        errors.forEach(e => this.addToast(e, 'danger'));
      },
    });
  }
}
