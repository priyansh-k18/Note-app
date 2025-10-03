import mongoose from 'mongoose';

export const connectionToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Database connected successfully');
  } catch (e) {
    console.log('Failed database connection attempt', e);
    process.exit(1);
  }
};
