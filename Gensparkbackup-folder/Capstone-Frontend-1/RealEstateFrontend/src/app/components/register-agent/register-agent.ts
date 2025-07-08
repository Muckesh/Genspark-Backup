// import { Component, inject } from '@angular/core';

// @Component({
//   selector: 'app-register-agent',
//   imports: [],
//   templateUrl: './register-agent.html',
//   styleUrl: './register-agent.css'
// })
// export class RegisterAgent {

// }


import { Component,inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppState } from '../../store/app.state';
import * as AuthActions from '../../store/auth/auth.actions';
import { selectAuthLoading, selectAuthError, selectIsAuthenticated } from '../../store/auth/auth.selectors';

@Component({
  selector: 'app-register-agent',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register-agent.html',
  styleUrl: './register-agent.css'
})
export class RegisterAgent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  private destroy$ = new Subject<void>();
  private store = inject(Store);
  private fb=inject(FormBuilder);
  
  isLoading$ = this.store.select(selectAuthLoading);
  authError$ = this.store.select(selectAuthError);
  isAuthenticated$ = this.store.select(selectIsAuthenticated);

  constructor(
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      licenseNumber: ['', [Validators.required]],
      agencyName: ['', [Validators.required]],
      phone: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.store.dispatch(AuthActions.clearError());
    
    this.isAuthenticated$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.router.navigate(['/dashboard']);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const registerRequest = this.registerForm.value;
      this.store.dispatch(AuthActions.registerAgent({ request: registerRequest }));
    } else {
      this.markFormGroupTouched();
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  private markFormGroupTouched(): void {
    Object.keys(this.registerForm.controls).forEach(key => {
      const control = this.registerForm.get(key);
      control?.markAsTouched();
    });
  }
}