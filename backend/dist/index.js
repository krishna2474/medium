import { Hono } from "hono";
import { cors } from "hono/cors";
import { userRouter } from "./routes/userRoutes";
import { blogRouter } from "./routes/blogRoutes";
const app = new Hono();
app.use("*", cors());
app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);
export default app;
