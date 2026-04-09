import {
  CreateUserDto,
  CreateUserResponse,
  LoginResponse,
} from "../dto/user.dto";
import { supabaseAdmin } from "../supabaseClient";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET!;

export class AuthService {
  async createUser(dto: CreateUserDto): Promise<CreateUserResponse> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // 2. Insert into Users table
    const { data: user, error: userError } = await supabaseAdmin
      .from("Users")
      .insert({
        email: dto.email,
        password: hashedPassword,
      })
      .select()
      .single();

    if (userError || !user) {
      throw new Error(userError?.message || "User creation failed");
    }

    // 3. Insert into Profiles
    const { error: profileError } = await supabaseAdmin
      .from("Profiles")
      .insert({
        id: user.id, // FK → Users.id
        name: dto.name,
        designation: dto.designation,
        experience: dto.experience,
        roleid: dto.roleid,
      });

    if (profileError) {
      throw new Error(profileError.message);
    }

    return {
      success: true,
      message: "User created successfully",
    };
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    // 1. Get user
    const { data: user, error } = await supabaseAdmin
      .from("Users")
      .select("id, password, roleId")
      .eq("email", email)
      .single();

    if (error || !user) {
      throw new Error("Invalid credentials");
    }

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    // 3. Get role
    const { data: roleData } = await supabaseAdmin
      .from("Roles")
      .select("name")
      .eq("id", user.roleId)
      .single();

    const role = roleData?.name ?? "employee";

    // 4. Generate JWT
    const token = jwt.sign({ id: user.id, role }, JWT_SECRET, {
      expiresIn: "1d",
    });
    return {
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user.id,
        role,
      },
    };
  }
}