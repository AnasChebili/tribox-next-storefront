import convertToSubcurrency from "@/lib/convertToSubcurrency";

export class PaymentController {
  public static async createPaymentIntent(input: number) {
    try {
      const amount = input;
      const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
      const paymentIntent = await stripe.paymentIntents.create({
        amount: convertToSubcurrency(amount),
        currency: "usd",
        automatic_payment_methods: { enabled: true },
      });

      return { clientSecret: paymentIntent.client_secret };
    } catch (error) {
      console.log(error);
      return { error: `internal server error: ${error}` };
    }
  }
}
