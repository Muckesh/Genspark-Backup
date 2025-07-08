import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PropertyListing } from '../models/property.model';

@Injectable({
  providedIn: 'root'
})
export class ComparisonService {
  private comparisonItems = new BehaviorSubject<PropertyListing[]>([]);
  comparisonItems$ = this.comparisonItems.asObservable();
  maxItems = 3;

  addToComparison(property: PropertyListing) {
    const current = this.comparisonItems.value;
    if (current.length >= this.maxItems) return;
    if (!current.some(p => p.id === property.id)) {
      this.comparisonItems.next([...current, property]);
    }
  }

  removeFromComparison(propertyId: string) {
    const current = this.comparisonItems.value;
    this.comparisonItems.next(current.filter(p => p.id !== propertyId));
  }

  clearComparison() {
    this.comparisonItems.next([]);
  }
}