const express = require("express");
const userRoute  = require("./routes/user.Routes");
const { errorHandler } = require("./middleware/error.Middleware");
const app = express();
const cors = require("cors")
require("dotenv").config({
    path: `./utils/.${process.env.NODE_ENV || "development"}.env`
});
// ----for production use NODE_ENV=production node server.js   // or npm run pro ----------//
const sequelize = require("./config/db.config");
const { paymentRoute } = require("./routes/payment.Routes");
const { taskRoute } = require("./routes/task.Routes");
const cookieParser = require("cookie-parser");
console.log(process.env.PORT)
const PORT = process.env.PORT || 4000 ;


//------------------------middlewares ---------------------------//
app.use(cors({
    origin: "*"
}))
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended: true}))



//----------------routes-----------------------//
app.use("/api/v1/",userRoute)


//==========-------tasks----------------===================//
app.use("/api/v1/task/",taskRoute)


// -------------------paymentRoute-------------------//
app.use("/payment/v1/", paymentRoute)



// -----------error middleware----------------//
app.use(errorHandler)

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
} )
