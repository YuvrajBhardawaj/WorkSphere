import { CreateProjectResponse, GetProjectsResponse, Project } from "../dto/projects.dto";
import { supabaseAdmin } from "../supabaseClient";

export class ProjectsService {
  async getProjects(limit: number = 10, offset: number = 0): Promise<GetProjectsResponse> {
    const { data, error } = await supabaseAdmin
      .from('Projects')
      .select(
        `
      id,
      title,
      description,
      status,
      created_at,
      assigned_to,
      Profiles (
        name
      )
    `,
      )
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);
    if (error) {
      throw new Error(error.message);
    }
    const transformed: Project[] = (data || []).map((project: any) => ({
      id: project.id,
      title: project.title,
      description: project.description,
      status: project.status,
      created_at: project.created_at,
      days_allocated: project.days_allocated,
      assigned_to: project.Profiles?.name || 'Not Assigned',
    }));
    return { success: true, data: transformed, message: "Projects retrieved successfully" };
  }

  async createProject(project: Project): Promise<CreateProjectResponse> {
    const { data, error } = await supabaseAdmin.from("Projects").insert({
      title: project.title,
      description: project.description,
      assigned_to: project.assigned_to,
      days_allocated: project.days_allocated,
      status: project.status,
    });
    if (error) {
      throw new Error(error.message);
    }
    return { success: true, message: "Project created successfully" };
  }
}
