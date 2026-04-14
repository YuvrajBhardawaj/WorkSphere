import { Request, Response } from "express";
import { DashboardService } from "../services/dashboard.service";
import { DashboardResponse } from "../dto/dashboard.dto";

const dashboardService = new DashboardService();

export const getDashboardStats = async (req: Request, res: Response<DashboardResponse>) => {
  try {
    const data = await dashboardService.getDashboardStats();
    res.json(data);
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};
