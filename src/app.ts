import express from "express";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "https://silver-narwhal-c934ad.netlify.app",
    credentials: true,
  })
);

app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(globalErrorHandler);

app.use(notFound);

export default app;
