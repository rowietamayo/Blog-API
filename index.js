//Routes Middleware
const blogRoutes = require("./routes/blog")
const userRoutes = require("./routes/user")
const cors = require("cors")

const express = require("express")
const mongoose = require("mongoose")
const port = 4000
require("dotenv").config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

const corsOptions = {
  origin: [
    "http://localhost:4173", // build
    "http://localhost:4000",
    "http://localhost:5173", // dev
  ],
  credentials: true,
  optionsSuccessStatus: 200,
}
app.use(cors(corsOptions))

mongoose.connect(process.env.MONGODB_STRING, {})

app.use("/blogs", blogRoutes)
app.use("/users", userRoutes)

mongoose.connection.once("open", () =>
  console.log("Now connected to MongoDB Atlas")
)

app.listen(port, () =>
  console.log(`API is now available on port ${process.env.PORT || port}`)
)

module.exports = { app, mongoose }
