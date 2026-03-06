import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class Register {

  email: string = '';
  name: string = '';
  password: string = '';
  phone: string = '';
  address: string = '';
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  register() {
    this.loading = true;

    const payload = {
      name: this.name,
      email: this.email,
      password: this.password,
      phone: this.phone,
      address: this.address
    };

    console.log('🔹 Register payload:', payload);

    this.authService.registerClient(payload)
      .subscribe({
        next: (res) => {
          console.log('✅ Inscription réussie:', res);
          alert('Inscription réussie ! Vous pouvez maintenant commander.');
          this.loading = false;
          this.router.navigate(['/client']); // Redirection vers page login
        },
        error: (err) => {
          console.error('❌ Erreur lors de l\'inscription:', err);
          alert('Erreur lors de l\'inscription : ' + (err.error?.error || err.message));
          this.loading = false;
        }
      });
  }
}