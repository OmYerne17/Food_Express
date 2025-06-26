import Razorpay from "razorpay";

export async function POST(req) {
  const { amount, currency = "INR", receipt } = await req.json();

  const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const options = {
    amount: amount * 100, // amount in paise
    currency,
    receipt,
    payment_capture: 1,
  };

  try {
    const order = await razorpay.orders.create(options);
    return Response.json({ orderId: order.id, amount: order.amount, currency: order.currency });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
} 