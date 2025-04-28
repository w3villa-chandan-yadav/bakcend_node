const { razorpay } = require("../config/rzorpay.config");
const crypto = require("crypto")

;

const paymentCachup = async (req, res, next)=>{
    try {
        const { paymentAmoutn=1000  } = req.body;

        console.log("this is paymentCachup")

        const options ={
            amount: paymentAmoutn*100,
            currency: "INR",
            receipt: "order_instain_1"
        }



        const responce = await razorpay.orders.create(options)

        // , function(err, order){

        // })

        res.status(200).json({
            success: false,
            message: "order created successfully",
            data : responce
        })
        
    } catch (error) {
        console.log("error in payment controller", error);
        next( new ApiError(500, SERVER.INTERNALERROR))
    }
}


const verifyingPayment = async (req, res, next)=>{
    try {
        console.log("inside the payment verification")
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        // console.log(razorpay_order_id, razorpay_payment_id, razorpay_signature)

        const signature  = crypto.createHmac("sha256",process.env.RAZORPAY_SECRET).update(`${razorpay_order_id}|${razorpay_payment_id}`).digest("hex");


        console.log(signature)

        if(!razorpay_signature === signature){
        return res.status(401).json({
            success: false,
            message: "please try after some time"
        })

        }

        res.status(200).json({
            success: true,
            message: "Tier updated successfully"
        })
        
    } catch (error) {
        console.log("error in verifying the payment")
    }
}



module.exports =  { paymentCachup , verifyingPayment }