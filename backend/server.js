import express from "express"
import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";
import dotenv from "dotenv"
//import ratelimiter from "./middleware/rateLimiter.js";

dotenv.config();
const port = process.env.PORT || 5001

const app = express();



//middleware
app.use(express.json())
//app.use(ratelimiter)

//routes
app.use("/api/notes", notesRoutes);



connectDB().then(() => {
    app.listen(port, () => {
        console.log(`server is running on port ${port}`);
    });
});
