import React from "react";
import SUCCESSIMAGE from "../assets/successPayment.gif";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div className="px-4 max-w-xl w-full mx-auto bg-slate-200 p-4 flex flex-col items-center justify-center my-2 rounded border-2 border-slate-300">
      <div>
        <img src={SUCCESSIMAGE} width={150} height={150} />
      </div>
      <p className="text-xl font-bold text-green-600">Payment Successfully</p>
      {/* <Link
        to={"/order"}
        className="px-4 py-2 border border-green-600 rounded text-green-600 mt-5 font-semibold hover:bg-green-600 hover:text-white"
      >
        See Orders
      </Link> */}
    </div>
  );
};

export default PaymentSuccess;
