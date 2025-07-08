import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.model';
import { PropertyService } from '../../services/property.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, ChartModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboard {
  stats = {
    totalUsers: 0,
    activeUsers: 0,
    totalProperties: 0,
    activeProperties: 0
  };
  recentUsers: User[] = [];
  recentProperties: any[] = [];
  isLoading = true;
  error: string | null = null;

  chartData: any;
  chartOptions: any;

  constructor(
    private userService: UserService,
    private propertyService: PropertyService
  ) {}

  ngOnInit() {
    this.loadDashboardData();
    this.initChart();
  }

  loadDashboardData() {
    this.isLoading = true;
    
    // Load all data in parallel
    forkJoin([
      this.userService.getUserStats(),
      this.userService.getRecentUsers(5),
      this.propertyService.getPropertyStats(),
      this.propertyService.getRecentProperties(5)
    ]).subscribe({
      next: ([userStats, recentUsers, propertyStats, recentProperties]) => {
        this.stats = {
          ...this.stats,
          totalUsers: userStats.totalCount,
          activeUsers: userStats.activeCount
        };
        
        this.recentUsers = recentUsers;
        
        this.stats = {
          ...this.stats,
          totalProperties: propertyStats.totalCount,
          activeProperties: propertyStats.activeCount
        };
        
        this.recentProperties = recentProperties;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = err.message || 'Failed to load dashboard data';
        this.isLoading = false;
      }
    });
  }

  initChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    
    this.chartData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'New Users',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: documentStyle.getPropertyValue('--primary-500'),
          tension: 0.4
        },
        {
          label: 'New Properties',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          borderColor: documentStyle.getPropertyValue('--teal-500'),
          tension: 0.4
        }
      ]
    };
    
    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: textColorSecondary,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: textColorSecondary,
            drawBorder: false
          }
        }
      }
    };
  }
}