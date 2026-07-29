const express = require("express");
const cors = require("cors");

const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());  
const allowedOrigins = [
       "http://localhost:5173",
       "https://scan-to-serve-xi-blush.vercel.app",
];

app.use(      // It controls which websites are allowed to make requests to your backend.
       cors({
              origin(origin, callback) {
                     if (!origin || allowedOrigins.includes(origin)) {
                            return callback(null, true);
                     }
                     callback(new Error("Not allowed by CORS"));
              },
              credentials: true,
       })
);
app.use(express.json());    //  it automatically parse request(json data) into js Object and store in req.body

module.exports = app;