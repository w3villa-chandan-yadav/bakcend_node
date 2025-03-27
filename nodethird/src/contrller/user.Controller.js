import User from "../models/user.Model.js"



 const userLogin= async (req,res,next)=>{
   try {
    // const allUsers = await User.findAll()
    // const user = await User.findOne({
    //     where:{
    //         userName:"chandann"
    //     }
    // })
    // const allUsers = await User.sequelize.query("SELECT * FROM users")
    const name = "chandannfdn";
    const lastName = "chandan kun"

    // const insertNewUser = await User.create({
    //     userName: "chandannnnn",
    //     fullname: "chandan kumar yada chanda"
    // })

    // const insertUser = await User.sequelize.query(`INSERT INTO users (userName,fullName) VALUES (?,?)`,{      
    //                                                                           replacements:[name,lastName]
    //                                                                                             });
    // const insertUser = await User.sequelize.query('INSERT INTO users (userName,fullName) VALUES (:userName,:fullName)',{
    //     replacements:{userName:name, fullName:lastName}
    // })
      
    // const deleteUser = await User.sequelize.query("DELETE FROM users WHERE userName =? ",{
    //     replacements:["chandann"]
    // })
    // const deleteUser = await User.destroy({
    //     where: {
    //       userName: 'chandann' // Specify the condition to match the userName
    //     }
    //   });

    // const updateUser = await User.sequelize.query("UPDATE users SET userName = ? WHERE id = ?",{
    //     replacements:["chadnandna",2]
    // });

    // const updateUsernew = await User.update({
    //     fullname:"acchaaddfdfdfdfdnanndnand chdhadcakmkmk",
    // },
    //     {
    //         where:{
    //             userName: "chandannnnn"
    //         },
    //     }
    // )

    console.log(updateUsernew)
    // throw new Error("custom error in database")
    res.send("my name is chandan")
   } catch (error) {
    next(error)
   }
}





export  {userLogin} ;