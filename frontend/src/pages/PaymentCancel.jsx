import React from "react";
import CANCELIMAGE from "../assets/cancelPayment.gif";
import { Link } from "react-router-dom";

const PaymentCancel = () => {
  return (
    <div className="px-4 max-w-xl w-full mx-auto bg-slate-200 p-4 flex flex-col items-center justify-center my-2 rounded border-2 border-slate-300">
      <div>
        <img
          src={CANCELIMAGE}
          width={150}
          height={150}
          className="mix-blend-multiply"
        />
      </div>
      <p className="text-xl font-bold text-red-600">Payment Cancel</p>
      <Link
        to={"/cart"}
        className="px-4 py-2 border border-red-600 rounded text-red-600 mt-5 font-semibold hover:bg-red-600 hover:text-white"
      >
        Go To Cart
      </Link>
    </div>
  );
};

export default PaymentCancel;
