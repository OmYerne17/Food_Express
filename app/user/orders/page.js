'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiClock, FiMapPin, FiDownload, FiUser, FiCreditCard, FiNavigation, FiHome, FiShoppingBag, FiUser as FiUserIcon } from 'react-icons/fi';
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { toast } from "sonner";

function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeOrder, setActiveOrder] = useState(null);
    const [downloadingReceipt, setDownloadingReceipt] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    const router = useRouter();

    useEffect(() => {
        fetchOrders();
        const userData = localStorage.getItem("User");
        if (userData) {
            setUserDetails(JSON.parse(userData));
        }
    }, []);

    const fetchOrders = async () => {
        try {
            setIsLoading(true);
            const userData = localStorage.getItem("User");
            if (!userData) {
                router.push('/login');
                return;
            }
            
            const user = JSON.parse(userData);
            const response = await fetch('http://localhost:3000/api/orders', {
                headers: {
                    'user-id': user._id
                }
            });
            const data = await response.json();
            setOrders(data.orders || []); // Ensure we always set an array
        } catch (error) {
            console.error('Error fetching orders:', error);
            setOrders([]); // Set empty array on error
        } finally {
            setIsLoading(false);
        }
    };

    const generateReceipt = async (order) => {
        if (downloadingReceipt) return;
        
        try {
            setDownloadingReceipt(true);
            toast.loading("Generating receipt...");

            // Ensure we have all required data
            const orderDetails = {
                id: order.id,
                items: order.items || [],
                total: order.total || 0,
                deliveryAddress: order.deliveryAddress || 'No address provided',
                createdAt: order.createdAt || new Date().toISOString(),
                status: order.status || 'unknown'
            };

            const response = await fetch('/api/generate-receipt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    orderId: order.id,
                    orderDetails
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `order-receipt-${order.id}.pdf`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            
            toast.success("Receipt downloaded successfully!");
        } catch (error) {
            console.error('Error generating receipt:', error);
            toast.error(error.message || "Failed to generate receipt. Please try again.");
        } finally {
            setDownloadingReceipt(false);
            toast.dismiss();
        }
    };

    const getOrderStatus = (order) => {
        const statuses = {
            'preparing': 'Preparing your order',
            'out_for_delivery': 'Out for delivery',
            'delivered': 'Delivered',
            'cancelled': 'Cancelled'
        };
        return statuses[order.status] || 'Order placed';
    };

    const getPaymentMethod = (order) => {
        return order.paymentMethod || 'Cash on Delivery';
    };

    const getDeliveryDetails = (order) => {
        return {
            name: order.deliveryDetails?.name || userDetails?.name || 'Not specified',
            phone: order.deliveryDetails?.phone || userDetails?.phone || 'Not specified',
            address: order.deliveryAddress || 'Not specified'
        };
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading orders...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation Menu */}
            <div className="bg-white shadow-sm sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button 
                                onClick={() => router.push('/user/dashboard')}
                                className="text-gray-600 hover:text-gray-900"
                            >
                                <FiNavigation size={24} />
                            </button>
                            <h1 className="text-xl font-bold">Your Orders</h1>
                        </div>
                        <div className="flex items-center gap-4">
                            <Button
                                variant="ghost"
                                onClick={() => router.push('/user/dashboard')}
                                className="flex items-center gap-2"
                            >
                                <FiHome className="mr-2" />
                                Dashboard
                            </Button>
                            <Button
                                variant="ghost"
                                onClick={() => router.push('/user/cart')}
                                className="flex items-center gap-2"
                            >
                                <FiShoppingBag className="mr-2" />
                                Cart
                            </Button>
                            <Button
                                variant="ghost"
                                onClick={() => router.push('/user/profile')}
                                className="flex items-center gap-2"
                            >
                                <FiUserIcon className="mr-2" />
                                Profile
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <Tabs defaultValue="active" className="w-full">
                    <TabsList className="mb-4">
                        <TabsTrigger value="active">Active Orders</TabsTrigger>
                        <TabsTrigger value="history">Order History</TabsTrigger>
                    </TabsList>

                    <TabsContent value="active">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {orders.length === 0 ? (
                                <div className="col-span-2 text-center py-8">
                                    <p className="text-gray-600">No active orders found</p>
                                </div>
                            ) : (
                                orders.filter(order => order.status !== 'delivered' && order.status !== 'cancelled').map((order) => (
                                    <Card key={order._id || order.id} className="p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                                                <p className="text-gray-600">{new Date(order.createdAt).toLocaleString()}</p>
                                            </div>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => generateReceipt(order)}
                                                disabled={downloadingReceipt}
                                            >
                                                <FiDownload className="mr-2" />
                                                {downloadingReceipt ? 'Downloading...' : 'Receipt'}
                                            </Button>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-center text-gray-600">
                                                <FiClock className="mr-2" />
                                                <span>{getOrderStatus(order)}</span>
                                            </div>

                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <h4 className="font-semibold mb-2">Delivery Details</h4>
                                                <div className="space-y-2">
                                                    <div className="flex items-center text-gray-600">
                                                        <FiUser className="mr-2" />
                                                        <span>{getDeliveryDetails(order).name}</span>
                                                    </div>
                                                    <div className="flex items-center text-gray-600">
                                                        <FiMapPin className="mr-2" />
                                                        <span>{getDeliveryDetails(order).address}</span>
                                                    </div>
                                                    <div className="flex items-center text-gray-600">
                                                        <FiCreditCard className="mr-2" />
                                                        <span>Payment: {getPaymentMethod(order)}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="border-t pt-4">
                                                <h4 className="font-semibold mb-2">Order Items</h4>
                                                <div className="space-y-2">
                                                    {order.items?.map((item, index) => (
                                                        <div key={index} className="flex justify-between text-gray-600">
                                                            <span>{item.name} x {item.quantity || 1}</span>
                                                            <span>₹{(item.price * (item.quantity || 1)).toFixed(2)}</span>
                                                        </div>
                                                    ))}
                                                    <div className="flex justify-between font-semibold border-t pt-2">
                                                        <span>Total</span>
                                                        <span>₹{order.total?.toFixed(2)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                ))
                            )}
                        </div>
                    </TabsContent>

                    <TabsContent value="history">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {orders.length === 0 ? (
                                <div className="col-span-2 text-center py-8">
                                    <p className="text-gray-600">No order history found</p>
                                </div>
                            ) : (
                                orders.filter(order => order.status === 'delivered' || order.status === 'cancelled').map((order) => (
                                    <Card key={order._id || order.id} className="p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-lg font-semibold">Order #{order._id || order.id}</h3>
                                                <p className="text-gray-600">{new Date(order.createdAt).toLocaleString()}</p>
                                            </div>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => generateReceipt(order)}
                                                disabled={downloadingReceipt}
                                            >
                                                <FiDownload className="mr-2" />
                                                {downloadingReceipt ? 'Downloading...' : 'Receipt'}
                                            </Button>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-center text-gray-600">
                                                <FiClock className="mr-2" />
                                                <span>{getOrderStatus(order)}</span>
                                            </div>

                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <h4 className="font-semibold mb-2">Delivery Details</h4>
                                                <div className="space-y-2">
                                                    <div className="flex items-center text-gray-600">
                                                        <FiUser className="mr-2" />
                                                        <span>{getDeliveryDetails(order).name}</span>
                                                    </div>
                                                    <div className="flex items-center text-gray-600">
                                                        <FiMapPin className="mr-2" />
                                                        <span>{getDeliveryDetails(order).address}</span>
                                                    </div>
                                                    <div className="flex items-center text-gray-600">
                                                        <FiCreditCard className="mr-2" />
                                                        <span>Payment: {getPaymentMethod(order)}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="border-t pt-4">
                                                <h4 className="font-semibold mb-2">Order Items</h4>
                                                <div className="space-y-2">
                                                    {order.items?.map((item, index) => (
                                                        <div key={`${order._id}-item-${index}`} className="flex justify-between text-gray-600">
                                                            <span>{item.name} x {item.quantity || 1}</span>
                                                            <span>₹{(item.price * (item.quantity || 1)).toFixed(2)}</span>
                                                        </div>
                                                    ))}
                                                    <div className="flex justify-between font-semibold border-t pt-2">
                                                        <span>Total</span>
                                                        <span>₹{order.total?.toFixed(2)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                ))
                            )}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}

export default OrdersPage; 