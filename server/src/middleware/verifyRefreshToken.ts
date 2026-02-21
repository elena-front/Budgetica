import "dotenv/config";
import formatResponse from "../utils/formatResponse";
import type { JwtPayload } from "jsonwebtoken";
import { verify } from "jsonwebtoken";
import type {
  NextFunction,
  Request,
  Response,
} from "express-serve-static-core";

export function verifyRefreshToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      next();
      return;
    }

    const secret = process.env.REFRESH_TOKEN_SECRET as string;
    const user = (verify(refreshToken, secret) as JwtPayload)["user"];

    if (!user) {
      return res
        .status(401)
        .json(
          formatResponse(
            401,
            "Невалидный refreshToken",
            null,
            "Невалидный refreshToken",
          ),
        );
    }

    res.locals.user = user;
    next();
  } catch (error) {
    console.log("==== Verify Refresh Token ==== ");
    console.log(error);
    res
      .status(401)
      .json(formatResponse(401, "Невалидный refreshToken", null, error));
  }
}
