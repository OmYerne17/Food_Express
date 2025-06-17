'use client'
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

export default function PaymentForm({ order, onPaymentComplete }) {
    const [paymentMethod, setPaymentMethod] = useState('cash');
    const [upiId, setUpiId] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePayment = async () => {
        try {
            setIsProcessing(true);

            if (paymentMethod === 'upi' && !upiId) {
                toast.error('Please enter UPI ID');
                return;
            }

            // In a real application, you would integrate with a payment gateway here
            // For demo purposes, we'll simulate a successful payment
            const paymentData = {
                method: paymentMethod,
                status: 'completed',
                transactionId: `TXN${Date.now()}`,
                upiId: paymentMethod === 'upi' ? upiId : undefined
            };

            // Update order with payment information
            const response = await fetch(`/api/orders/${order._id}/payment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paymentData),
            });

            if (!response.ok) {
                throw new Error('Payment failed');
            }

            toast.success('Payment successful!');
            onPaymentComplete();
        } catch (error) {
            console.error('Payment error:', error);
            toast.error('Payment failed. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
                <RadioGroup
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                    className="space-y-4"
                >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="cash" id="cash" />
                        <Label htmlFor="cash">Cash on Delivery</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="upi" id="upi" />
                        <Label htmlFor="upi">UPI Payment</Label>
                    </div>
                </RadioGroup>
            </div>

            {paymentMethod === 'upi' && (
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="upiId">UPI ID</Label>
                        <Input
                            id="upiId"
                            placeholder="Enter your UPI ID"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                        />
                    </div>
                </div>
            )}

            <div className="border-t pt-4">
                <div className="flex justify-between mb-4">
                    <span className="font-semibold">Total Amount:</span>
                    <span className="font-semibold">₹{order.total.toFixed(2)}</span>
                </div>
                <Button
                    className="w-full"
                    onClick={handlePayment}
                    disabled={isProcessing}
                >
                    {isProcessing ? 'Processing...' : 'Pay Now'}
                </Button>
            </div>
        </div>
    );
} 