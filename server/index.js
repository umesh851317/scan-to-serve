const dotenv = require("dotenv");
dotenv.config();                          // Load environment variables
const PORT = process.env.PORT;            // access the port number throgh env

const app = require("./app");
const { connectMongoDb } = require("./config/db");
const AuthRouter = require("./routes/authRoutes");
const protectRouter = require("./routes/protectedRoutes");
const CustomerProtectRouter = require("./routes/customerProtectedRoutes");
const verifyTable = require("./routes/verifyTable");
// const verifyTable = require("./routes/verifyCustomer");

connectMongoDb(process.env.MONGO_URI)     // function to connect mongoDb
       .then(() => {
              console.log("MongoDB Connected....")
              app.listen(PORT, () => {
                     console.log(`Server running on port ${PORT}`)
              })
       }).catch(
              err => console.log("error:", err)
       );

app.use("/auth", AuthRouter)            // for authentication
app.use("/api", protectRouter)

// ---------->>>>>>>>> verify customer and table details 
app.use("/verifyTable", verifyTable)

app.use("/customerMenu/:restaurentId", CustomerProtectRouter)