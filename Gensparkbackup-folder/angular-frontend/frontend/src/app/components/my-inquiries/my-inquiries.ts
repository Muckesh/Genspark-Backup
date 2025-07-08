import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Pagination } from '../pagination/pagination';
import { Inquiry } from '../../models/inquiry.model';
import { PagedResult } from '../../models/property.model';
import { InquiryService } from '../../services/inquiry.service';

@Component({
  selector: 'app-my-inquiries',
  standalone: true,
  imports: [CommonModule, RouterLink, Pagination],
  templateUrl: './my-inquiries.html',
  styleUrls: ['./my-inquiries.css']
})
export class MyInquiries {
  inquiries: Inquiry[] = [];
  pagedResult: PagedResult<Inquiry> | null = null;
  isLoading = true;
  error: string | null = null;
  currentPage = 1;
  pageSize = 10;

  constructor(private inquiryService: InquiryService) {}

  ngOnInit() {
    this.loadMyInquiries();
  }

  loadMyInquiries() {
    this.isLoading = true;
    this.error = null;
    
    this.inquiryService.getMyInquiries(this.currentPage, this.pageSize).subscribe({
      next: (result) => {
        this.pagedResult = result;
        this.inquiries = result.items;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = err.message || 'Failed to load your inquiries';
        this.isLoading = false;
      }
    });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadMyInquiries();
  }
}