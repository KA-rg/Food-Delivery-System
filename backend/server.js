import express  from "express"
import cors from 'cors' //permission for fe to connect with be
//Cross-Origin Resource Sharing (CORS)
import { connectDB } from "./config/db.js"
import userRouter from "./routes/userRoute.js"
import foodRouter from "./routes/foodRoute.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"

//app config.
const app = express()
const port = process.env.PORT || 4000;


// middlewares
app.use(express.json())//This middleware parses incoming requests with JSON payloads (i.e., it reads the body of POST, PUT, PATCH requests if they send JSON data).

app.use(cors())//By default, browsers restrict cross-origin HTTP requests for security reasons.

// db connection
connectDB()

// api endpoints
app.use("/api/user", userRouter)
app.use("/api/food", foodRouter)
app.use("/images",express.static('uploads')) //needs a name
app.use("/api/cart", cartRouter)
app.use("/api/order",orderRouter)

app.get("/", (req, res) => {
    res.send("API Working")
  });

app.listen(port, () => console.log(`Server started on http://localhost:${port}`))
// clg order caries due to async funcns