'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiMinus, FiPlus, FiTrash2, FiClock, FiArrowLeft, FiShoppingBag } from 'react-icons/fi';
import { useToast } from "../../../hooks/use-toast";
import { Toaster } from "../../../components/ui/toaster";
import { Button } from "../../../components/ui/button";

function CartPage() {
    const [cartItems, setCartItems] = useState([]);
    const router = useRouter();
    const { toast } = useToast();

    useEffect(() => {
        // Load cart items from localStorage when component mounts
        const savedCartItems = localStorage.getItem('cartItems');
        if (savedCartItems) {
            setCartItems(JSON.parse(savedCartItems));
        }
    }, []);

    const updateQuantity = (index, change) => {
        const updatedCart = [...cartItems];
        const newQuantity = (updatedCart[index].quantity || 1) + change;
        
        if (newQuantity < 1) {
            removeFromCart(index);
            return;
        }

        updatedCart[index] = {
            ...updatedCart[index],
            quantity: newQuantity
        };
        
        setCartItems(updatedCart);
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    };

    const removeFromCart = (indexToRemove) => {
        const updatedCart = cartItems.filter((_, index) => index !== indexToRemove);
        setCartItems(updatedCart);
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    };

    const handleOrder = async () => {
        if (cartItems.length === 0) {
            toast({
                title: "Cart is empty",
                description: "Please add items to your cart before placing an order.",
                variant: "destructive",
            });
            return;
        }

        const userData = localStorage.getItem("User");
        if (!userData) {
            toast({
                title: "Please login",
                description: "You need to be logged in to place an order.",
                variant: "destructive",
            });
            router.push('/login');
            return;
        }

        const user = JSON.parse(userData);

        try {
            const response = await fetch("http://localhost:3000/api/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    items: cartItems,
                    deliveryAddress: "Your Delivery Address", // Replace with actual address handling
                    userId: user._id
                }),
            });

            const result = await response.json();
            
            if (result.success) {
                toast({
                    title: "Order placed successfully!",
                    description: "You can track your order in the orders section.",
                });
                
                localStorage.removeItem("cartItems"); // Clear cart after order
                setCartItems([]); // Clear state
                router.push('/user/orders'); // Redirect to orders page
            } else {
                toast({
                    title: "Failed to place order",
                    description: "Please try again later.",
                    variant: "destructive",
                });
            }
        } catch (error) {
            console.error('Error placing order:', error);
            toast({
                title: "Error",
                description: "Something went wrong. Please try again.",
                variant: "destructive",
            });
        }
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            const quantity = item.quantity || 1;
            return total + (item.price * quantity);
        }, 0);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button 
                                onClick={() => router.push('/user/dashboard')}
                                className="text-gray-600 hover:text-gray-900"
                            >
                                <FiArrowLeft size={24} />
                            </button>
                            <h1 className="text-xl font-bold">Your Cart</h1>
                        </div>
                        <Button
                            variant="ghost"
                            onClick={() => router.push('/user/orders')}
                            className="flex items-center gap-2"
                        >
                            <FiShoppingBag className="mr-2" />
                            View Orders
                        </Button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-6">
                {cartItems.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="mb-6">
                            <img 
                                src="/Empty-cart.png" 
                                alt="Empty Cart" 
                                className="w-[275] h-[270px] mx-auto"
                            />
                        </div>
                        <p className="text-black font-semibold text-xl">Your cart is empty</p>
                        <p className="text-gray-600 mb-4">You can go to dashboard to add food items</p>
                        <button 
                            onClick={() => router.push('/user/dashboard')}
                            className="bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600 transition-colors"
                        >
                            Start Ordering
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Cart Items */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-lg shadow-sm p-4">
                                {cartItems.map((item, index) => (
                                    <div key={index} className="flex items-center gap-4 py-4 border-b last:border-b-0">
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-800">{item.name}</h3>
                                            <p className="text-gray-600 text-sm">₹{item.price}</p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <button
                                                    onClick={() => updateQuantity(index, -1)}
                                                    className="p-1 rounded-full hover:bg-gray-100"
                                                >
                                                    <FiMinus size={16} />
                                                </button>
                                                <span className="w-8 text-center">{item.quantity || 1}</span>
                                                <button
                                                    onClick={() => updateQuantity(index, 1)}
                                                    className="p-1 rounded-full hover:bg-gray-100"
                                                >
                                                    <FiPlus size={16} />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <p className="font-semibold">
                                                ₹{(item.price * (item.quantity || 1)).toFixed(2)}
                                            </p>
                                            <button
                                                onClick={() => removeFromCart(index)}
                                                className="text-red-500 hover:text-red-700 p-2"
                                            >
                                                <FiTrash2 size={20} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-24">
                                <h2 className="text-lg font-bold mb-4">Order Summary</h2>
                                
                                <div className="space-y-3 mb-4">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Item Total</span>
                                        <span>₹{calculateTotal().toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Delivery Fee</span>
                                        <span>₹40.00</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Platform Fee</span>
                                        <span>₹5.00</span>
                                    </div>
                                    <div className="border-t pt-3 flex justify-between font-bold">
                                        <span>To Pay</span>
                                        <span>₹{(calculateTotal() + 45).toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 text-gray-600 mb-4">
                                    <FiClock size={18} />
                                    <span>Delivery in 30-35 mins</span>
                                </div>

                                <button
                                    onClick={handleOrder}
                                    className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors font-semibold"
                                >
                                    Place Order
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Toaster />
        </div>
    );
}

export default CartPage;


