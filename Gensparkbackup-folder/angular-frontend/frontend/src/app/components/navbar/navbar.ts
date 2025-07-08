import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar {
  isMenuCollapsed = true;
  userRole: string | null = null;
  userName: string | null = null;

  constructor(private authService: AuthService) {
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        this.userRole = decoded.role;
        this.userName = decoded.name || decoded.email;
      } catch {
        // Invalid token
      }
    }
  }

  logout() {
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
      this.authService.logout(refreshToken).subscribe({
        next: () => {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/login';
        },
        error: () => {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/login';
        }
      });
    } else {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      window.location.href = '/login';
    }
  }
}