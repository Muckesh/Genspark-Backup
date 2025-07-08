import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RegisterAgentDto } from '../../models/agent.model';
import { CommonModule } from '@angular/common';
import { RegisterBuyerDto } from '../../models/buyer.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  registerForm: FormGroup;
  isAgent = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['buyer'],
      // Agent specific fields
      licenseNumber: [''],
      agencyName: [''],
      phone: [''],
      // Buyer specific fields
      preferredLocation: [''],
      budget: [0]
    });
  }

  toggleRole() {
    this.isAgent = !this.isAgent;
    this.registerForm.patchValue({
      role: this.isAgent ? 'agent' : 'buyer'
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const formValue = this.registerForm.value;
      
      if (this.isAgent) {
        const agentData: RegisterAgentDto = {
          name: formValue.name,
          email: formValue.email,
          password: formValue.password,
          licenseNumber: formValue.licenseNumber,
          agencyName: formValue.agencyName,
          phone: formValue.phone
        };
        
        this.authService.registerAgent(agentData).subscribe({
          next: (response) => {
            localStorage.setItem('access_token', response.token);
            localStorage.setItem('refresh_token', response.refreshToken);
            this.router.navigate(['/properties']);
          },
          error: (err) => {
            this.errorMessage = err.error || 'Registration failed. Please try again.';
          }
        });
      } else {
        const buyerData: RegisterBuyerDto = {
          name: formValue.name,
          email: formValue.email,
          password: formValue.password,
          preferredLocation: formValue.preferredLocation,
          budget: formValue.budget
        };
        
        this.authService.registerBuyer(buyerData).subscribe({
          next: (response) => {
            localStorage.setItem('access_token', response.token);
            localStorage.setItem('refresh_token', response.refreshToken);
            this.router.navigate(['/properties']);
          },
          error: (err) => {
            this.errorMessage = err.error || 'Registration failed. Please try again.';
          }
        });
      }
    }
  }
}