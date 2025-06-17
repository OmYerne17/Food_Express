import { NextResponse } from 'next/server';
import { jsPDF } from 'jspdf';

export async function POST(request) {
    try {
        const { orderId, orderDetails } = await request.json();

        if (!orderDetails) {
            return NextResponse.json(
                { error: 'Order details are required' },
                { status: 400 }
            );
        }

        // Create PDF
        const doc = new jsPDF();
        let y = 20; // Starting y position

        // Add content to PDF
        doc.setFontSize(20);
        doc.text('Order Receipt', 105, y, { align: 'center' });
        y += 15;

        // Order details
        doc.setFontSize(12);
        doc.text(`Order ID: ${orderDetails.id}`, 20, y);
        y += 7;
        doc.text(`Date: ${new Date(orderDetails.createdAt).toLocaleString()}`, 20, y);
        y += 7;
        doc.text(`Delivery Address: ${orderDetails.deliveryAddress}`, 20, y);
        y += 7;
        doc.text(`Status: ${orderDetails.status}`, 20, y);
        y += 15;

        // Add items table
        doc.setFontSize(14);
        doc.text('Items:', 20, y);
        y += 10;

        // Table header
        doc.setFontSize(12);
        doc.text('Item', 20, y);
        doc.text('Quantity', 80, y);
        doc.text('Price', 120, y);
        doc.text('Total', 160, y);
        y += 7;

        // Table rows
        if (orderDetails.items && Array.isArray(orderDetails.items)) {
            orderDetails.items.forEach(item => {
                const itemTotal = (item.price || 0) * (item.quantity || 1);
                doc.text(item.name || 'Unknown Item', 20, y);
                doc.text((item.quantity || 1).toString(), 80, y);
                doc.text(`₹${item.price || 0}`, 120, y);
                doc.text(`₹${itemTotal}`, 160, y);
                y += 7;
            });
        } else {
            doc.text('No items in this order', 20, y);
            y += 7;
        }

        // Add total
        y += 10;
        doc.setFontSize(14);
        doc.text(`Total Amount: ₹${orderDetails.total || 0}`, 160, y, { align: 'right' });

        // Add footer
        y += 20;
        doc.setFontSize(10);
        doc.text('Thank you for your order!', 105, y, { align: 'center' });

        // Get PDF as buffer
        const pdfBuffer = Buffer.from(doc.output('arraybuffer'));

        // Return PDF as response
        return new NextResponse(pdfBuffer, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="order-receipt-${orderId}.pdf"`,
            },
        });
    } catch (error) {
        console.error('Error generating receipt:', error);
        return NextResponse.json(
            { error: 'Failed to generate receipt: ' + error.message },
            { status: 500 }
        );
    }
} 