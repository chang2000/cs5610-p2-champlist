import express from "express";
import bodyParser from "body-parser";
import router, {PORT} from "./routes/routes.js"

const app = express()
// export const PORT = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.use(router);

app.use(express.static('frontend'))




app.listen(PORT, () => {
    console.log(`Listening for connections on port ${PORT}`);
  });
  