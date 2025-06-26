import crypto from "crypto";
import connectDB from "../../../lib/db";
import Order from "../../../models/Order";

export async function POST(req) {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    items,
    deliveryAddress,
    userId,
    total
  } = await req.json();

  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (generated_signature !== razorpay_signature) {
    return Response.json({ success: false, message: "Invalid signature" }, { status: 400 });
  }

  await connectDB();
  try {
    const newOrder = new Order({
      items,
      total,
      status: "pending",
      deliveryAddress: deliveryAddress || "Default Address",
      restaurantLocation: {
        lat: 20.5937,
        lng: 78.9629
      },
      user: userId || null,
      payment: {
        method: "card",
        status: "completed",
        transactionId: razorpay_payment_id
      }
    });
    await newOrder.save();
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
} 