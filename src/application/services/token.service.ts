import jwt from "jsonwebtoken";

interface TokenPayload {
  sub: string
  role: 'USER' | 'ADMIN'
  name: string
  phone?: string
}

export class TokenService {
  generate(payload: TokenPayload) {
    return jwt.sign(
      payload,
      process.env.JWT_SECRET as string,
      { expiresIn: "24h" }
    );
  }
}