import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  items: [{
    name: {
      type: String,
      required: [true, 'Item name is required']
    },
    price: {
      type: Number,
      required: [true, 'Item price is required'],
      min: [0, 'Price cannot be negative']
    },
    quantity: {
      type: Number,
      default: 1,
      min: [1, 'Quantity must be at least 1']
    }
  }],
  total: {
    type: Number,
    required: [true, 'Total amount is required'],
    min: [0, 'Total cannot be negative']
  },
  status: {
    type: String,
    enum: ['pending', 'preparing', 'ready', 'delivered', 'cancelled'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  deliveryAddress: {
    type: String,
    required: [true, 'Delivery address is required']
  },
  restaurantLocation: {
    lat: {
      type: Number,
      required: [true, 'Restaurant latitude is required']
    },
    lng: {
      type: Number,
      required: [true, 'Restaurant longitude is required']
    }
  },
  payment: {
    method: {
      type: String,
      enum: ['cash', 'upi', 'card'],
      default: 'cash'
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending'
    },
    transactionId: String,
    upiId: String,
    cardDetails: {
      last4: String,
      brand: String
    }
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields automatically
});

// Add pre-save middleware to calculate total if not provided
orderSchema.pre('save', function(next) {
  if (!this.total && this.items && this.items.length > 0) {
    this.total = this.items.reduce((sum, item) => {
      return sum + (item.price * (item.quantity || 1));
    }, 0);
  }
  next();
});

// Add validation for items array
orderSchema.path('items').validate(function(items) {
  return items && items.length > 0;
}, 'Order must have at least one item');

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order; 