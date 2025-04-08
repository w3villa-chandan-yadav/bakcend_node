import sequelize from "../config/dbConnection.js"




export const nativeQuery = async(query,parameters,transactions = null)=>{

    try {
        // console.log(parameters)    
        //  ...(transactions && { transaction : transactions}) means if the transaction is avalable then only add other wise dont add
        const [result] = await sequelize.query(query,{replacements:parameters , ...(transactions && {transaction: transactions})})
        return result
        
    } catch (error) {
        console.log("error in executing the raw query",error)
    }

}

