const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors") 
const { sequelize } = require("./config");
const { commentModel } = require("./models/comment.Model");
const { errorhandler } = require("./middleware/error.Middleware");
const { userRoute } = require("./routes");
const { userModel } = require("./models/user.Model");
const { postModel } = require("./models/post.Model");
const cookieParser = require("cookie-parser");
const { likeModel } = require("./models/likes.Model");
dotenv.config({
    path: `./uitils/.${process.env.ENVIRONMENT || "local"}.env`
})
const PORT= process.env.PORT || 5000 
app.use(cors())
app.use(express.json());
app.use(cookieParser())













// Register all models in an object
const models = {
  userModel,
  postModel,
  commentModel,
  likeModel
};

// Now call associate method on each model
Object.values(models).forEach(model => {
  if (model.associate) {
    model.associate(models);
  }
});

// Finally, sync

sequelize.sync({ force: false })
  .then(() => console.log("Tables synced and associations linked!"))
  .catch(err => console.error("Sync error:", err));
































app.use("/api/v1",userRoute)

app.use(errorhandler)

app.listen(PORT, ()=>{
    console.log(`server is running on PORT ${PORT}`)
})

