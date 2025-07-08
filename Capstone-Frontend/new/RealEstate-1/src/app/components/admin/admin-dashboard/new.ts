import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { PropertyListingService } from '../services/property-listing.service';
import { InquiryService } from '../services/inquiry.service';
import { FormsModule } from '@angular/forms';
import { StatCard, User } from '../models/user.model';
import { forkJoin } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule, FormsModule, DatePipe, RouterLink],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard implements OnInit {
  private userService = inject(UserService);
  private listingService = inject(PropertyListingService);
  private inquiryService = inject(InquiryService);

  isStatsLoading = true;
  error: string | null = null;

  // Main Stats
  stats: StatCard[] = [
    { label: 'Total Users', value: 0, icon: 'bi-people-fill', color: 'primary' },
    { label: 'Total Properties', value: 0, icon: 'bi-house-fill', color: 'success' },
    { label: 'Total Inquiries', value: 0, icon: 'bi-chat-dots-fill', color: 'info' },
    { label: 'Active Agents', value: 0, icon: 'bi-person-badge-fill', color: 'warning' }
  ];

  // User Distribution
  userStats = {
    totalUsers: 0,
    agents: 0,
    buyers: 0,
    admins: 0,
    newUsersThisMonth: 0
  };

  // Property Stats
  propertyStats = {
    totalProperties: 0,
    activeListings: 0,
    soldProperties: 0,
    averagePrice: 0,
    newListingsThisMonth: 0
  };

  // Inquiry Stats
  inquiryStats = {
    totalInquiries: 0,
    pendingInquiries: 0,
    resolvedInquiries: 0,
    newInquiriesToday: 0
  };

  // Recent Activity
  recentUsers: User[] = [];
  recentProperties: any[] = [];
  recentInquiries: any[] = [];

  // System Health
  systemHealth = {
    status: 'healthy',
    uptime: '99.9%',
    responseTime: '120ms',
    lastBackup: new Date()
  };

  // Quick Actions
  quickActions = [
    {
      title: 'Manage Users',
      description: 'View and manage user accounts',
      icon: 'bi-people',
      color: 'primary',
      route: '/admin/users'
    },
    {
      title: 'Property Reports',
      description: 'Generate property analytics',
      icon: 'bi-graph-up',
      color: 'success',
      route: '/admin/reports'
    },
    {
      title: 'System Settings',
      description: 'Configure platform settings',
      icon: 'bi-gear',
      color: 'info',
      route: '/admin/settings'
    },
    {
      title: 'Backup Data',
      description: 'Create system backup',
      icon: 'bi-cloud-download',
      color: 'warning',
      action: 'backup'
    }
  ];

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.isStatsLoading = true;
    this.error = null;

    // Load all data in parallel
    forkJoin({
      users: this.userService.getAllUsers({ pageSize: 1000 }), // Get all users for stats
      properties: this.listingService.getListings({ pageSize: 1000 }), // Get all properties
      inquiries: this.inquiryService.getInquiries({ pageSize: 1000 }), // Get all inquiries
      recentUsers: this.userService.getAllUsers({ pageSize: 5, sortBy: 'createdAt', sortOrder: 'desc' }),
      recentProperties: this.listingService.getListings({ pageSize: 5, sortBy: 'createdAt', sortOrder: 'desc' }),
      recentInquiries: this.inquiryService.getInquiries({ pageSize: 5, sortBy: 'createdAt', sortOrder: 'desc' })
    }).subscribe({
      next: (results) => {
        this.processData(results);
        this.isStatsLoading = false;
      },
      error: (err) => {
        console.error('Error loading dashboard data:', err);
        this.error = 'Failed to load dashboard data. Please try again.';
        this.isStatsLoading = false;
      }
    });
  }

  private processData(data: any): void {
    const users = data.users.items || [];
    const properties = data.properties.items || [];
    const inquiries = data.inquiries.items || [];

    // Update main stats
    this.stats[0].value = users.length;
    this.stats[1].value = properties.length;
    this.stats[2].value = inquiries.length;
    this.stats[3].value = users.filter((u: User) => u.role === 'Agent').length;

    // Update user stats
    this.userStats = {
      totalUsers: users.length,
      agents: users.filter((u: User) => u.role === 'Agent').length,
      buyers: users.filter((u: User) => u.role === 'Buyer').length,
      admins: users.filter((u: User) => u.role === 'Admin').length,
      newUsersThisMonth: this.getNewItemsThisMonth(users)
    };

    // Update property stats
    const activeProp = properties.filter((p: any) => !p.isDeleted);
    const soldProp = properties.filter((p: any) => p.status === 'Sold');
    const avgPrice = properties.length > 0 
      ? properties.reduce((sum: number, p: any) => sum + p.price, 0) / properties.length 
      : 0;

    this.propertyStats = {
      totalProperties: properties.length,
      activeListings: activeProp.length,
      soldProperties: soldProp.length,
      averagePrice: avgPrice,
      newListingsThisMonth: this.getNewItemsThisMonth(properties)
    };

    // Update inquiry stats
    this.inquiryStats = {
      totalInquiries: inquiries.length,
      pendingInquiries: inquiries.filter((i: any) => i.status === 'Pending').length,
      resolvedInquiries: inquiries.filter((i: any) => i.status === 'Resolved').length,
      newInquiriesToday: this.getNewItemsToday(inquiries)
    };

    // Set recent data
    this.recentUsers = data.recentUsers.items || [];
    this.recentProperties = data.recentProperties.items || [];
    this.recentInquiries = data.recentInquiries.items || [];
  }

  private getNewItemsThisMonth(items: any[]): number {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    return items.filter(item => new Date(item.createdAt) >= startOfMonth).length;
  }

  private getNewItemsToday(items: any[]): number {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return items.filter(item => new Date(item.createdAt) >= today).length;
  }

  refreshDashboard(): void {
    this.loadDashboardData();
  }

  executeQuickAction(action: string): void {
    switch (action) {
      case 'backup':
        this.createBackup();
        break;
      default:
        console.log('Action not implemented:', action);
    }
  }

  private createBackup(): void {
    // Simulate backup creation
    alert('Backup creation initiated. You will be notified when complete.');
  }

  getStatActionLink(statLabel: string): string {
    switch (statLabel) {
      case 'Total Users':
        return '/admin/users';
      case 'Total Properties':
        return '/admin/properties';
      case 'Total Inquiries':
        return '/admin/inquiries';
      case 'Active Agents':
        return '/admin/agents';
      default:
        return '/admin';
    }
  }

  getRoleBadgeClass(role: string): string {
    switch (role) {
      case 'Admin': return 'bg-danger';
      case 'Agent': return 'bg-success';
      case 'Buyer': return 'bg-primary';
      default: return 'bg-secondary';
    }
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'Active': return 'bg-success';
      case 'Pending': return 'bg-warning';
      case 'Sold': return 'bg-info';
      case 'Resolved': return 'bg-success';
      default: return 'bg-secondary';
    }
  }

  trackByStat(index: number, stat: StatCard): string {
    return stat.label;
  }

  trackByUser(index: number, user: User): string {
    return user.id;
  }

  trackByProperty(index: number, property: any): string {
    return property.id;
  }

  trackByInquiry(index: number, inquiry: any): string {
    return inquiry.id;
  }

  trackByAction(index: number, action: any): string {
    return action.title;
  }
}