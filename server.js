import { app } from "./app.js";
import Razorpay from "razorpay";
import { connect } from "./config/dbConnection.js";

connect();

export const instance = new Razorpay({
  key_id: process.env.RAZOR_PAY_KEY_ID,
  key_secret: process.env.RAZOR_PAY_SECRET_KEY,
});

app.listen(process.env.PORT, function () {
    console.log("Server running on port " + process.env.PORT);
});
