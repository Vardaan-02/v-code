import express from "express";
import cors from "cors";
import { config } from "./config";
import routes from "./route/spawn"
import { healthCheck } from "./utils/health-check";

export const app = express();

const allowedOrigins = process.env.CLIENT_ORIGINS?.split(",") || [];

console.log(process.env.CLIENT_ORIGINS);
console.log(allowedOrigins);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); 

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(
          new Error("CORS blocked: Not allowed by CLIENT_ORIGINS")
        );
      }
    },
    credentials: true,
  })
);
app.use(express.json());

healthCheck(app);

// Routes
app.use("/", routes);

app.listen(config.PORT, () => {
  console.log(`✅ Server live on ${config.PORT}`);
});
