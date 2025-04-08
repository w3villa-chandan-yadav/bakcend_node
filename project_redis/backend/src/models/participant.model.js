// participant.model.js
import { DataTypes } from "sequelize";
import sequelize from "../config/dbConnection.js";
import User from "./user.model.js";
import Games from "./games.model.js";
import { EmailVerification } from "./emailLogin.model.js";
import { PhoneVerification } from "./phoneNumberverification.model.js";

const Participant = sequelize.define("Participant", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,  
    references: {
      model: User,
      key: 'id'
    },
    onDelete: "CASCADE"  
  },
  gameId: {
    type: DataTypes.INTEGER,
    allowNull: true,  
    references: {
      model: Games,
      key: 'id'
    },
    onDelete: 'CASCADE' 
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}, {
  timestamps: false, 
});

// Syncing Participant table to the database
// Participant.sync()
//   .then(() => {
//     console.log("Participant table is synced");
//   })
//   .catch((error) => {
//     console.log("Error syncing the Participant table:", error);
//   });

User.sync()
  .then(() => {
    console.log("User table is synced");

    // Sync Games Table Second
    return Games.sync();
  })
  .then(() => {
    console.log("Games table is synced");

    // Sync Participant Table Last
    return Participant.sync();
  })
  .then(() => {
    console.log("Participant table is synced");

    return EmailVerification.sync()
  }).then(()=>{
    console.log("emailmodel is sync")

    return PhoneVerification.sync()
  }).then(()=>{
    console.log("syncing completed")
  })
  .catch((err) => {
    console.error("Error syncing tables:", err);
  });

export default Participant;
