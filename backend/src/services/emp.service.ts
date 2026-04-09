import { GetEmployeesResponse } from '../dto/employee.dto';
import { UserProfile } from '../dto/user.dto';
import { supabaseAdmin } from '../supabaseClient';

export class EmpService {

  async getEmployees(): Promise<GetEmployeesResponse> {

    const { data, error } = await supabaseAdmin
      .from('Profiles')
      .select(`
        id,
        name,
        designation,
        experience,
        roleid,
        Roles (
          name
        )
      `);

    if (error) {
      throw new Error(error.message);
    }
    const employees: UserProfile[] = (data || []).map((emp: any) => ({
      id: emp.id,
      name: emp.name,
      designation: emp.designation,
      experience: emp.experience,
      role: emp.Roles?.name ?? 'employee'
    }));

    return { success: true, data: employees, message: "Employees retrieved successfully" };
  }
}