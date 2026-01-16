import React from "react";
import axios from "axios";

const Payment = ({ amount }) => {
  const loadRazorpay = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5050/api/v1/payment/create-order",
        {},
        { withCredentials: true }
      );

      const razorpayOrder = data.razorpayOrder;

      const options = {
        key: "rzp_test_S3FCmsTEOcMKs6",
        amount: razorpayOrder.amount,
        currency: "INR",
        name: "My Shop",
        description: "Order Payment",
        order_id: razorpayOrder.id,

        handler: async function (response) {
          await axios.post(
            "http://localhost:5050/api/v1/payment/verify-payment",
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            },
            { withCredentials: true }
          );

          alert("Payment Successful");
        },

        prefill: {
          name: "Mahipal",
          email: "mahipalsingh450@gmail.com",
        },

        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error(error);
      alert("Payment failed");
    }
  };

  return <button onClick={loadRazorpay}>Pay ₹{amount}</button>;
};

export default Payment;
