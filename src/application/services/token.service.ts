import jwt from "jsonwebtoken";

export class TokenService {
  generate(userId: string) {
    return jwt.sign(
      { sub: userId }, 
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );
  }
}