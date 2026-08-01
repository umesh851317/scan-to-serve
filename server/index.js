const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;
const app = require("./app");
const { connectMongoDb } = require("./config/db");
const AuthRouter = require("./routes/authRoutes");
const protectRouter = require("./routes/protectedRoutes");

connectMongoDb(process.env.MONGO_URI).then(() => {
       console.log("MongoDB Connected....")
       app.listen(PORT, () => { console.log(`Server running on port ${PORT}`) })
})
       .catch(err => console.log(err));
       
app.use("/auth", AuthRouter)
app.use("/api", protectRouter)