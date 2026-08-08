const dotenv = require("dotenv");
dotenv.config();                          // Load environment variables
const PORT = process.env.PORT;            // access the port number throgh env

const app = require("./app");             // Express app

const { connectMongoDb } = require("./config/db");
const AuthRouter = require("./routes/authRoutes");
const protectRouter = require("./routes/protectedRoutes");

connectMongoDb(process.env.MONGO_URI)     // function to connect mongoDb
       .then(() => {
              console.log("MongoDB Connected....")
              app.listen(PORT, () => {
                     console.log(`Server running on port ${PORT}`)
              })
       }).catch(
              err => console.log(err)
       );

app.use("/auth", AuthRouter)
app.use("/api", protectRouter)