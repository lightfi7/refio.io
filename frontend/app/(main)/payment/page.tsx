"use client";

import { useSearchParams } from "next/navigation";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState, Suspense } from "react";
import { useSession } from "next-auth/react";

function PaymentPage() {
  const { data: session, update } = useSession();
  const searchParams = useSearchParams();
  const annual = searchParams.get("annual");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function Message({ content }: { content: string }) {
    return <p className="text-red-500">{content}</p>;
  }

  const initialOptions = {
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
    "enable-funding": "venmo",
    "buyer-country": "US",
    currency: "USD",
    components: "buttons",
    vault: true,
  };

  const totalCost = annual ? 200 : 19;

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold mb-2">Please Make the Payment</h1>
      <h2 className="text-xl text-divider/60 mb-4">
        Total Cost to Pay: ${totalCost}
      </h2>
      <div className="w-full max-w-lg mt-8 bg-transparent">
        <PayPalScriptProvider options={initialOptions}>
          <PayPalButtons
            createOrder={async () => {
              setLoading(true);
              try {
                const response = await fetch("/api/orders", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ amount: totalCost }),
                });

                const orderData = await response.json();

                if (orderData.id) {
                  return orderData.id;
                } else {
                  throw new Error("Order creation failed");
                }
              } catch (error) {
                setMessage(`Could not initiate PayPal Checkout`);
              } finally {
                setLoading(false);
              }
            }}
            style={{
              layout: "vertical", // or 'horizontal'
              color: "gold", // options: 'gold', 'blue', 'silver', 'white', 'black'
              shape: "rect", // options: 'rect' or 'pill'
              label: "paypal", // options: 'paypal', 'checkout', 'pay'
              height: 50, // set height if needed
            }}
            onApprove={async (data) => {
              setLoading(true);
              try {
                update({ ...session?.user, subscribed: true });

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
                  setMessage("Transaction completed successfully!");
                } else {
                  throw new Error("Transaction not completed");
                }
              } catch (error) {
                setMessage(`Sorry, your transaction could not be processed`);
              } finally {
                setLoading(false);
              }
            }}
          />
        </PayPalScriptProvider>
      </div>
      {loading && <p className="text-blue-500">Processing your payment...</p>}
      {message && <Message content={message} />}

      {/* Descriptive Text Below PayPal Buttons */}
      <div className="mt-4 text-center text-gray-600">
        <p>Your payment will be securely processed through PayPal.</p>
        <p>
          If you have any questions or issues, please contact our support team.
        </p>
      </div>
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
