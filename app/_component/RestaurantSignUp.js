'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const RestaurantSignUp = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    restaurantName: '',
    ownerName: '',
    email: '',
    phone: '',
    address: '',
    cuisine: '',
    password: '',
    confirmPassword: '',
    city: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.restaurantName.trim()) newErrors.restaurantName = 'Restaurant name is required.';
    if (!formData.ownerName.trim()) newErrors.ownerName = 'Owner name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format.';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits.';
    }
    if (!formData.address.trim()) newErrors.address = 'Address is required.';
    if (!formData.city.trim()) newErrors.city = 'City is required.';
    if (!formData.cuisine.trim()) newErrors.cuisine = 'Cuisine type is required.';
    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password.';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const mappedData = {
        name: formData.restaurantName,
        email: formData.email,
        password: formData.password,
        Address: formData.address,
        city: formData.city,
        mobile: formData.phone,
      };
      const response = await fetch('/api/restaurant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(mappedData)
      });
      const result = await response.json();
      if (response.ok && result.success) {
        alert('Form submitted successfully!');
        router.push("/restaurant/dashboard")
      } else {
        alert('Error: ' + (result.error || result.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert('Submission failed!');
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="bg-white py-8 px-8 shadow rounded-lg">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Restaurant Sign Up</h2>
            <p className="text-gray-500 mt-1 text-sm">Register your restaurant to start serving customers.</p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="restaurantName" className="block text-sm font-medium text-gray-700">Restaurant Name<span className="text-red-500">*</span></label>
                <input
                  id="restaurantName"
                  name="restaurantName"
                  type="text"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={formData.restaurantName}
                  onChange={handleChange}
                />
                {errors.restaurantName && <p className="text-red-500 text-xs mt-1">{errors.restaurantName}</p>}
              </div>
              <div>
                <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700">Owner Name<span className="text-red-500">*</span></label>
                <input
                  id="ownerName"
                  name="ownerName"
                  type="text"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={formData.ownerName}
                  onChange={handleChange}
                />
                {errors.ownerName && <p className="text-red-500 text-xs mt-1">{errors.ownerName}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email<span className="text-red-500">*</span></label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone<span className="text-red-500">*</span></label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
              <div className="md:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address<span className="text-red-500">*</span></label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={formData.address}
                  onChange={handleChange}
                />
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
              </div>
              <div className="md:col-span-2">
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">City<span className="text-red-500">*</span></label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={formData.city}
                  onChange={handleChange}
                />
                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
              </div>
              <div>
                <label htmlFor="cuisine" className="block text-sm font-medium text-gray-700">Cuisine Type<span className="text-red-500">*</span></label>
                <input
                  id="cuisine"
                  name="cuisine"
                  type="text"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={formData.cuisine}
                  onChange={handleChange}
                />
                {errors.cuisine && <p className="text-red-500 text-xs mt-1">{errors.cuisine}</p>}
              </div>
            </div>
            <div className="flex justify-end mt-8">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={handleSubmit}
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RestaurantSignUp; 