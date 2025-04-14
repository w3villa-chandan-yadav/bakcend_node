import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";


const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp({format: "YYYY-MM-DD HH:mm:ss"}),
        winston.format.printf(({timestamp, level , message})=>{
            return `${timestamp} [${level}] :-- ${message}`
        })
    ),
       
    transports:[
        new winston.transports.Console(),
        // new winston.transports.File({ filename: "logs/error.log", level: "error" }), 
        // new winston.transports.File({ filename: "logs/combined.log" }) ,
        new DailyRotateFile({
            filename: "logs/%DATE%-error.log",
            datePattern: "YYYY-MM-DD",
            level: "error",
            maxSize: "5m",
            maxFiles: "14d",
            zippedArchive: true }), 

        new DailyRotateFile({
            filename: "logs/%DATE%-combined.log",
            datePattern: "YYYY-MM-DD",
            maxSize: "10m",
            maxFiles: "14d",
            zippedArchive: true
            })
    ]
})



export { logger }