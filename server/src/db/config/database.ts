import "dotenv/config";
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(process.env.DB as string, {
  dialect: "postgres",
  logging: process.env.NODE_ENV === "development" ? console.log : false,
});
