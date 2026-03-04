import { Component, OnDestroy, afterNextRender } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from '../../core/services/message';
import { AuthService } from '../../core/services/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-messages',
  imports: [ReactiveFormsModule],
  templateUrl: './messages.html',
  styleUrl: './messages.css',
})
export class Messages implements OnDestroy {
  form: FormGroup;
  sending = false;
  success = false;
  error = '';

  toasts: { message: string; type: 'success' | 'danger' }[] = [];
  messages: any[] = [];
  private pollInterval: any;

  loadAllMessages() {
    this.messageService.getAll().subscribe({
      next: msgs => this.messages = msgs,
      error: () => this.addToast('Failed to load messages.', 'danger'),
    });
  }

  ngOnDestroy() {
    clearInterval(this.pollInterval);
  }

  constructor(
    private fb: FormBuilder,
    private messageService: Message,
    private auth: AuthService,
    private router: Router,
  ) {
    this.form = this.fb.group({
      to: ['', Validators.required],
      body: ['', Validators.required],
    });

    afterNextRender(() => {
      this.loadAllMessages();
      this.pollInterval = setInterval(() => this.loadAllMessages(), 5000);
    });
  }

  addToast(message: string, type: 'success' | 'danger') {
    this.toasts.push({ message, type });
    setTimeout(() => this.toasts.shift(), 4000);
  }

  signOut() {
    this.auth.signOut().subscribe({
      next: () => this.router.navigate(['/']),
      error: () => this.router.navigate(['/']),
    });
  }

  send() {
    this.sending = true;
    this.success = false;
    this.error = '';

    const { to, body } = this.form.value;
  
    this.messageService.send(to, body).subscribe({
      next: (msg) => {
        this.sending = false;
        this.addToast('Message sent!', 'success');
        this.form.reset();
        this.messages = [msg, ...this.messages];
      },
      error: (err) => {
        this.sending = false;
        const errors: string[] = err.error?.errors ?? [err.error?.message ?? 'Failed to send message.'];
        errors.forEach(e => this.addToast(e, 'danger'));
      },
    });
  }
}
