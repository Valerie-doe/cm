import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/service/api.service';
import { ApiEndpoints } from '../../shared/constants/api-endpoints';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { Header } from "../header/header";
import { ChangeDetectorRef } from '@angular/core';

export interface Lot {
  _id?: string;
  numero: string;
  surface: number;
  zone: string;
  statut?: 'LIBRE' | 'OCCUPE' | 'FERME';
  prix: number;
}

@Component({
  selector: 'app-lots',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    Header
  ],
  templateUrl: './lots.html',
  styleUrls: ['./lots.css']
})
export class Lots implements OnInit {

  lots: any[] = [];
  filteredLots: any[] = [];
 articles: any[] = [];

  searchTerm: string = '';

  totalLots = 0;
  availableLots = 0;
  occupiedLots = 0;


  constructor(
    private apiService: ApiService,
    private router: Router

  ) {}

  ngOnInit(): void {
    this.loadLots();
    this.loadArticles();
  }
 loadArticles(): void {
 this.apiService.getArticles().subscribe(data => this.articles =
data);
 }

  // Charger les lots
  loadLots(): void {

    this.apiService.getList<Lot[]>(ApiEndpoints.LOTS.GETALL).subscribe({
      next: (data) => {

        this.lots = data || [];
        this.filteredLots = [...this.lots];
        console.log("Lots reçus :", this.filteredLots);

        this.calculateStats();

      },
      error: (err) => {
        console.error('Erreur lors du chargement des lots :', err);
      }
    });
  }

  // Calcul des statistiques
  calculateStats(): void {
    this.totalLots = this.lots.length;

    this.availableLots = this.lots.filter(
      lot => lot.statut === 'LIBRE'
    ).length;

    this.occupiedLots = this.lots.filter(
      lot => lot.statut === 'OCCUPE'
    ).length;
  }

  // Recherche
  onSearch(): void {

    const term = this.searchTerm.trim().toLowerCase();

    if (!term) {
      this.filteredLots = [...this.lots];
      return;
    }

    this.filteredLots = this.lots.filter(lot =>
      lot.numero.toLowerCase().includes(term)
    );
  }

  // Aller modifier lot
  goToEditLot(lotId: string) {
    this.router.navigate(['/lots/add', lotId]);
  }

  // Supprimer
  deleteLot(id: string): void {

    const confirmDelete = confirm("Voulez-vous vraiment supprimer ce lot ?");
    if (!confirmDelete) return;

    this.apiService.delete(`${ApiEndpoints.LOTS.GETALL}`, id).subscribe({
      next: () => {

        alert("Lot supprimé avec succès");

        // Recharge la liste
        this.loadLots();

      },
      error: (err) => {
        console.error('Erreur lors de la suppression :', err);
      }
    });

  }

  // Optimisation Angular
  trackById(index: number, lot: Lot) {
    return lot._id;
  }

}