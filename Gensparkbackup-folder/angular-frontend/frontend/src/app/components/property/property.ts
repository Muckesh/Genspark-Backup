import { Component, Input } from '@angular/core';
import { PropertyListing } from '../../models/property.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-property',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './property.html',
  styleUrls: ['./property.css']
})
export class Property {
  @Input() property!: PropertyListing;
}