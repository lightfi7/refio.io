"use client";

import { useSearchParams } from "next/navigation";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState, Suspense } from "react";

function PaymentPage() {
  const searchParams = useSearchParams();
  const annual = searchParams.get("annual");
  const [message, setMessage] = useState("");

  function Message({ content }: { content: string }) {
    return <p>{content}</p>;
  }

  const initialOptions = {
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "", // Use environment variable
    "enable-funding": "venmo",
    "buyer-country": "US",
    currency: "USD",
    components: "buttons",
  };

  return (
    <div className="paypal-button-container">
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          createOrder={async () => {
            try {
              const response = await fetch("/api/orders", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  amount: annual ? 200 : 19,
                }),
              });

              const orderData = await response.json();

              if (orderData.id) {
                return orderData.id;
              } else {
                throw new Error("Order creation failed");
              }
            } catch (error) {
              console.error(error);
              setMessage(`Could not initiate PayPal Checkout...${error}`);
            }
          }}
          style={{
            shape: "rect",
            layout: "vertical",
            color: "gold",
            label: "paypal",
          }}
          onApprove={async (data, actions) => {
            try {
              const response = await fetch(
                `/api/orders/${data.orderID}/capture`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                },
              );

              const orderData = await response.json();

              if (orderData.status === "COMPLETED") {
                setMessage(`Transaction completed successfully!`);
              } else {
                throw new Error("Transaction not completed");
              }
            } catch (error) {
              console.error(error);
              setMessage(
                `Sorry, your transaction could not be processed...${error}`,
              );
            }
          }}
        />
      </PayPalScriptProvider>
      <Message content={message} />
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading payment options...</div>}>
      <PaymentPage />
    </Suspense>
  );
}
