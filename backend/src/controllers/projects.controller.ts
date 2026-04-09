import { Request, Response } from "express";
import { ProjectsService } from "../services/projects.service";
import { CreateProjectResponse, GetProjectsResponse } from "../dto/projects.dto";

const projectService = new ProjectsService();

export const getProjects = async (req: Request, res: Response<GetProjectsResponse>) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = parseInt(req.query.offset as string) || 0;
    const data = await projectService.getProjects(limit, offset);
    res.json(data);
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

export const createProject = async (req: Request, res: Response<CreateProjectResponse>) => {
  try {
    const project = req.body;
    const result = await projectService.createProject(project);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};