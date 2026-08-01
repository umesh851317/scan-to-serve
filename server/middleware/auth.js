const { getUser } = require("../service/auth");

async function checkAuthentication(req, res, next) {
       const authorizationHeaderValue = req.cookies.token // recieve token as cookies....
       if (!authorizationHeaderValue) {
              return res.status(401).json({
                     message: "Token not provided",
              });
       }
       const user = getUser(authorizationHeaderValue);       // verify the token
       console.log("token in getUser....", authorizationHeaderValue);


       req.user = user;     // send to the next midlware or controller (it's like it attach user in req)
       next();
}

function restricTo(roles) {
       return function (req, res, next) {
              if (!req.user) {
                     return res.status(401).json({ message: "user not found " });
              }

              if (!roles.includes(req.user.role)) {
                     return res.status(401).json({ message: "Unauthorized user" });
              }
              return next()
       }
}


module.exports = { checkAuthentication, restricTo }