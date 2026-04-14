import { GetEmployeesResponse, GetManagerResponse } from "../dto/employee.dto";
import { UserProfile } from "../dto/user.dto";
import { supabaseAdmin } from "../supabaseClient";

export class EmpService {
  async getEmployees(limit: number = 10, offset: number = 0): Promise<GetEmployeesResponse> {
    const { data, error, count } = await supabaseAdmin
      .from("Profiles")
      .select(
        `
      id,
      name,
      designation,
      experience,
      roleid,
      Roles (
        name
      )
    `,
        { count: "exact" },
      )
      .order("name", { ascending: true })
      .range(offset, offset + limit - 1);

    if (error) {
      throw new Error(error.message);
    }

    const employees: UserProfile[] = (data || []).map((emp: any) => ({
      id: emp.id,
      name: emp.name,
      designation: emp.designation,
      experience: emp.experience,
      role: emp.Roles?.name ?? "employee",
    }));

    return {
      success: true,
      data: employees,
      total: count || 0,
      message: "Employees retrieved successfully",
    };
  }

  async getManagers(): Promise<GetManagerResponse> {
    const { data, error } = await supabaseAdmin
      .from("Profiles")
      .select("id, name, Roles!inner (name)")
      .eq("Roles.name", "manager"); // Assuming 'manager' is the role name for managers
    const managers = (data || []).map((mgr: any) => ({
      id: mgr.id,
      name: mgr.name,
    }));
    return {
      success: true,
      data: managers,
      message: "Managers retrieved successfully",
    };
  }
}
