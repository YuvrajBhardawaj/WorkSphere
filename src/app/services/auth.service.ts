import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { supabase } from '../supabase.client';
import { User } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user = new BehaviorSubject<User | null>(null);
  user$ = this._user.asObservable();

  private _role = new BehaviorSubject<string | null>(null);
  role$ = this._role.asObservable();

  constructor() {
    this.loadUser();
    this.listenToAuthChanges(); // ✅ Fix 1: added auth state listener
  }

  private listenToAuthChanges() {
    supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user ?? null;
      this._user.next(user);

      if (user) {
        this.fetchRole(user.id);
      } else {
        this._role.next(null);
      }
    });
  }

  async loadUser() {
    const { data, error } = await supabase.auth.getUser();

    if (error) return;

    const user = data?.user ?? null;
    this._user.next(user);

    if (user) {
      await this.fetchRole(user.id);
    }
  }

  async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;

    const user = data?.user;

    if (!user) throw new Error('User not found');

    this._user.next(user);
    await this.fetchRole(user.id);
  }

  async logout() {
    await supabase.auth.signOut();
    this._user.next(null);
    this._role.next(null);
  }

  async fetchRole(userId: string) {
    const { data, error } = await supabase
  .from('Profiles')
  .select(`
    roleid,
    Roles!fk_profiles_role (
      name
    )
  `)
  .eq('id', userId)
  .single();

    if (error) return;

    const roleName = (data as any)?.Roles?.name ?? null; // ✅ Fix 3: cast needed for joined table typing
    this._role.next(roleName);
  }
}