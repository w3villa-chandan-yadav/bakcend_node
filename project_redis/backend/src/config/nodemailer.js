import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config()

const transponder = nodemailer.createTransport({
    service:"gmail",
    auth: {
       user: process.env.EMAIL,
       pass: process.env.EMAIL_PASSWORD 
    }
})



const sendMailAuthentication = async(reciver , link ,subjects = "This is verification mail")=>{
       const mailOption ={
          from:process.env.EMAIL,
          to:reciver,
          subject: subjects,
          html: `
        <!DOCTYPE html>
        <html>
        <head>
            <title>${subjects}</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 20px;
                }
                h1 {
                    color: #3498db;
                }
                p {
                    font-size: 18px;
                }
            </style>
        </head>
        <body>
            <h1>${subjects}</h1>
            <p>This is an <strong>HTML</strong> email!</p>
             <a href="${link}" target="_blank" style="color:black;">Click here to <span style="color: #3498db">visit</span> the link</a>
            <p>Thank you for using our service!</p>
        </body>
        </html>
    `,
 }

    transponder.sendMail(mailOption,(err,info)=>{

        if(err){
            console.log("error in nodemailer ",err)
            throw new Error("error in emailsender ")
        }

        return info
    })


}


export { sendMailAuthentication }; 


