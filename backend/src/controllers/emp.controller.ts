import { Request, Response } from "express";
import { EmpService } from "../services/emp.service";
import { GetEmployeesResponse, GetManagerResponse } from "../dto/employee.dto";

const empService = new EmpService();

export const getEmployees = async (req: Request, res: Response<GetEmployeesResponse>) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const page = parseInt(req.query.page as string) || 0;
    const offset = (page - 1) * limit;
    const data = await empService.getEmployees(limit, offset);

    res.json(data);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

export const getManagers = async (req: Request,res: Response<GetManagerResponse>,) => {
  try {
    const data = await empService.getManagers();
    res.json(data);
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};