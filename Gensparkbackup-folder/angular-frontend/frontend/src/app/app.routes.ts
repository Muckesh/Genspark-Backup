// import { Routes } from '@angular/router';

// export const routes: Routes = [];

import { Routes } from '@angular/router';
import { AuthGuard } from '../app/guards/auth.guard';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { PropertyList } from './components/property-list/property-list';
import { PropertyDetail } from './components/property-detail/property-detail';

export const routes: Routes = [
  { path: '', redirectTo: '/properties', pathMatch: 'full' },
  { path: 'login', component:Login },
  { path: 'register', component:Register },
  
  // Property routes
  { path: 'properties', component:PropertyList },
  { path: 'properties/:id',component:PropertyDetail },
  
  // Protected routes
  { 
    path: 'my-properties', 
    loadComponent: () => import('./components/properties/my-properties/my-properties.component').then(m => m.MyPropertiesComponent),
    canActivate: [() => inject(RoleGuard).canActivate('Agent')]
  },
  { 
    path: 'my-inquiries', 
    loadComponent: () => import('./components/inquiries/my-inquiries/my-inquiries.component').then(m => m.MyInquiriesComponent),
    canActivate: [() => inject(RoleGuard).canActivate('Buyer')]
  },
  { 
    path: 'admin', 
    loadComponent: () => import('./components/admin/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent),
    canActivate: [() => inject(RoleGuard).canActivate('Admin')]
  },
  
  // Fallback route
  { path: '**', redirectTo: '/properties' }
];