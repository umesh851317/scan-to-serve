const bcrypt = require("bcrypt");
const Restaurant = require("../models/restaurant");
const User = require("../models/User");
const { setUser, getUser } = require("../service/auth");

async function handleCreateResaurent(req, res) {
       try {
              const { restaurantName,
                     ownerName,
                     phone,
                     email,
                     password,
                     gstNumber,
                     role
              } = req.body

              const isExist = await Restaurant.findOne({ email })
              // check restaurent is already exist or not (with email)
              if (isExist) {
                     return res.status(404).json({ message: "Restaurent with Email already Exist...." })
              }

              // CREATE RESTAURANT
              const restaurant = await Restaurant.create({
                     restaurantName: restaurantName,
                     ownerName: ownerName,
                     email: email,
                     phone: phone,
                     gstNumber: gstNumber
              });

              const hashedPassword = await bcrypt.hash(password, 10);  // Hash the password

              // CREATE ADMIN USER
              const user = await User.create({
                     name: ownerName,
                     email: email,
                     phone: phone,
                     password: hashedPassword,
                     role: "Admin",
                     restaurantId: restaurant._id,        // unique id of restaurent
              });
              res.status(201).json({
                     success: true,
                     message: "Resaurent create succefully",
                     restaurant, user
              });
       } catch (error) {
              console.log(error);
       }
}


async function handleSignIn(req, res) {
       const { email, password } = req.body;
       if (!email || !password) {
              return res.status(400).json({
                     message: "Email and password are required.",
              });
       }

       const user = await User.findOne({ email });
       if (!user) {
              return res.status(401).json({
                     message: "User not found.",
              });
       }

       const isMatch = await bcrypt.compare(password, user.password);        // bcrpt email....
       if (!isMatch) {
              return res.status(401).json({
                     message: "Invalid email or password.",
              });
       }

       const token = setUser(user);

       res.cookie("token", token, {
              httpOnly: true,      // prevents JavaScript running in the browser
              secure: process.env.NODE_ENV === "production",   // Only send this cookie over HTTPS.
              sameSite: "lax",     // This helps protect against CSRF (Cross-Site Request Forgery) attacks.
              maxAge: 1 * 24 * 60 * 60 * 1000,   // The cookie expires after 1 days.
       });


       // console.log(token);


       return res.status(200).json({
              message: "login succefull",
       });
}

async function getUserDetails(req, res) {
       try {
              const token = req.cookies.token
              if (!token) {
                     return res.status(401).json({
                            response:null,
                            success: false,
                            message: "Unauthorized",
                     });
              }

              const decode = getUser(token)
              // console.log("decode:-----", decode);

              const user = await User.findById(decode._id)
                     .select("-password")
                     .populate("restaurantId", "_id restaurantName");

              if (!user) {
                     return res.status(404).json({
                            message: "User not found",
                     });
              }

              const response = {
                     ...user.toObject(),
                     restaurantName: user.restaurantId.restaurantName,
                     restaurantId: user.restaurantId._id,
              };

              res.status(200).json({
                     message: "verify succefully.....",
                     success: true,
                     response
              });
       } catch (error) {
              res.status(500).json({
                     message: error.message,
              });
       }
};
module.exports = { handleCreateResaurent, handleSignIn, getUserDetails }