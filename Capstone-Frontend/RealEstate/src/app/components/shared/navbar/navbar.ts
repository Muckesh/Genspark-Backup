import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { NotificationService } from '../../../services/notification.service';
import { Notifications } from '../notifications/notifications';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe, FormsModule,Notifications],
  template: `
    <nav class="navbar navbar-expand navbar-light bg-white shadow-sm">
      <div class="container-fluid">
        <h5 class="mb-0 text-primary fw-bold">
          <i class="bi bi-house-door me-2"></i>
          RealEstate Finder
        </h5>
        
        <ul class="navbar-nav ms-auto align-items-center">
          <!-- Connection Status Indicator -->
          <li class="nav-item me-3">
            <span class="badge" 
                  [class.bg-success]="connectionStatus$ | async"
                  [class.bg-danger]="!(connectionStatus$ | async)"
                  title="Notification service status">
              <i class="bi bi-wifi" *ngIf="connectionStatus$ | async"></i>
              <i class="bi bi-wifi-off" *ngIf="!(connectionStatus$ | async)"></i>
            </span>
          </li>
          
          <!-- Notifications Dropdown -->
          <li class="nav-item dropdown me-3">
            <a class="nav-link position-relative" 
               href="#" 
               id="notificationDropdown"
               role="button" 
               data-bs-toggle="dropdown"
               aria-expanded="false">
              <i class="bi bi-bell fs-5 text-secondary"></i>
              <span *ngIf="(unreadCount$ | async)! > 0" 
                    class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {{ (unreadCount$ | async) }}
              </span>
            </a>
            
            <div class="dropdown-menu dropdown-menu-end notification-dropdown">
              <div class="dropdown-header d-flex justify-content-between align-items-center">
                <h6 class="mb-0">
                  <i class="bi bi-bell me-2"></i>
                  Notifications
                </h6>
                <button *ngIf="(unreadCount$ | async)! > 0" 
                        class="btn btn-sm btn-link text-primary p-0"
                        (click)="markAllAsRead()"
                        title="Mark all as read">
                  <i class="bi bi-check-all"></i>
                </button>
              </div>
              
              <div class="notification-list">
                <div *ngIf="(notifications$ | async)?.length === 0" 
                     class="dropdown-item-text text-center text-muted py-3">
                  <i class="bi bi-bell-slash fs-4 d-block mb-2"></i>
                  No notifications yet
                </div>
                
                <div *ngFor="let notification of getRecentNotifications()" 
                     class="notification-item"
                     [class.unread]="!notification.isRead"
                     (click)="markAsRead(notification.id)">
                  <div class="d-flex align-items-start">
                    <div class="notification-icon me-2">
                      <i [class]="getNotificationIcon(notification.type)" 
                         [class.text-primary]="notification.type === 'property'"
                         [class.text-info]="notification.type === 'inquiry'"
                         [class.text-warning]="notification.type === 'system'"></i>
                    </div>
                    <div class="flex-grow-1">
                      <div class="notification-title">{{ notification.title }}</div>
                      <div class="notification-message">{{ notification.message }}</div>
                      <small class="notification-time text-muted">
                        {{ notification.timestamp | date:'short' }}
                      </small>
                    </div>
                    <div class="d-flex align-items-center">
                      <button *ngIf="notification.type === 'property' && notification.data?.listingId" 
                              class="btn btn-sm btn-link text-info p-1 me-1"
                              (click)="viewProperty(notification.data.listingId); $event.stopPropagation()"
                              title="View property">
                        <i class="bi bi-eye"></i>
                      </button>
                      
                      <button *ngIf="notification.type === 'inquiry' && notification.data?.inquiryId" 
                              class="btn btn-sm btn-link text-info p-1 me-1"
                              (click)="viewInquiry(notification.data.inquiryId); $event.stopPropagation()"
                              title="View inquiry">
                        <i class="bi bi-eye"></i>
                      </button>
                    </div>
                    <div *ngIf="!notification.isRead" class="unread-indicator"></div>
                  </div>
                </div>
                
                <div *ngIf="(notifications$ | async)!.length > 0" 
                     class="dropdown-divider"></div>
                     
                <div class="dropdown-item-text text-center">
                  <button class="btn btn-sm btn-outline-primary me-2" 
                          (click)="viewAllNotifications()" 
                          data-bs-toggle="modal" 
                          data-bs-target="#notificationsModal">
                    <i class="bi bi-list me-1"></i>
                    View All
                  </button>
                  
                  <button class="btn btn-sm btn-outline-secondary"
                          (click)="sendTestNotification()"
                          title="Send test notification">
                    <i class="bi bi-bell-fill"></i>
                  </button>
                </div>
              </div>
            </div>
          </li>
          
          <!-- User Menu -->
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle d-flex align-items-center" 
               href="#" 
               id="userDropdown"
               role="button" 
               data-bs-toggle="dropdown"
               aria-expanded="false">
              <div class="user-avatar me-2">
                <i class="bi bi-person-circle fs-5"></i>
              </div>
              <span class="d-none d-md-inline">{{ authService.getCurrentUser()?.name || 'User' }}</span>
            </a>
            <ul class="dropdown-menu dropdown-menu-end">
              <li><h6 class="dropdown-header">Account</h6></li>
              <li><a class="dropdown-item" href="#"><i class="bi bi-person me-2"></i>Profile</a></li>
              <li><a class="dropdown-item" href="#"><i class="bi bi-gear me-2"></i>Settings</a></li>
              <li><hr class="dropdown-divider"></li>
              <li>
                <a class="dropdown-item text-danger" href="#" (click)="logout()">
                  <i class="bi bi-box-arrow-right me-2"></i>Logout
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Notifications Modal -->
    <div class="modal fade" id="notificationsModal" tabindex="-1" aria-labelledby="notificationsModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="notificationsModalLabel">
              <i class="bi bi-bell me-2"></i>
              All Notifications
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <app-notifications></app-notifications>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .navbar {
      border-bottom: 1px solid #e9ecef;
    }

    .notification-dropdown {
      width: 380px;
      max-height: 500px;
      overflow-y: auto;
      border: none;
      box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
    }

    .notification-list {
      max-height: 400px;
      overflow-y: auto;
    }

    .notification-item {
      padding: 0.75rem 1rem;
      border-bottom: 1px solid #f8f9fa;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }

    .notification-item:hover {
      background-color: #f8f9fa;
    }

    .notification-item.unread {
      background-color: #f0f8ff;
      border-left: 3px solid #0d6efd;
    }

    .notification-icon {
      width: 24px;
      text-align: center;
      font-size: 1.1rem;
    }

    .notification-title {
      font-weight: 600;
      font-size: 0.875rem;
      color: #212529;
      margin-bottom: 0.25rem;
      line-height: 1.2;
    }

    .notification-message {
      font-size: 0.8rem;
      color: #6c757d;
      margin-bottom: 0.25rem;
      line-height: 1.3;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .notification-time {
      font-size: 0.75rem;
    }

    .unread-indicator {
      width: 8px;
      height: 8px;
      background-color: #0d6efd;
      border-radius: 50%;
      margin-top: 0.25rem;
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0% {
        box-shadow: 0 0 0 0 rgba(13, 110, 253, 0.7);
      }
      70% {
        box-shadow: 0 0 0 6px rgba(13, 110, 253, 0);
      }
      100% {
        box-shadow: 0 0 0 0 rgba(13, 110, 253, 0);
      }
    }

    .user-avatar {
      color: #6c757d;
    }

    .dropdown-header {
      font-weight: 600;
      color: #495057;
      padding: 0.75rem 1rem 0.5rem;
    }

    .badge {
      font-size: 0.7rem;
      padding: 0.25rem 0.4rem;
    }

    .modal-lg {
      max-width: 900px;
    }

    .notification-list::-webkit-scrollbar {
      width: 4px;
    }

    .notification-list::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    .notification-list::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 4px;
    }

    .notification-list::-webkit-scrollbar-thumb:hover {
      background: #555;
    }

    @media (max-width: 768px) {
      .notification-dropdown {
        width: 320px;
      }
      
      .notification-message {
        font-size: 0.75rem;
      }
      
      .notification-title {
        font-size: 0.8rem;
      }
    }
  `]
})
export class Navbar implements OnInit, OnDestroy {
  authService = inject(AuthService);
  notificationService = inject(NotificationService);
  router = inject(Router);
  
