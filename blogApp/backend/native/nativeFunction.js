const { sequelize } = require("../config");


const nativeExecution = async (query, parameters, transaction)=>{

    const [result] = await sequelize.query(query,{ replacements: parameters , ...(transaction && { transaction: transaction})})

    return result 

}