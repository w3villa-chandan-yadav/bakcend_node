const ERRORS= {
    USERERROR:{
       ALLFIELDSREQUIRED: "All fields are required",
       ALLREADYUSER: "Email already in user",
       CREADIENTALERROR: "Please provide a valid creadiental",
       INVALIDTOKEN: "Please provide a valid token",
       INVALIDBLOGID: "Please provide a valid Blog Id",
       NOTALLOWEPOSTDELETION: "Not Allow to delete someone post",
       NOTALLOWECOMMENTDELETION: "Not Allow to delete please provide a valid/authenticated comment"
    },
    SERVERERROR: {
        INTERNALERROR: "Internal server error"
    }
}


module.exports = { ERRORS }