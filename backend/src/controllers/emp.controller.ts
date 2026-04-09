import { Request, Response } from 'express';
import { EmpService } from '../services/emp.service';
import { GetEmployeesResponse } from '../dto/employee.dto';

const empService = new EmpService();

export const getEmployees = async (req: Request, res: Response<GetEmployeesResponse>) => {
  try {
    const data = await empService.getEmployees();
    res.json(data);
  }
    catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  } 
}