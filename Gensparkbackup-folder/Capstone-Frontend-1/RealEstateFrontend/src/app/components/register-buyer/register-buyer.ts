// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-register-buyer',
//   imports: [],
//   templateUrl: './register-buyer.html',
//   styleUrl: './register-buyer.css'
// })
// export class RegisterBuyer {

// }


import { Component, OnInit, OnDestroy, inject } from '@angular/core';
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
  selector: 'app-register-buyer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register-buyer.html',
  styleUrl: './register-buyer.css'
})
export class RegisterBuyer implements OnInit, OnDestroy {
  registerForm: FormGroup;
  private destroy$ = new Subject<void>();
  private store = inject(Store);
  private fb = inject(FormBuilder);
  
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
      preferredLocation: ['', [Validators.required]],
      budget: ['', [Validators.required, Validators.min(1)]]
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
      this.store.dispatch(AuthActions.registerBuyer({ request: registerRequest }));
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