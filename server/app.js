const express = require("express");       // Import Express
const cors = require("cors");             // use for enabling client request
const app = express();

const cookieParser = require("cookie-parser");   // allows Express to easily read cookies sent by the browser
app.use(cookieParser());  

const allowedOrigins = [           // client request which is express only allow
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
              credentials: true,   // enable cookies 
       })
);
app.use(express.json());    //  it automatically parse request(json data) into js Object and store in (req.body)

module.exports = app;