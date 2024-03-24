import Payment from "../models/paymentModel.js";
import { instance } from "../server.js";
import CryptoJS from "crypto-js";

const checkOut = async (req, res) => {
const options = {
  amount: Number(req.body.amount) * 100,  // amount in the smallest currency unit
  currency: "INR",
  };
  
  const order = await instance.orders.create(options);

  console.log(order)
    res.status(200).json({
      success: true,
      order
    })
}

export const paymentVerification = async (req, res) => {
  console.log(req.body)
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

  const generated_signature = CryptoJS.HmacSHA256(razorpay_order_id + "|" + razorpay_payment_id, process.env.RAZOR_PAY_SECRET_KEY);

  console.log(generated_signature);
  console.log(razorpay_signature);
  if (generated_signature == razorpay_signature) {
    Payment.create({
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
    })
    console.log("payment is successful")
    res.redirect(`http://localhost:5173/paymentSuccessful?${razorpay_order_id}`)
  } else {
    res.status(!200).json({
      success: false,
    })
  }    
}
export default checkOut;