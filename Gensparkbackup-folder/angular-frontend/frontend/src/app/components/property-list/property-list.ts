import { Component } from '@angular/core';
import { PropertyService } from '../../services/property.service';
import { PropertyListing, PropertyQueryParams, PagedResult } from '../../models/property.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Property } from '../property/property';
import { Pagination } from '../pagination/pagination';

@Component({
  selector: 'app-property-list',
  standalone: true,
  imports: [CommonModule, Property, Pagination, FormsModule, RouterLink],
  templateUrl: './property-list.html',
  styleUrls: ['./property-list.css']
})
export class PropertyList {
  properties: PropertyListing[] = [];
  pagedResult: PagedResult<PropertyListing> | null = null;
  isLoading = false;
  error: string | null = null;

  queryParams: PropertyQueryParams = {
    pageNumber: 1,
    pageSize: 10
  };

  constructor(private propertyService: PropertyService) {}

  ngOnInit() {
    this.loadProperties();
  }

  loadProperties() {
    this.isLoading = true;
    this.error = null;
    
    this.propertyService.getProperties(this.queryParams).subscribe({
      next: (result) => {
        this.pagedResult = result;
        this.properties = result.items;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = err.message || 'Failed to load properties';
        this.isLoading = false;
      }
    });
  }

  onPageChange(page: number) {
    this.queryParams.pageNumber = page;
    this.loadProperties();
  }

  onSearch() {
    this.queryParams.pageNumber = 1; // Reset to first page on new search
    this.loadProperties();
  }

  clearFilters() {
    this.queryParams = {
      pageNumber: 1,
      pageSize: 10
    };
    this.loadProperties();
  }
}