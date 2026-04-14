import { MonthlyProjectCreationCount, ProjectStatusCount } from "../dto/dashboard.dto";
import { supabaseAdmin } from "../supabaseClient";

export class DashboardService {
  async getDashboardStats() {
    const { data: projectsData, error: projectsError } = await supabaseAdmin
        .from("Projects")
        .select("status, created_at");

      if (projectsError) throw new Error(projectsError.message);

      const statusCounts = projectsData.reduce(
        (acc: Record<string, number>, { status }) => {
          acc[status] = (acc[status] || 0) + 1;
          return acc;
        },
        {},
      );

      const projectStatusCounts: ProjectStatusCount[] = Object.entries(
        statusCounts,
      ).map(([status, count]) => ({ status, count }));

      const totalOngoingProjects = statusCounts["pending"] ?? 0;

      // Step 1: Reduce to Record<string, number>
      const monthlyCountMap = projectsData.reduce(
        (acc: Record<string, number>, { created_at }) => {
          const month = new Date(created_at).toISOString().slice(0, 7); // "YYYY-MM"
          acc[month] = (acc[month] || 0) + 1;
          return acc;
        },
        {},
      );

      // Step 2: Convert to MonthlyProjectCreationCount[]
      const monthlyProjectCreationCounts: MonthlyProjectCreationCount[] =
        Object.entries(monthlyCountMap).map(([month, count]) => ({
          month,
          count,
        }));

      const { count: totalEmployees, error: empError } = await supabaseAdmin
        .from("Profiles")
        .select("id, Roles!inner(name)", { count: "exact", head: true })
        .eq("Roles.name", "employee");

      if (empError) throw new Error(empError.message);

      const { count: totalManagers, error: mgrError } = await supabaseAdmin
        .from("Profiles")
        .select("id, Roles!inner(name)", { count: "exact", head: true })
        .eq("Roles.name", "manager");

      if (mgrError) throw new Error(mgrError.message);

      return {
        success: true,
        data: {
          employeeCount: { totalEmployees: totalEmployees ?? 0 },
          managerCount: { totalManagers: totalManagers ?? 0 },
          ongoingProjectsCount: { totalOngoingProjects },
          projectStatusCounts,
          monthlyProjectCreationCounts,
        },
        message: "Dashboard stats fetched successfully",
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message ?? "An unexpected error occurred",
      };
  }
}
