import cors from "cors";

export const corsConfig = {
  origin: process.env.CLIENT_ORIGIN,
  credentials: true,
};
