import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyImage } from '../../models/property.model';
import { PropertyService } from '../../services/property.service';

@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-upload.html',
  styleUrls: ['./image-upload.css']
})
export class ImageUploadComponent {
  @Input() propertyId!: string;
  @Output() imageUploaded = new EventEmitter<PropertyImage>();
  
  selectedFile: File | null = null;
  isUploading = false;
  error: string | null = null;
  progress = 0;

  constructor(private propertyService: PropertyService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadImage() {
    if (!this.selectedFile || !this.propertyId) return;

    this.isUploading = true;
    this.error = null;
    
    this.propertyService.uploadPropertyImage(this.propertyId, this.selectedFile).subscribe({
      next: (image) => {
        this.imageUploaded.emit(image);
        this.selectedFile = null;
        this.isUploading = false;
      },
      error: (err) => {
        this.error = err.message || 'Failed to upload image';
        this.isUploading = false;
      }
    });
  }
}