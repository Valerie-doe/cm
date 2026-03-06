import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router'; // <-- import nécessaire

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule], // <-- ajouter RouterModule ici
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class Header {

   currentYear = new Date().getFullYear();

   constructor(private router: Router) {}

   logout(): void {
      localStorage.clear();
      this.router.navigate(['/login']);
   }
}