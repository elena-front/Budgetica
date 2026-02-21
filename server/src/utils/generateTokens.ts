import "dotenv/config";
import { sign } from "jsonwebtoken";
import jwtConfig from "../config/jwtConfig";

const generateTokens = (payload: object) => {
  return {
    accessToken: sign(
      payload,
      process.env["ACCESS_TOKEN_SECRET"] as string,
      jwtConfig.access,
    ),
    refreshToken: sign(
      payload,
      process.env["REFRESH_TOKEN_SECRET"] as string,
      jwtConfig.refresh,
    ),
  };
};

export default generateTokens;