  private destroy$ = new Subject<void>();

  notifications$ = this.notificationService.notifications$;
  unreadCount$ = this.notificationService.unreadCount$;
  connectionStatus$ = this.notificationService.connectionStatus$;

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      // Add a small delay to ensure other services are initialized
      setTimeout(() => {
        this.notificationService.startConnection()
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: () => {
              console.log('Notification service connected');
              // Request notification permission
              this.notificationService.requestNotificationPermission();
            },
            error: (error) => console.error('Failed to connect notification service:', error)
          });
      }, 1000);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    
    this.notificationService.stopConnection()
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  markAsRead(notificationId: string): void {
    this.notificationService.markAsRead(notificationId);
  }

  markAllAsRead(): void {
    this.notificationService.markAllAsRead();
  }

  viewProperty(listingId: string): void {
    this.router.navigate(['/buyer/property', listingId]);
  }

  viewInquiry(inquiryId: string): void {
    this.router.navigate(['/inquiries', inquiryId]);
  }

  viewAllNotifications(): void {
    // The modal will open automatically due to data-bs-target
  }

  sendTestNotification(): void {
    this.notificationService.sendTestNotification();
  }

  getRecentNotifications() {
    const notifications = this.notificationService.notificationsSubject?.value || [];
    return notifications.slice(0, 5); // Show only the 5 most recent
  }

  getNotificationIcon(type: string): string {
    switch (type) {
      case 'property':
        return 'bi bi-house-door';
      case 'inquiry':
        return 'bi bi-chat-dots';
      case 'system':
        return 'bi bi-info-circle';
      default:
        return 'bi bi-bell';
    }
  }

  logout(): void {
    this.authService.logout();
  }

  // Add trackBy function for better performance
  trackByNotificationId(index: number, notification: any): string {
    return notification.id;
  }
}