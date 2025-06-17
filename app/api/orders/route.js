import { NextResponse } from 'next/server';
import connectDB from "../../lib/db";
import Order from '../../../models/Order';

export async function GET(request) {
    try {
        await connectDB();
        
        // Get user ID from request headers
        const userId = request.headers.get('user-id');
        
        // If no user ID provided, return error
        if (!userId) {
            return NextResponse.json(
                { success: false, error: 'User ID is required' },
                { status: 400 }
            );
        }

        // Find orders for specific user
        const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, orders });
    } catch (error) {
        console.error('Error in GET /api/orders:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to fetch orders' },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        console.log('Starting order creation process...');
        
        // Connect to database first
        console.log('Connecting to database...');
        const dbConnection = await connectDB();
        if (!dbConnection) {
            throw new Error('Failed to connect to database');
        }
        console.log('Database connected successfully');

        // Parse request body
        console.log('Parsing request body...');
        const orderData = await request.json();
        console.log('Order data received:', JSON.stringify(orderData, null, 2));
        
        // Validate order data
        if (!orderData.items || !Array.isArray(orderData.items)) {
            console.error('Invalid order data: items array missing');
            return NextResponse.json(
                { success: false, error: 'Invalid order data: items array is required' },
                { status: 400 }
            );
        }

        // Validate items data
        if (!orderData.items.every(item => item.name && typeof item.price === 'number')) {
            console.error('Invalid item data:', orderData.items);
            return NextResponse.json(
                { success: false, error: 'Invalid item data: each item must have name and price' },
                { status: 400 }
            );
        }

        // Calculate total
        const total = orderData.items.reduce((sum, item) => {
            const quantity = item.quantity || 1;
            return sum + (item.price * quantity);
        }, 0);

        console.log('Creating new order with data:', {
            items: orderData.items,
            total,
            status: 'pending',
            deliveryAddress: orderData.deliveryAddress || 'Default Address'
        });

        const newOrder = new Order({
            items: orderData.items,
            total,
            status: 'pending',
            deliveryAddress: orderData.deliveryAddress || 'Default Address',
            restaurantLocation: {
                lat: 20.5937,
                lng: 78.9629
            },
            user: orderData.userId || null
        });

        console.log('Saving order to database...');
        const savedOrder = await newOrder.save();
        console.log('Order saved successfully:', savedOrder);

        return NextResponse.json({ 
            success: true, 
            order: savedOrder,
            message: 'Order created successfully'
        });
    } catch (error) {
        console.error('Detailed error in POST /api/orders:', {
            name: error.name,
            message: error.message,
            stack: error.stack
        });
        
        // Handle specific error types
        if (error.name === 'ValidationError') {
            return NextResponse.json(
                { success: false, error: 'Invalid order data: ' + error.message },
                { status: 400 }
            );
        }
        
        if (error.name === 'MongoServerError') {
            return NextResponse.json(
                { success: false, error: 'Database error: ' + error.message },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { success: false, error: 'Failed to create order: ' + error.message },
            { status: 500 }
        );
    }
}