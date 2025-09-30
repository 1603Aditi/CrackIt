require("dotenv").config();
const express=require("express");
const cors=require("cors");
const path=require("path");
const connectDB=require("./config/db");
const app=express();
const authRoutes=require("./routes/authRoutes");
const experienceRoutes=require("./routes/experienceRoutes");
const queBankRoutes=require("./routes/queBankRoutes");
const communityRoutes=require("./routes/communityRoutes");
const CompanyRoutes=require("./routes/companyRoutes");
const DashboardRoutes=require("./routes/dashboardRoutes");
const userRoutes=require("./routes/userRoutes");

app.use(
    cors({
        origin:process.env.CLIENT_URL || "*",
        methods:["GET","POST","PUT","DELETE"],
        allowedHeaders:["Content-Type","Authorization"],
    })
);

app.use(express.json());

connectDB();
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/community",communityRoutes);
app.use("/api/v1/experiences",experienceRoutes);
app.use("/api/v1/queBank",queBankRoutes);
app.use("/api/v1/company",CompanyRoutes);
app.use("/api/v1/dashboard",DashboardRoutes);
app.use("/api/v1/user",userRoutes);

app.use("/uploads",express.static(path.join(__dirname,"uploads")));
const PORT=process.env.PORT || 5000;
app.listen(PORT ,()=>console.log(`Server running on port ${PORT}`)); 