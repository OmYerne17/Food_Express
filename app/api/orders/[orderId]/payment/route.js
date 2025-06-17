import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Order from '@/models/Order';

export async function POST(request, { params }) {
    try {
        const { orderId } = params;
        const paymentData = await request.json();

        await connectDB();
        
        const order = await Order.findByIdAndUpdate(
            orderId,
            { 
                payment: paymentData
            },
            { new: true }
        );

        if (!order) {
            return NextResponse.json(
                { success: false, error: 'Order not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, order });
    } catch (error) {
        console.error('Error processing payment:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to process payment' },
            { status: 500 }
        );
    }
} 