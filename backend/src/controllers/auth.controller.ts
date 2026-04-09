import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { AuthRequest } from '../middlewares/auth.middleware';
import { CreateUserResponse, LoginResponse } from '../dto/user.dto';

const authService = new AuthService();

export const createUser = async (req: Request, res: Response<CreateUserResponse>) => {
  try {
    const data = await authService.createUser(req.body);
    res.json(data);
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const login = async (req: Request, res: Response<LoginResponse>) => {
  try {
    const { email, password } = req.body;

    const result = await authService.login(email, password);

    res.cookie('token', result.token, {
      httpOnly: true,
      secure: true, // true in production (HTTPS)
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000
    });

    res.json({
      success: true,
      message: "Login successful",
      user: result.user
    });

  } catch (err: any) {
    res.status(401).json({ success: false, message: err.message });
  }
};

export const getMe = (req: AuthRequest, res: Response) => {
  res.json({
    id: req.user.id,
    role: req.user.role
  });
};