"use client"
import RestaurantHeader from '../../_component/RestaurantHeader'
import React, { useEffect, useState, useRef } from 'react'
import AddFoodItem from '../../_component/AddFoodItem';
import { FoodItem } from '../../_component/FoodItem';
import { useRouter } from 'next/navigation';
import { FiClock, FiCheck, FiX, FiNavigation, FiHome, FiShoppingBag, FiList, FiPlus, FiLogOut } from 'react-icons/fi';
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { toast } from "sonner";

const sidebarLinks = [
  { label: 'Dashboard', icon: <FiHome />, value: 'dashboard' },
  { label: 'Orders', icon: <FiList />, value: 'orders' },
  { label: 'Add Food', icon: <FiPlus />, value: 'addfood' },
];

const MIN_WIDTH = 180;
const MAX_WIDTH = 400;
const DEFAULT_WIDTH = 256;

const RestaurantDashboard = () => {
  const [render, setRender] = useState(false);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeOrderTab, setActiveOrderTab] = useState('pending');
  const [sidebarWidth, setSidebarWidth] = useState(DEFAULT_WIDTH);
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (activeTab === 'orders') fetchOrders();
    // Set up real-time updates
    const interval = setInterval(() => {
      if (activeTab === 'orders') fetchOrders();
    }, 30000); // Poll every 30 seconds
    return () => clearInterval(interval);
  }, [activeTab]);

  // Handle sidebar resizing
  useEffect(() => {
    if (!isResizing) return;
    const handleMouseMove = (e) => {
      // Only allow resizing on desktop
      if (window.innerWidth < 768) return;
      const newWidth = Math.min(Math.max(e.clientX, MIN_WIDTH), MAX_WIDTH);
      setSidebarWidth(newWidth);
    };
    const handleMouseUp = () => setIsResizing(false);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  const handleSidebar = (value) => {
    setActiveTab(value);
    if (value === 'orders') fetchOrders();
  };

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/restaurant/orders');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch orders');
      }
      if (!data.orders || !Array.isArray(data.orders)) {
        setOrders([]);
        return;
      }
      setOrders(data.orders);
    } catch (error) {
      toast.error(error.message || 'Failed to fetch orders');
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`/api/restaurant/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to update order status');
      }
      setOrders(prevOrders => prevOrders.map(order => order._id === orderId ? { ...order, status: newStatus } : order));
      toast.success(`Order ${newStatus} successfully`);
    } catch (error) {
      toast.error(error.message || 'Failed to update order status');
    }
  };

  const handleStatusUpdate = async (e, orderId, newStatus) => {
    e.preventDefault();
    e.stopPropagation();
    await updateOrderStatus(orderId, newStatus);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex">
      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className="hidden md:flex flex-col bg-white border-r shadow-lg min-h-screen py-8 px-4 relative select-none"
        style={{ width: sidebarWidth, minWidth: MIN_WIDTH, maxWidth: MAX_WIDTH, transition: isResizing ? 'none' : 'width 0.2s' }}
      >
        <div className="flex items-center gap-2 mb-10">
          <FiShoppingBag className="text-orange-500 text-2xl" />
          <span className="text-xl font-bold text-orange-500">FoodieExpress</span>
        </div>
        <nav className="flex flex-col gap-2">
          {sidebarLinks.map(link => (
            <button
              key={link.value}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors font-medium text-gray-700 hover:bg-orange-100 ${activeTab === link.value ? 'bg-orange-100 text-orange-600' : ''}`}
              onClick={() => handleSidebar(link.value)}
            >
              {link.icon}
              {link.label}
            </button>
          ))}
        </nav>
        <div className="mt-auto pt-10">
          <Button
            variant="outline"
            className="w-full flex items-center gap-2"
            onClick={() => {
              localStorage.removeItem("RestaurantUser");
              localStorage.removeItem("User");
              router.replace("/restaurant");
            }}
          >
            <FiLogOut /> Logout
          </Button>
        </div>
        {/* Resizer handle */}
        <div
          className="absolute top-0 right-0 h-full w-2 cursor-col-resize z-30"
          onMouseDown={() => setIsResizing(true)}
          style={{ userSelect: 'none' }}
        >
          <div className="w-1 h-full bg-orange-200 hover:bg-orange-400 transition-colors rounded-r" />
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <div className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b shadow-sm">
          <RestaurantHeader />
        </div>
        <main className="flex-1 p-4 md:p-8 bg-gradient-to-br from-orange-50 to-white">
          {/* Dashboard Section */}
          {activeTab === 'dashboard' && (
            <section className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-orange-600">Welcome to your Restaurant Dashboard</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6 flex flex-col items-center justify-center shadow-md border-0 bg-white/90">
                  <h3 className="text-lg font-semibold mb-2">Add New Food Item</h3>
                  <Button onClick={() => setActiveTab('addfood')} className="bg-orange-500 hover:bg-orange-600 text-white">Add Food</Button>
                </Card>
                <Card className="p-6 flex flex-col items-center justify-center shadow-md border-0 bg-white/90">
                  <h3 className="text-lg font-semibold mb-2">View Orders</h3>
                  <Button onClick={() => setActiveTab('orders')} className="bg-orange-500 hover:bg-orange-600 text-white">View Orders</Button>
                </Card>
              </div>
            </section>
          )}

          {/* Add Food Section */}
          {activeTab === 'addfood' && (
            <section className="max-w-3xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-orange-600">Add Food Item</h2>
                <Button variant="ghost" onClick={() => setActiveTab('dashboard')}>Back to Dashboard</Button>
              </div>
              <AddFoodItem setRender={setRender} render={render} />
            </section>
          )}

          {/* Food Items Section */}
          {activeTab === 'dashboard' && (
            <section className="max-w-3xl mx-auto mt-10">
              <h2 className="text-xl font-semibold mb-4 text-orange-600">Your Food Items</h2>
              <FoodItem setRender={setRender} render={render} />
            </section>
          )}

          {/* Orders Section */}
          {activeTab === 'orders' && (
            <section className="max-w-5xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-orange-600">Orders</h2>
                <Tabs value={activeOrderTab} onValueChange={setActiveOrderTab} className="w-full max-w-2xl">
                  <TabsList className="flex gap-2 bg-orange-100 rounded-lg p-1">
                    <TabsTrigger value="pending" className="rounded-lg px-4 py-2 text-sm font-medium">Pending</TabsTrigger>
                    <TabsTrigger value="preparing" className="rounded-lg px-4 py-2 text-sm font-medium">Preparing</TabsTrigger>
                    <TabsTrigger value="ready" className="rounded-lg px-4 py-2 text-sm font-medium">Ready</TabsTrigger>
                    <TabsTrigger value="completed" className="rounded-lg px-4 py-2 text-sm font-medium">Completed</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <div className="space-y-8">
                {/* Pending Orders */}
                {activeOrderTab === 'pending' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {isLoading ? (
                      <div className="col-span-2 flex justify-center items-center min-h-[200px]">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                      </div>
                    ) : orders.filter(order => order.status === 'pending').length === 0 ? (
                      <div className="col-span-2 text-center text-gray-500">No pending orders</div>
                    ) : (
                      orders.filter(order => order.status === 'pending').map((order) => (
                        <Card key={order._id} className="p-6 shadow-md border-0 bg-white/90">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-lg font-semibold">Order #{order._id}</h3>
                              <p className="text-gray-600">{new Date(order.createdAt).toLocaleString()}</p>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={(e) => handleStatusUpdate(e, order._id, 'preparing')}
                                className="text-green-600"
                              >
                                <FiCheck className="mr-2" /> Accept
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={(e) => handleStatusUpdate(e, order._id, 'cancelled')}
                                className="text-red-600"
                              >
                                <FiX className="mr-2" /> Reject
                              </Button>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <h4 className="font-semibold mb-2">Order Details</h4>
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
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <h4 className="font-semibold mb-2">Delivery Details</h4>
                              <p className="text-gray-600">{order.deliveryAddress}</p>
                            </div>
                          </div>
                        </Card>
                      ))
                    )}
                  </div>
                )}
                {/* Preparing Orders */}
                {activeOrderTab === 'preparing' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {isLoading ? (
                      <div className="col-span-2 flex justify-center items-center min-h-[200px]">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                      </div>
                    ) : orders.filter(order => order.status === 'preparing').length === 0 ? (
                      <div className="col-span-2 text-center text-gray-500">No preparing orders</div>
                    ) : (
                      orders.filter(order => order.status === 'preparing').map((order) => (
                        <Card key={order._id} className="p-6 shadow-md border-0 bg-white/90">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-lg font-semibold">Order #{order._id}</h3>
                              <p className="text-gray-600">{new Date(order.createdAt).toLocaleString()}</p>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={(e) => handleStatusUpdate(e, order._id, 'ready')}
                              className="text-green-600"
                            >
                              <FiCheck className="mr-2" /> Mark Ready
                            </Button>
                          </div>
                          <div className="space-y-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <h4 className="font-semibold mb-2">Order Details</h4>
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
                )}
                {/* Ready Orders */}
                {activeOrderTab === 'ready' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {isLoading ? (
                      <div className="col-span-2 flex justify-center items-center min-h-[200px]">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                      </div>
                    ) : orders.filter(order => order.status === 'ready').length === 0 ? (
                      <div className="col-span-2 text-center text-gray-500">No ready orders</div>
                    ) : (
                      orders.filter(order => order.status === 'ready').map((order) => (
                        <Card key={order._id} className="p-6 shadow-md border-0 bg-white/90">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-lg font-semibold">Order #{order._id}</h3>
                              <p className="text-gray-600">{new Date(order.createdAt).toLocaleString()}</p>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={(e) => handleStatusUpdate(e, order._id, 'delivered')}
                              className="text-green-600"
                            >
                              <FiCheck className="mr-2" /> Mark Delivered
                            </Button>
                          </div>
                          <div className="space-y-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <h4 className="font-semibold mb-2">Order Details</h4>
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
                )}
                {/* Completed Orders */}
                {activeOrderTab === 'completed' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {isLoading ? (
                      <div className="col-span-2 flex justify-center items-center min-h-[200px]">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                      </div>
                    ) : orders.filter(order => order.status === 'delivered').length === 0 ? (
                      <div className="col-span-2 text-center text-gray-500">No completed orders</div>
                    ) : (
                      orders.filter(order => order.status === 'delivered').map((order) => (
                        <Card key={order._id} className="p-6 shadow-md border-0 bg-white/90">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-lg font-semibold">Order #{order._id}</h3>
                              <p className="text-gray-600">{new Date(order.createdAt).toLocaleString()}</p>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <h4 className="font-semibold mb-2">Order Details</h4>
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
                )}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

export default RestaurantDashboard;