import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import Skeleton from "../shared/Skeleton";

const PaymentForm = ({ clientSecret, totalPrice }) => {
  const stripe = useStripe();
  const element = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {};

  const paymentElementOption = {
    layout: "tabs",
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
      {loading ? (
        <Skeleton />
      ) : (
        <>
          {clientSecret && <PaymentElement options={paymentElementOption} />}{" "}
          {errorMessage && (
            <div className="text-red-500 mt-2">{errorMessage}</div>
          )}
          <button disabled={!stripe || loading}>
            {!loading ? `Pay $${Number(totalPrice).toFixed(2)}` : "Processing"}
          </button>
        </>
      )}
    </form>
  );
};

export default PaymentForm;
