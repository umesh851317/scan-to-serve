const dotenv = require("dotenv");
dotenv.config();

const app = require("./app");

const PORT = process.env.PORT;

app.get("/", (req, res) => {
       res.send("S2S Backend Running");
});

app.listen(PORT, () => {
       console.log(`Server running on port ${PORT}`);
});