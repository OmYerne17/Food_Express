export default function OrderConfirmation() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4 text-green-600">Order Confirmed!</h1>
        <p className="mb-2">Thank you for your payment. Your order has been placed successfully.</p>
        <p className="mb-6">You can track your order in the <b>Orders</b> section.</p>
        <a href="/user/dashboard" className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition">Back to Dashboard</a>
      </div>
    </div>
  );
} 