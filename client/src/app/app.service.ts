import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export type User = {
  id: string;
  email: string;
  name: string;
};

export type Quote = {
  author: string;
  text: string;
};

@Injectable({
  providedIn: 'root',
})
export class AppService {
  /**
   * Currently logged in user
   */
  public user?: User;

  /**
   * JWT token
   */
  public token?: string;

  /**
   * Key where JWT will be stored in local storage
   */
  private readonly JWT_LOCAL_STORAGE_KEY = 'app_jwt';

  constructor(private httpClient: HttpClient) {}

  /**
   * Get token from local storage
   */
  public getTokenFromStorage() {
    return localStorage.getItem(this.JWT_LOCAL_STORAGE_KEY);
  }

  /**
   * Login into platform
   * @param {string} email
   * @param {string} password
   */
  public login(email: string, password: string) {
    return this.httpClient.post<{
      success: boolean;
      user: User;
      token: string;
    }>('http://localhost:8080/api/login', {
      email,
      password,
    });
  }

  /**
   * Logout from app
   */
  public logout() {
    this.user = undefined;
    this.token = undefined;
    localStorage.removeItem(this.JWT_LOCAL_STORAGE_KEY);
  }

  /**
   * Set login state in memory and local storage
   * @param {string} token
   * @param {User} user
   */
  public setLoginState(token: string, user: User) {
    localStorage.setItem(this.JWT_LOCAL_STORAGE_KEY, token);
    this.token = token;
    this.user = user;
  }

  /**
   * Get dashboard data
   */
  public getDashboardData() {
    const token =
      typeof this.token === 'string'
        ? this.token
        : localStorage.getItem(this.JWT_LOCAL_STORAGE_KEY);

    return this.httpClient.get<{ success: boolean; quote: Quote }>(
      'http://localhost:8080/api/dashboard',
      {
        headers: {
          authorization: `Bearer ${token ?? ''}`,
        },
      }
    );
  }
}
