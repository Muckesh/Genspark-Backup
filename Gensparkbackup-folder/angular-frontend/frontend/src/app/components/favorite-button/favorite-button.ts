import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyService } from '../../services/property.service';

@Component({
  selector: 'app-favorite-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      class="btn btn-sm" 
      [class.btn-outline-danger]="!isFavorite"
      [class.btn-danger]="isFavorite"
      (click)="toggleFavorite()"
      [disabled]="isLoading">
      <i class="bi" [class.bi-heart]="isFavorite" [class.bi-heart-fill]="!isFavorite"></i>
      {{ isFavorite ? 'Remove' : 'Save' }}
    </button>
  `,
  styles: []
})
export class FavoriteButtonComponent implements OnInit {
  @Input() propertyId!: string;
  isFavorite = false;
  isLoading = false;

  constructor(private propertyService: PropertyService) {}

  ngOnInit() {
    this.checkFavoriteStatus();
  }

  checkFavoriteStatus() {
    this.isLoading = true;
    this.propertyService.getFavorites().subscribe({
      next: (favorites) => {
        this.isFavorite = favorites.some(f => f.id === this.propertyId);
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  toggleFavorite() {
    this.isLoading = true;
    
    if (this.isFavorite) {
      this.propertyService.removeFromFavorites(this.propertyId).subscribe({
        next: () => {
          this.isFavorite = false;
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        }
      });
    } else {
      this.propertyService.addToFavorites(this.propertyId).subscribe({
        next: () => {
          this.isFavorite = true;
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        }
      });
    }
  }
}