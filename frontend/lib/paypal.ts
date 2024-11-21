import {
  ApiError,
  CheckoutPaymentIntent,
  Client,
  Environment,
  LogLevel,
  OrdersController,
} from "@paypal/paypal-server-sdk";

// Creating an environment
export const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID as string;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET as string;

const client = new Client({
  clientCredentialsAuthCredentials: {
    oAuthClientId: PAYPAL_CLIENT_ID,
    oAuthClientSecret: PAYPAL_CLIENT_SECRET,
  },
  timeout: 0,
  environment: Environment.Sandbox,
  logging: {
    logLevel: LogLevel.Info,
    logRequest: {
      logBody: true,
    },
    logResponse: {
      logHeaders: true,
    },
  },
});

const ordersController = new OrdersController(client);

export const createOrder = async (amount: any) => {
  const collect = {
    body: {
      intent: CheckoutPaymentIntent.Capture,
      purchaseUnits: [
        {
          amount: {
            currencyCode: "USD",
            value: amount,
          },
        },
      ],
    },
    prefer: "return=minimal",
  };

  try {
    const order = await ordersController.ordersCreate(collect);

    console.log("order", order);

    const { body, ...httpResponse } = order;

    // Get more response info...
    // const { statusCode, headers } = httpResponse;
    return {
      jsonResponse: JSON.parse(body as string),
      httpStatusCode: httpResponse.statusCode,
    };
  } catch (error) {
    console.log(error);
    if (error instanceof ApiError) {
      // const { statusCode, headers } = error;
      throw new Error(error.message);
    }
  }
};

export const captureOrder = async (orderID: any) => {
  const collect = {
    id: orderID,
    prefer: "return=minimal",
  };

  try {
    const { body, ...httpResponse } =
      await ordersController.ordersCapture(collect);

    return {
      jsonResponse: JSON.parse(body as string),
      httpStatusCode: httpResponse.statusCode,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      throw new Error(error.message);
    }
  }
};
