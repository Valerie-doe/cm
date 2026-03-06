import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-client',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-client.html',
  styleUrl: './login-client.css',
})
export class LoginClient {

  email: string = 'jean@gmail.com';
  password: string = '123456';
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

login() {
  console.log('🔹 login() appelé');
  this.loading = true;
  console.log('🔹 loader activé, email:', this.email, 'password:', this.password);

  this.authService.loginCustomer(this.email, this.password)
    .subscribe({
      next: (res) => {
        console.log('✅ Réponse reçue du backend:', res);

        if (!res || !res.token) {
          console.error('⚠️ Aucun token reçu du backend');
          alert('Problème avec la réponse du serveur');
          this.loading = false;
          return;
        }

        console.log('🔹 Stockage du token et du shopId');
        localStorage.setItem('tokenCustomer', res.token);
        localStorage.setItem('customerId', res.userId);
        console.log('🔹 token et customerId stockés:',
                    localStorage.getItem('tokenCustomer'),
                    localStorage.getItem('customerId'));

        this.loading = false;
        console.log('🔹 loader désactivé, navigation vers /client');

        this.router.navigate(['/client']).then(() => {
          console.log('🔹 Navigation terminée vers /client');
        });
      },

      error: (err) => {
        console.error('❌ Erreur lors du login:', err);
        alert('Email ou mot de passe incorrect');
        this.loading = false;
      }
    });
}

goToRegister() {
  this.router.navigate(['/register']);
}

}
