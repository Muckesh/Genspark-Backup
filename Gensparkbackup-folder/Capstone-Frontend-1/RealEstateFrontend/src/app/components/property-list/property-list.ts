// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-property-list',
//   imports: [],
//   templateUrl: './property-list.html',
//   styleUrl: './property-list.css'
// })
// export class PropertyList {

// }


import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AppState } from '../../store/app.state';
import * as PropertyActions from '../../store/property/property.actions';
import { 
  selectListingItems, 
  selectListingsPagination, 
  selectPropertyLoading, 
  selectPropertyError 
} from '../../store/property/property.selectors';
import { PropertyListingQuery } from '../../models/user.model';

@Component({
  selector: 'app-property-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './property-list.html',
  styleUrl: './property-list.css'
})
export class PropertyList implements OnInit, OnDestroy {
  searchForm: FormGroup;
  private destroy$ = new Subject<void>();
  private store = inject(Store);
  private fb=inject(FormBuilder);
  
  properties$ = this.store.select(selectListingItems);
  pagination$ = this.store.select(selectListingsPagination);
  isLoading$ = this.store.select(selectPropertyLoading);
  error$ = this.store.select(selectPropertyError);

  private currentQuery: PropertyListingQuery = {
    pageNumber: 1,
    pageSize: 12
  };

  constructor(
  ) {
    this.searchForm = this.fb.group({
      keyword: [''],
      location: [''],
      minPrice: [''],
      maxPrice: [''],
      minBedrooms: [''],
      minBathrooms: [''],
      sortBy: [''],
      pageSize: [12]
    });
  }

  ngOnInit(): void {
    this.loadProperties();
    this.setupFormSubscriptions();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupFormSubscriptions(): void {
    // Auto-search on form changes with debounce
    this.searchForm.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.search();
    });
  }

  search(): void {
    const formValue = this.searchForm.value;
    
    this.currentQuery = {
      ...this.currentQuery,
      pageNumber: 1, // Reset to first page on new search
      keyword: formValue.keyword || undefined,
      location: formValue.location || undefined,
      minPrice: formValue.minPrice || undefined,
      maxPrice: formValue.maxPrice || undefined,
      minBedrooms: formValue.minBedrooms || undefined,
      minBathrooms: formValue.minBathrooms || undefined,
      pageSize: formValue.pageSize || 12
    };

    // Handle sorting
    if (formValue.sortBy) {
      if (formValue.sortBy === 'price_desc') {
        this.currentQuery.sortBy = 'price';
        this.currentQuery.isDescending = true;
      } else {
        this.currentQuery.sortBy = formValue.sortBy;
        this.currentQuery.isDescending = false;
      }
    } else {
      this.currentQuery.sortBy = undefined;
      this.currentQuery.isDescending = undefined;
    }

    this.loadProperties();
  }

  clearFilters(): void {
    this.searchForm.reset({
      pageSize: 12
    });
    this.currentQuery = {
      pageNumber: 1,
      pageSize: 12
    };
    this.loadProperties();
  }

  goToPage(page: number): void {
    this.currentQuery.pageNumber = page;
    this.loadProperties();
  }

  private loadProperties(): void {
    this.store.dispatch(PropertyActions.loadListings({ query: this.currentQuery }));
  }

  getResultsText(pagination: any): string {
    const start = (pagination.pageNumber - 1) * pagination.pageSize + 1;
    const end = Math.min(pagination.pageNumber * pagination.pageSize, pagination.totalCount);
    return `${start}-${end} of ${pagination.totalCount} results`;
  }

  getPageNumbers(pagination: any): number[] {
    const pages: number[] = [];
    const maxPages = 5; // Show max 5 page numbers
    const totalPages = pagination.totalPages;
    const currentPage = pagination.pageNumber;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxPages / 2));
    let endPage = Math.min(totalPages, startPage + maxPages - 1);
    
    // Adjust start page if we're near the end
    if (endPage - startPage < maxPages - 1) {
      startPage = Math.max(1, endPage - maxPages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  }
}