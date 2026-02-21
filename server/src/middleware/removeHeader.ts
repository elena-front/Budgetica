import type { Request, Response, NextFunction } from "express";

export default function removeXPoweredByHeader(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res.removeHeader("X-Powered-By");
  next();
}
