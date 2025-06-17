import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Order from '@/models/Order';

export async function PATCH(request, { params }) {
    try {
        const { orderId } = params;
        const { status } = await request.json();

        await connectDB();
        
        const order = await Order.findByIdAndUpdate(
            orderId,
            { status },
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
        console.error('Error updating order status:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update order status' },
            { status: 500 }
        );
    }
} 