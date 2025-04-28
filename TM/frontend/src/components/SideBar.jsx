import React from 'react'
import logoImage from "../assets/project-management.png";
import { PiGridFourFill } from "react-icons/pi";
import { FaCopy } from "react-icons/fa";
import { MdMarkUnreadChatAlt } from "react-icons/md";
import { FaBell } from "react-icons/fa";
import { IoExitOutline } from "react-icons/io5";
import { FaQuestionCircle } from "react-icons/fa";
import { SiSpacemacs } from "react-icons/si";
import { useDispatch } from 'react-redux';
import { logOut } from '../redux/slices/userSlice';
import { TbPremiumRights } from "react-icons/tb";








const SideBar = () => {
    const dispatch = useDispatch()

    const fetchPayment = async ()=>{
        try {
            const data = await fetch("http://localhost:4000/payment/v1/createPayment",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const result = await data.json();

            console.log(result)

            const options ={
                key: "rzp_test_DWYqJIt4IyNzn8",
                amount: result?.data?.amount,
                currency: result?.data?.currency,
                name: result?.data?.name,
                description: "Test Transaction",
                order_id: result?.data?.id,
                handler: async (response)=>{
                    
                    console.log(response)

                      const data = await fetch("http://localhost:4000/payment/v1/verify",{
                        method: "POST",
                        headers:{
                            "Content-Type": "application/json"
                        },
                        body : JSON.stringify( {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                          })
                      })

                      const result = await data.json();

                      console.log(result)
                }
            }

            const rzp = new Razorpay(options)

            rzp.open()
            
        } catch (error) {
            console.log("error in the fetchPayment")
        }
    }




  return (
    <div className='flex flex-col justify-between h-full items-center p-2'>
        <div className='flex flex-col gap-10'>
        <div>
         {/* <img src={logoImage} className='w-12 bg-white rounded-xl text-white'/> */}
         <SiSpacemacs className='text-white text-3xl'/>
        </div>
        <div className='flex flex-col gap-2'>
            <div onClick={fetchPayment} className='text-center hover:bg-gray-600 rounded-sm cursor-pointer group'>
              <PiGridFourFill className='text-3xl mx-auto group-hover:text-white  text-gray-500 transition-all duration-150'/>
            </div>
            <div className='text-center hover:bg-gray-600 rounded-sm cursor-pointer px-2 py-1 group'>
                <FaCopy  className='text-2xl mx-auto group-hover:text-white text-gray-500  transition-all duration-150'/>
            </div>
            <div className='text-center hover:bg-gray-600 rounded-sm cursor-pointer px-2 py-1 group '>
                <MdMarkUnreadChatAlt  className='text-2xl mx-auto group-hover:text-white text-gray-500  transition-all duration-150'/> 
            </div>
            <div className='text-center hover:bg-gray-600 rounded-sm cursor-pointer px-2 py-1 group '>
                <TbPremiumRights  className='text-2xl mx-auto group-hover:text-white text-gray-500  transition-all duration-150'/> 
            </div>
            <div className='text-center hover:bg-gray-600 rounded-sm cursor-pointer px-2 py-1 group '>
                <FaBell  className='text-2xl mx-auto group-hover:text-white text-gray-500  transition-all duration-150'/>
            </div>
        </div>
        </div>
        <div className=' flex flex-col gap-3'>
        <div className='text-center hover:bg-gray-600 rounded-sm cursor-pointer px-2 py-1 group '>
        <IoExitOutline 
        onClick={()=>{sessionStorage.removeItem("user")
            dispatch(logOut())
        }}
        className=' text-2xl mx-auto group-hover:text-white text-gray-500  transition-all duration-150'/>
            </div>
        <div className='text-center hover:bg-gray-600 rounded-sm cursor-pointer px-2 py-1 group '>
            <FaQuestionCircle  className='text-2xl mx-auto group-hover:text-white text-gray-500 drop-shadow-2xl drop-shadow-black  transition-all duration-150'/>
        </div>
        </div>
    </div>
  )
}

export default SideBar