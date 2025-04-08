import twilio from "twilio" ;

const twilioClient  = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

const sendNewSms = (to,message)=>{

    twilioClient.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: to
    }).then((message)=>{
         return "message send successfully"
    }).catch((error)=>{
        return "error in message sending"
    })

}

export { sendNewSms }