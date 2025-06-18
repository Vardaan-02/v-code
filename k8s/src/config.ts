import dotenv from "dotenv";
dotenv.config();

export const config = {
  PORT: process.env.PORT || 3002,
  FRONT_END_URL: process.env.FRONT_END_URL || "http://localhost:3000",
};
