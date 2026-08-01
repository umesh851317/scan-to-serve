async function handleAdmin(req, res) {
       console.log("THis is admin request");
       const token = req.user

       return res.json({
              message: "after protected Handle admin",
              token
       })
}

module.exports = { handleAdmin }