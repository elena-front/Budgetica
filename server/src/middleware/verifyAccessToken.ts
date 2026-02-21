import "dotenv/config";
import type { JwtPayload } from "jsonwebtoken";
import { verify } from "jsonwebtoken";
import formatResponse from "../utils/formatResponse";
import type { Request, Response, NextFunction } from "express";

export function verifyAccessToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const accessToken = req.headers.authorization?.split(" ")[1] as string;

    const secret = process.env.ACCESS_TOKEN_SECRET as string;
    const user = (verify(accessToken, secret) as JwtPayload)["user"];

    if (!user) {
      return res
        .status(403)
        .json(
          formatResponse(
            403,
            "Невалидный accessToken",
            null,
            "Невалидный accessToken",
          ),
        );
    }

    res.locals.user = user;
    next();
  } catch (error) {
    console.log("==== Verify Access Token ==== ");
    console.log(error);
    res
      .status(403)
      .json(formatResponse(403, "Невалидный accessToken", null, error));
  }
}
