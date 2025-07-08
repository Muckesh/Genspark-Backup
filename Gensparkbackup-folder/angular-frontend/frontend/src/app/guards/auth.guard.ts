import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('access_token');
    
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    try {
      const decoded: any = jwtDecode(token);
      const isExpired = Date.now() >= decoded.exp * 1000;
      
      if (isExpired) {
        this.router.navigate(['/login']);
        return false;
      }

      return true;
    } catch {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class RoleGuard {
  constructor(private router: Router) {}

  canActivate(role: string): boolean {
    const token = localStorage.getItem('access_token');
    
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    try {
      const decoded: any = jwtDecode(token);
      const isExpired = Date.now() >= decoded.exp * 1000;
      
      if (isExpired || decoded.role !== role) {
        this.router.navigate(['/login']);
        return false;
      }

      return true;
    } catch {
      this.router.navigate(['/login']);
      return false;
    }
  }
}