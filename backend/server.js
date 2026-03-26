 import monthlyRoutes from "./routes/monthlyRoutes.js"
 import express from "express";
import flatRoutes from "./routes/flatRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js"
import subscriptionRoutes from "./routes/subscriptionRoutes.js"
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import dotenv from "dotenv";
import dashboardRoutes from "./routes/dashboardRoutes.js";


const app = express();

app.use(cors({
  origin: "*",   
}));

dotenv.config();
app.use(express.json());

app.use("/api/dashboard", dashboardRoutes);
app.use("/api/monthly-records", monthlyRoutes)
app.use("/api/flats", flatRoutes);
app.use("/api/payments" , paymentRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(5000,()=>{
    console.log("Server running on port 5000");
    
});

