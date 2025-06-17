import mongoose from 'mongoose';

// MongoDB Atlas connection string
const MONGODB_URI = 'mongodb+srv://omyerane2004:Newuser2004@cluster0.5crd5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Configure mongoose options
mongoose.set('strictQuery', false);

const options = {
    serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
};

async function connectDB() {
    try {
        // If already connected, return the connection
        if (mongoose.connection.readyState === 1) {
            console.log('Using existing database connection');
            return mongoose.connection;
        }

        // If connecting, wait for it to complete
        if (mongoose.connection.readyState === 2) {
            console.log('Connection in progress, waiting...');
            await new Promise(resolve => setTimeout(resolve, 1000));
            return connectDB();
        }

        console.log('Connecting to MongoDB Atlas...');
        const connection = await mongoose.connect(MONGODB_URI, options);
        console.log('Successfully connected to MongoDB Atlas');
        return connection;
    } catch (error) {
        console.error('MongoDB connection error:', error);
        // If connection fails, try to close any existing connection
        try {
            await mongoose.connection.close();
        } catch (closeError) {
            console.error('Error closing connection:', closeError);
        }
        throw new Error('Failed to connect to database: ' + error.message);
    }
}

// Handle connection events
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

mongoose.connection.on('reconnected', () => {
    console.log('MongoDB reconnected');
});

export default connectDB; 