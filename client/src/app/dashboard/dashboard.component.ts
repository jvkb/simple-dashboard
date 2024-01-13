import { Component } from '@angular/core';
import { AppService, Quote } from '../app.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { catchError, throwError } from 'rxjs';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  constructor(private appService: AppService, private router: Router) {}

  /**
   * Quote of the day
   */
  public quote?: Quote;

  /**
   * On component init
   */
  ngOnInit() {
    const observable = this.appService.getDashboardData().pipe(
      catchError((err: HttpErrorResponse, caught) => {
        this.router.navigateByUrl('login');
        this.appService.logout();
        return throwError(() => err.message);
      })
    );

    observable.subscribe((response) => {
      this.quote = response.quote;
    });
  }

  /**
   * Triggered on logout action
   */
  public onLogout() {
    this.appService.logout();
    this.router.navigateByUrl('/login');
  }
}
