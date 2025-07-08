// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-navbar',
//   imports: [],
//   templateUrl: './navbar.html',
//   styleUrl: './navbar.css'
// })
// export class Navbar {

// }


import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppState } from '../../store/app.state';
import * as AuthActions from '../../store/auth/auth.actions';
import { 
  selectCurrentUser, 
  selectIsAuthenticated, 
  selectUserRole,
  selectIsAgent,
  selectIsBuyer,
  selectIsAdmin
} from '../../store/auth/auth.selectors';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private store = inject(Store);
  
  currentUser$ = this.store.select(selectCurrentUser);
  isAuthenticated$ = this.store.select(selectIsAuthenticated);
  userRole$ = this.store.select(selectUserRole);
  isAgent$ = this.store.select(selectIsAgent);
  isBuyer$ = this.store.select(selectIsBuyer);
  isAdmin$ = this.store.select(selectIsAdmin);


  ngOnInit(): void {
    // Initialize auth state from localStorage
    this.store.dispatch(AuthActions.initializeAuth());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }

  getUserInitials(): string {
    let initials = '';
    this.currentUser$.pipe(takeUntil(this.destroy$)).subscribe(user => {
      if (user?.name) {
        const names = user.name.split(' ');
        initials = names.map(name => name.charAt(0).toUpperCase()).join('');
        if (initials.length > 2) {
          initials = initials.substring(0, 2);
        }
      }
    });
    return initials || 'U';
  }
}