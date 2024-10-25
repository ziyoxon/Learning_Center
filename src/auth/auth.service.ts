import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { CreateAuthDto, AuthSignInDto } from "./dto";
import { Response } from "express";
import { Staff } from "@prisma/client";
import { hash, compare } from "bcrypt";
import { JwtPayload, ResponseFields, Tokens } from "../common/types";
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  async generateTokens(user: Staff): Promise<Tokens> {
    const payload: JwtPayload = {
      id: user.id,
      login: user.login,
    };
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.sign(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.sign(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return { access_token, refresh_token };
  }
  async updateRefreshToken(userId: number, refresh_token: string) {
    const hashed_refresh_token = await hash(refresh_token, 7);
    await this.prisma.staff.update({
      where: { id: userId },
      data: { hashed_refresh_token },
    });
  }

  async signUp(
    createAuthDto: CreateAuthDto,
    res: Response
  ): Promise<ResponseFields> {
    const candidate = await this.prisma.staff.findUnique({
      where: { login: createAuthDto.login },
    });

    if (candidate) {
      throw new BadRequestException({
        message: "User with this login already exists",
      });
    }
    if (createAuthDto.password !== createAuthDto.confirm_password) {
      throw new BadRequestException("The password does not match");
    }
    const hashed_password = await hash(createAuthDto.password, 7);
    const newUser = await this.prisma.staff.create({
      data: {
        first_name: createAuthDto.first_name,
        last_name: createAuthDto.last_name,
        phone_number: createAuthDto.phone_number,
        login: createAuthDto.login,
        hashed_password: hashed_password,
        is_active: createAuthDto.is_active,
        hashed_refresh_token: createAuthDto.hashed_refresh_token || null,
      },
    });

    const { access_token, refresh_token } = await this.generateTokens(newUser);
    await this.updateRefreshToken(newUser.id, refresh_token);
    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      maxAge: +process.env.COOKIE_TIME,
    });
    return { id: newUser.id, access_token };
  }

  async signIn(
    authSignInDto: AuthSignInDto,
    res: Response
  ): Promise<ResponseFields> {
    const { password, login } = authSignInDto;

    const user = await this.prisma.staff.findUnique({ where: { login } });
    if (!user) {
      throw new BadRequestException("Login or password incorrect");
    }

    const validPassword = await compare(password, user.hashed_password);
    if (!validPassword) {
      throw new BadRequestException("Login or password incorrect");
    }

    const tokens = await this.generateTokens(user);
    await this.updateRefreshToken(user.id, tokens.refresh_token);
    res.cookie("refresh_token", tokens.refresh_token, {
      httpOnly: true,
      maxAge: +process.env.COOKIE_TIME,
    });
    return {
      id: user.id,
      access_token: tokens.access_token,
    };
  }

  async handleRefreshToken(
    userId: number,
    refreshToken: string,
    res: Response
  ): Promise<ResponseFields> {
    const user = await this.prisma.staff.findUnique({
      where: { id: +userId },
    });

    if (!user || !user.hashed_refresh_token) {
      throw new BadRequestException("User is not defined");
    }
    const rMatches = await compare(refreshToken, user.hashed_refresh_token);
    if (!rMatches) {
      throw new ForbiddenException("Access denied");
    }
    const decodedToken = await this.jwtService.decode(refreshToken);
    if (!decodedToken) {
      throw new UnauthorizedException("Token expired");
    }

    if (userId != decodedToken["id"]) {
      throw new UnauthorizedException("You are not authorized");
    }

    const tokens = await this.generateTokens(user);

    await this.updateRefreshToken(user.id, tokens.refresh_token);

    res.cookie("refresh_token", tokens.refresh_token, {
      httpOnly: true,
      maxAge: +process.env.COOKIE_TIME,
    });
    return {
      id: user.id,
      access_token: tokens.access_token,
    };
  }

  async signOut(userId: number, res: Response) {
    const user = await this.prisma.staff.updateMany({
      where: {
        id: userId,
        hashed_refresh_token: {
          not: null,
        },
      },
      data: { hashed_refresh_token: null },
    });

    if (!user) {
      throw new ForbiddenException("Access Denied");
    }

    res.clearCookie("refresh_token");
    return {
      message: "User successfully sign out",
    };
  }
}
