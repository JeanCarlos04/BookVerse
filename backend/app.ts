import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./src/routes/routes.ts";
import cookieP from "cookie-parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import disable_reserved_books from "./src/jobs/disable_reserved_book.ts";

dotenv.config();

const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);

const app = express();
app.use(cookieP());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(router);
app.use("/uploads", express.static(path.join(__dirName, "uploads")));

disable_reserved_books();

app.listen(process.env.PORT, () => {
  console.log("🟢 Listening in port: " + process.env.PORT);
});
