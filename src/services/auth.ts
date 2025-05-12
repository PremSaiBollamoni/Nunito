import { User } from '../types';

const DEMO_USER: User = {
  id: '1',
  name: 'Demo User',
  email: 'demo@example.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo',
};

export class AuthService {
  private static instance: AuthService;
  private currentUser: User | null = null;

  private constructor() {}

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(): Promise<User> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.currentUser = DEMO_USER;
    return DEMO_USER;
  }

  async logout(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500));
    this.currentUser = null;
  }

  getUser(): User | null {
    return this.currentUser;
  }
}