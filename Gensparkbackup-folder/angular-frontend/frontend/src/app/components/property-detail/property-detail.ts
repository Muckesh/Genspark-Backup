import { Component } from '@angular/core';
import { PropertyService } from '../../services/property.service';
import { ActivatedRoute } from '@angular/router';
import { PropertyListing } from '../../models/property.model';
import { CommonModule } from '@angular/common';
import { InquiryService } from '../../services/inquiry.service';
import { AddInquiryDto } from '../../models/inquiry.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-property-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './property-detail.html',
  styleUrls: ['./property-detail.css']
})
export class PropertyDetail {
  property: PropertyListing | null = null;
  isLoading = false;
  error: string | null = null;
  inquiryForm: FormGroup;
  inquirySent = false;

  constructor(
    private propertyService: PropertyService,
    private inquiryService: InquiryService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.inquiryForm = this.fb.group({
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit() {
    this.loadProperty();
  }

  loadProperty() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.isLoading = true;
    this.propertyService.getPropertyById(id).subscribe({
      next: (property) => {
        this.property = property;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = err.message || 'Failed to load property';
        this.isLoading = false;
      }
    });
  }

  sendInquiry() {
    if (this.inquiryForm.valid && this.property) {
      const inquiryData: AddInquiryDto = {
        listingId: this.property.id,
        message: this.inquiryForm.value.message
      };

      this.inquiryService.createInquiry(inquiryData).subscribe({
        next: () => {
          this.inquirySent = true;
          this.inquiryForm.reset();
        },
        error: (err) => {
          this.error = err.message || 'Failed to send inquiry';
        }
      });
    }
  }
}