import { IUser } from "../infrastructure/model/user.model";
import { UserRepositoryImpl } from "../infrastructure/repositoriesImpl/user.repository.impl";
import bcrypt from "bcrypt";
import { RegisterUserDto } from "../presentations/dtos/user/register-user.dto";
import { validateOrReject } from "class-validator";
import { BadRequestException } from "../domain/exceptions/bad-request.exception";
import { LoginUserDto } from "../presentations/dtos/user/login-user.dto";
import jwt from "jsonwebtoken";
const userRepository = new UserRepositoryImpl();
export const register = async (userData: Partial<IUser>): Promise<IUser> => {
  const registerUserDto = Object.assign(new RegisterUserDto(), userData);

  await validateOrReject(registerUserDto);

  const existedUser = await userRepository.findUserByUsername(
    registerUserDto.username
  );
  if (existedUser) {
    throw new BadRequestException("Username already exists");
  }

  const existedEmail = await userRepository.findUserByEmail(
    registerUserDto.email || ""
  );
  if (existedEmail) {
    throw new BadRequestException("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);

  return await userRepository.createUser({
    ...registerUserDto,
    password: hashedPassword,
  });
};

export const loginService = async (
  username: string,
  password: string
): Promise<any> => {
  const loginUserDto = Object.assign(new LoginUserDto(), {
    username,
    password,
  });
  await validateOrReject(loginUserDto);
  const user = await userRepository.findUserByUsername(loginUserDto.username);
  if (!user) {
    throw new BadRequestException("Invalid username or password 1");
  }
  const isMatchPassword = await userRepository.checkPassword(
    user,
    loginUserDto.password
  );
  if (!isMatchPassword) {
    throw new BadRequestException("Invalid username or password");
  }
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not set in environment variables");
  }
  const token = jwt.sign(
    { userId: user._id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
  const { password: _, ...userWithoutPassword } = user.toObject();
  return { ...userWithoutPassword, access_token: token };
};