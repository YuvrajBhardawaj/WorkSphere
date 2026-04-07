import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { supabase } from '../supabase.client';
import { RegisterUser } from '../interfaces/IAuth';
import { ViewEmployee } from '../interfaces/IEmployee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private _employees = new BehaviorSubject<ViewEmployee[]>([]);
  employees$ = this._employees.asObservable();

  async fetchEmployees() {
  const { data, error } = await supabase
    .from('Profiles')
    .select(`
      id,
      name,
      designation,
      experience,
      created_at,
      roleid,
      Roles(
        name
      )
    `);

  if (!error) {
    const formatted = (data || []).map((emp: any) => ({
      id: emp.id,
      name: emp.name,
      designation: emp.designation,
      experience: emp.experience,
      created_at: emp.created_at,
      role: emp.Roles?.name ?? null   
    })).filter(emp => emp.role !== 'admin');;

    this._employees.next(formatted);
  }
}

  // 🔹 Create employee
  async createEmployee(emp: RegisterUser) {
    // 1️⃣ Create auth user
    const { data, error: authError } = await supabase.auth.signUp({
      email: emp.email,
      password: emp.password,
    });

    if (authError) {
      console.error(authError);
      return;
    }

    const userId = data.user?.id;

    // 2️⃣ Insert profile
    const { error } = await supabase.from('Profiles').insert([
      {
        id: userId,
        name: emp.name,
        designation: emp.designation,
        experience: emp.experience,
        roleid: emp.roleid,
      },
    ]);

    if (error) {
      console.error(error);
    }

    this.fetchEmployees();
  }
}
