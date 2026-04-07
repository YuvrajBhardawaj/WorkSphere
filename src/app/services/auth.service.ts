import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, firstValueFrom } from 'rxjs';
import { supabase } from '../supabase.client';
import { UserToken } from '../interfaces/IAuth';
@Injectable({ providedIn: 'root' })
export class AuthService {
  private _user = new BehaviorSubject<UserToken | null | undefined>(undefined);
  user$ = this._user.asObservable();

  // Single shared init promise — no matter how many times the service
  // is touched, getSession() only runs ONCE
  private _initPromise: Promise<void> | null = null;

  constructor() {
    this._initPromise = this.init();
  }

  private async init(): Promise<void> {
    // Resolve current session exactly once
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      this._user.next(null);
    } else {
      const role = await this.fetchRole(session.user.id);
      console.log({ id: session.user.id, role: role ?? 'employee' })
      this._user.next({ id: session.user.id, role: role ?? 'employee' });
    }

    // Then watch for future changes
    supabase.auth.onAuthStateChange(async (_event, session) => {
      const user = session?.user;
      if (!user) {
        this._user.next(null);
        return;
      }
      const role = await this.fetchRole(user.id);
      this._user.next({ id: user.id, role: role ?? 'employee' });
    });
  }

  waitForAuthReady(): Promise<UserToken | null> {
    return firstValueFrom(
      this._user.pipe(filter((user) => user !== undefined)),
    ) as Promise<UserToken | null>;
  }

  async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    const user = data.user;
    if (!user) throw new Error('User not found');

    const role = await this.fetchRole(user.id);

    this._user.next({
      id: user.id,
      role: role ?? 'employee',
    });
  }

  async logout() {
    await supabase.auth.signOut();
    this._user.next(null);
  }

  async fetchRole(userId: string): Promise<string | null> {
    const { data, error } = await supabase
      .from('Profiles')
      .select(
        `
        Roles(
          name
        )
      `,
      )
      .eq('id', userId)
      .single();

    if (error) return null;

    return (data as any)?.Roles?.name ?? null;
  }

  getUserValue(): UserToken | null | undefined {
    return this._user.value;
  }
}
