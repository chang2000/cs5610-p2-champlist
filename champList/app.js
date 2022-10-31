import express from "express";
import bodyParser from "body-parser";
import session from "express-session";

// import router from "./routes/routes.js";

export const PORT = process.env.PORT || 3000;

const app = express();

app.use(session({ secret: "John Loves Web", cookie: { maxAge: 60000 } }));
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);

// app.use(router);

app.use(express.static("frontend"));

// app.post("/login", (req, res) => {
//     console.log("POST login", req.body);
//     const {userName, password} = req.body;
//     console.log("login name and password get: ", userName, password);
// });

app.listen(PORT, () => {
  console.log(`Listening for connections on port ${PORT}`);
});
