import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.html',
  styleUrls: ['./pagination.css']
})
export class Pagination {
  @Input() totalItems = 0;
  @Input() itemsPerPage = 10;
  @Input() currentPage = 1;
  @Output() pageChanged = new EventEmitter<number>();

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get pages(): number[] {
    const pages: number[] = [];
    const maxVisible = 5; // Maximum visible page numbers
    
    if (this.totalPages <= maxVisible) {
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      let startPage: number;
      let endPage: number;
      
      if (this.currentPage <= Math.ceil(maxVisible / 2)) {
        startPage = 1;
        endPage = maxVisible;
      } else if (this.currentPage + Math.floor(maxVisible / 2) >= this.totalPages) {
        startPage = this.totalPages - maxVisible + 1;
        endPage = this.totalPages;
      } else {
        startPage = this.currentPage - Math.floor(maxVisible / 2);
        endPage = this.currentPage + Math.floor(maxVisible / 2);
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.pageChanged.emit(page);
    }
  }
}