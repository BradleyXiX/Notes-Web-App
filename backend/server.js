import express from "express"
import cors from "cors";
import dotenv from "dotenv"
import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";


//import ratelimiter from "./middleware/rateLimiter.js";

dotenv.config();
const port = process.env.PORT || 5001

const app = express();

//middleware
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true, 
}))
//app.use(ratelimiter)

//routes
app.use("/api/notes", notesRoutes);

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`server is running on port ${port}`);
    });
});
