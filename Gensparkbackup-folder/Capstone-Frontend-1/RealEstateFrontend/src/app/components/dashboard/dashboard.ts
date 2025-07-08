// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-dashboard',
//   imports: [],
//   templateUrl: './dashboard.html',
//   styleUrl: './dashboard.css'
// })
// export class Dashboard {

// }


import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../store/app.state';
import { 
  selectCurrentUser, 
  selectUserRole,
  selectIsAgent,
  selectIsBuyer,
  selectIsAdmin
} from '../../store/auth/auth.selectors';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  private store = inject(Store);

  currentUser$ = this.store.select(selectCurrentUser);
  userRole$ = this.store.select(selectUserRole);
  isAgent$ = this.store.select(selectIsAgent);
  isBuyer$ = this.store.select(selectIsBuyer);
  isAdmin$ = this.store.select(selectIsAdmin);


  ngOnInit(): void {
    // Load dashboard data based on user role
  }

  formatBudget(): string {
    let budget = 0;
    this.currentUser$.subscribe(user => {
      if (user?.buyerProfile?.budget) {
        budget = user.buyerProfile.budget;
      }
    });
    
    if (budget >= 1000000) {
      return (budget / 1000000).toFixed(1) + 'M';
    } else if (budget >= 1000) {
      return (budget / 1000).toFixed(0) + 'K';
    }
    return budget.toString();
  }
}