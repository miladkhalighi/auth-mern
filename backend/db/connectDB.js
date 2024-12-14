import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL)
        console.log(`mongoose connected to: ${connect.connection.host}`);
        
    } catch (error) {
       console.log('failed to connect to mongoose db', error.message);
       process.exit(1) 
    }
}