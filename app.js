import express from "express";
import cors from "cors";
import borrowerRouter from "./routers/BorrowerRouter.js";
import bookRouter from "./routers/bookRouter.js";
const app = express();
app.use(express.json());

app.use(
  cors({
    exposedHeaders: ["Content-Range", "X-Content-Range"],
  }),
);

app.use("/borrowers", borrowerRouter);
app.use("/books", bookRouter);
export default app;


