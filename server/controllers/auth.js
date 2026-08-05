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
              if (!restaurantName || !ownerName || !phone || !email || !password || !gstNumber || !role) {
                     return res.json({
                            success: false,
                            message: "All field required...."
                     })
              }
              const isExist = await Restaurant.findOne({ email })
              // check restaurent is already exist or not (with email)
              if (isExist) {
                     return res.json({
                            success: false,
                            message: "Restaurent with Email already Exist...."
                     })
              }

              // CREATE RESTAURANT
              const restaurant = await Restaurant.create({
                     restaurantName: restaurantName,
                     ownerName: ownerName,
                     email: email,
                     phone: phone,
                     gstNumber: gstNumber,
                     role:role
              });

              const hashedPassword = await bcrypt.hash(password, 10);  // Hash the password

              // CREATE ADMIN USER
              const user = await User.create({
                     name: ownerName,
                     email: email,
                     phone: phone,
                     password: hashedPassword,
                     role: role,
                     restaurantId: restaurant._id,        // unique id of restaurent
              });
              res.status(201).json({
                     success: true,
                     message: "Resaurent create succefully",
                     // restaurant, user
              });
       } catch (error) {
              console.log(error);
       }
}

async function handleSignIn(req, res) {
       const { email, password } = req.body;
       if (!email || !password) {
              return res.status(400).json({
                     success: false,
                     message: "Email and password are required.",
              });
       }

       const user = await User.findOne({ email });
       if (!user) {
              return res.status(401).json({
                     success: false,
                     message: "User not found.",
              });
       }

       const isMatch = await bcrypt.compare(password, user.password);        // bcrpt email....
       if (!isMatch) {
              return res.status(401).json({
                     success: false,
                     message: "Invalid email or password.",
              });
       }
       const tokenData = {
              _id: user._id,
              email: user.email,
              role: user.role,
              restaurantId: user.restaurantId,
       }
       const token = setUser(tokenData);

       res.cookie("token", token, {
              httpOnly: true,      // prevents JavaScript running in the browser
              secure: process.env.NODE_ENV === "production",   // Only send this cookie over HTTPS.
              sameSite: "lax",     // This helps protect against CSRF (Cross-Site Request Forgery) attacks.
              maxAge: 1 * 8 * 60 * 60 * 1000,   // The cookie expires after 1 days.(3,600,000ms)
              // maxAge: 1 * 24 * 60 * 60 * 1000,   // The cookie expires after 1 days.(86,400,000ms)
       });


       // console.log(token);


       return res.status(200).json({
              success: true,
              message: "login succefull",
       });
}

async function getUserDetails(req, res) {
       try {
              const token = req.cookies.token
              if (!token) {
                     return res.json({
                            response: null,
                            success: false,
                            message: "Unauthorized",
                     });
              }

              const decode = getUser(token)

              const user = await User.findById(decode._id)
                     .select("-password")
                     .populate("restaurantId", "_id restaurantName");

              if (!user) {
                     return res.json({
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

async function updateUserDetails(req, res) {
       try {
              const { _id } = req.user;
              if (!_id || !req.user) {
                     return res.json({
                            success: false,
                            message: "unauthorized...",
                     });
              }
              const { name, email, phone } = req.body;
              if (!name || !email || !phone) {
                     return res.json({
                            success: false,
                            message: "data not recived...",
                     });
              }
              const updatedUser = await User.findByIdAndUpdate(
                     _id,
                     {
                            name, email, phone,
                     },
                     {
                            returnDocument: "after",    // return the new updated document 
                            runValidators: true,        // validate the schema
                     }
              );

              return res.status(200).json({
                     success: true,
                     message: "Profile updated successfully",
                     response: updatedUser,
              });
       } catch (error) {
              return res.status(200).json({
                     success: false,
                     message: "server error",
              });
       }
}

async function changePassword(req, res) {
       try {
              const { _id } = req?.user;
              if (!_id) {
                     return res.json({
                            success: false,
                            message: "Unauthorised....",
                     });
              }
              const user = await User.findOne({ _id });
              if (!user) {
                     return res.status(400).json({
                            success: false,
                            message: "user not find...",
                     });
              }
              const { oldPassword, newPassword } = req.body;
              if (!oldPassword || !newPassword) {
                     return res.json({
                            success: false,
                            message: "Password not recived....",
                     });
              }
              const isMatch = await bcrypt.compare(oldPassword, user.password);        // bcrpt email....
              if (!isMatch) {
                     return res.json({
                            success: false,
                            message: "Invalid Old password.",
                     });
              }
              const hashedPassword = await bcrypt.hash(newPassword, 10);  // Hash the password

              const updatedUser = await User.findByIdAndUpdate(
                     _id,
                     { password: hashedPassword },
                     { new: true }
              );

              return res.status(200).json({
                     success: true,
                     message: "Password change successfully",
              });

       } catch (error) {
              console.error(error);

              return res.status(500).json({
                     success: false,
                     message: "Internal server error",
              });
       }
}

async function logout(req, res) {
       res.clearCookie("token", {
              httpOnly: true,
              secure: true,
              sameSite: "none",
       });

       return res.status(200).json({
              success: true,
              message: "Logout successfully",
       });
};
module.exports = { handleCreateResaurent, handleSignIn, getUserDetails, updateUserDetails, changePassword, logout }