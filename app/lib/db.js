import mongoose from 'mongoose';

const {NEXT_PUBLIC_USERNAME, NEXT_PUBLIC_PASSWORD} = process.env;

if (!NEXT_PUBLIC_USERNAME || !NEXT_PUBLIC_PASSWORD) {
    throw new Error('Please define the NEXT_PUBLIC_USERNAME and NEXT_PUBLIC_PASSWORD environment variables');
}

export const connectionStr = `mongodb+srv://${NEXT_PUBLIC_USERNAME}:${NEXT_PUBLIC_PASSWORD}@cluster0.5crd5.mongodb.net/restoDB?retryWrites=true&w=majority&appName=Cluster0`;

let isConnected = false;

const connectDB = async () => {
    if (isConnected) {
        console.log('Using existing database connection');
        return true;
    }

    try {
        console.log('Attempting to connect to MongoDB...');
        const conn = await mongoose.connect(connectionStr, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        isConnected = true;
        console.log('MongoDB connected successfully');
        return true;
    } catch (error) {
        console.error('MongoDB connection error:', error);
        isConnected = false;
        throw new Error(`Failed to connect to database: ${error.message}`);
    }
};

export default connectDB;