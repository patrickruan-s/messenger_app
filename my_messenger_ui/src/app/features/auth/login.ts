import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
})


export class Login {
    action: 'signin' | 'signup' = 'signin';
    form: FormGroup;
    error = '';

    toasts: { message: string; type: 'success' | 'danger' }[] = [];

    constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
        this.form = this.fb.group({
            email: '',
            password: '',
            passwordConfirmation: [''],
        });
    }

    setAction(mode: 'signin' | 'signup') {
        this.action = mode;
        this.error = '';
        this.form.reset();
    }

    addToast(message: string, type: 'success' | 'danger') {
        this.toasts.push({ message, type });
        setTimeout(() => this.toasts.shift(), 4000);
    }

    submit() {
        this.error = '';

        const { email, password, passwordConfirmation } = this.form.value;

        const request = this.action === 'signin'
        ? this.auth.signIn(email, password)
        : this.auth.signUp(email, password, passwordConfirmation);

        request.subscribe({
            next: () => this.router.navigate(['/']),
            error: (err) => {
                const errors: string[] = err.error?.errors ?? [err.error?.message ?? 'Failed to send message.'];
                errors.forEach(e => this.addToast(e, 'danger'));
            }
        });
    }
}