import { Routes } from '@angular/router';
import { RoleGuard } from './guards/role.guard';
import { Login } from './components/login/login';
import { RegisterAgent } from './components/register-agent/register-agent';
import { RegisterBuyer } from './components/register-buyer/register-buyer';
import { AuthGuard } from './guards/auth.guard';
import { Dashboard } from './components/dashboard/dashboard';
import { PropertyList } from './components/property-list/property-list';

export const routes: Routes = [
  { path: '', redirectTo: '/properties', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register/agent', component: RegisterAgent },
  { path: 'register/buyer', component: RegisterBuyer },
  { 
    path: 'dashboard', 
    component: Dashboard,
    canActivate: [AuthGuard]
  },
  { path: 'properties', component: PropertyList },
  // Agent routes
  { 
    path: 'agent/listings', 
    component: PropertyList,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Agent'] }
  },
  { 
    path: 'agent/inquiries', 
    component: PropertyList, // Replace with InquiryListComponent when created
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Agent'] }
  },
  // Buyer routes
  { 
    path: 'buyer/inquiries', 
    component: PropertyList, // Replace with BuyerInquiryComponent when created
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Buyer'] }
  },
  // Admin routes
  { 
    path: 'admin/users', 
    component: PropertyList, // Replace with UserManagementComponent when created
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Admin'] }
  },
  { 
    path: 'admin/agents', 
    component: PropertyList, // Replace with AgentManagementComponent when created
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Admin'] }
  },
  { 
    path: 'admin/buyers', 
    component: PropertyList, // Replace with BuyerManagementComponent when created
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Admin'] }
  },
  { 
    path: 'admin/properties', 
    component: PropertyList,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Admin'] }
  },
  // Profile route
  { 
    path: 'profile', 
    component: PropertyList, // Replace with ProfileComponent when created
    canActivate: [AuthGuard]
  },
  // Property detail route
  { 
    path: 'properties/:id', 
    component: PropertyList, // Replace with PropertyDetailComponent when created
  },
  // Unauthorized route
  { 
    path: 'unauthorized', 
    component: PropertyList // Replace with UnauthorizedComponent when created
  },
  { path: '**', redirectTo: '/properties' }
];