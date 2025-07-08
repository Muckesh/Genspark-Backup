import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InquiryResponseDto } from '../../../models/inquiry.model';

@Component({
  selector: 'app-inquiry-card',
  imports: [CommonModule],
  templateUrl: './inquiry-card.html',
  styleUrl: './inquiry-card.css'
})
export class InquiryCard {
  @Input() inquiry!: InquiryResponseDto;
  @Input() showAgent = false;
  @Input() showBuyer = false;
  @Output() selected = new EventEmitter<string>();

  select() {
    this.selected.emit(this.inquiry.id);
  }
}
