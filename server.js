const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
const PORT = process.env.PORT;

require("./db/connection");
const routes = require("./routes/router");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
