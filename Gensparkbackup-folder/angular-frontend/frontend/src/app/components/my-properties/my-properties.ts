import { Component } from '@angular/core';
import { PropertyListing, PagedResult } from '../../../models/property.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Pagination } from '../pagination/pagination';
import { PropertyService } from '../../services/property.service';

@Component({
  selector: 'app-my-properties',
  standalone: true,
  imports: [CommonModule, RouterLink, Pagination],
  templateUrl: './my-properties.html',
  styleUrls: ['./my-properties.css']
})
export class MyProperties {
  properties: PropertyListing[] = [];
  pagedResult: PagedResult<PropertyListing> | null = null;
  isLoading = true;
  error: string | null = null;
  currentPage = 1;
  pageSize = 10;

  constructor(private propertyService: PropertyService) {}

  ngOnInit() {
    this.loadMyProperties();
  }

  loadMyProperties() {
    this.isLoading = true;
    this.error = null;
    
    this.propertyService.getAgentProperties(this.currentPage, this.pageSize).subscribe({
      next: (result) => {
        this.pagedResult = result;
        this.properties = result.items;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = err.message || 'Failed to load your properties';
        this.isLoading = false;
      }
    });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadMyProperties();
  }

  deleteProperty(id: string) {
    if (confirm('Are you sure you want to delete this property?')) {
      this.propertyService.deleteProperty(id).subscribe({
        next: () => {
          this.properties = this.properties.filter(p => p.id !== id);
        },
        error: (err) => {
          this.error = err.message || 'Failed to delete property';
        }
      });
    }
  }
}