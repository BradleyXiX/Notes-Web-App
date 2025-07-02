import express from "express"
import cors from "cors";
import dotenv from "dotenv"
import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";
import path from "path"


//import ratelimiter from "./middleware/rateLimiter.js";

dotenv.config();
const port = process.env.PORT || 5001
const __dirname = path.resolve()


const app = express();

//middleware

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}
app.use(express.json())
//app.use(ratelimiter)

//routes
app.use("/api/notes", notesRoutes);


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`server is running on port ${port}`);
    });
});
