import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from "./routes/adminRoutes.js";
import advancedRoutes from "./routes/advancedRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', authRoutes); // Thêm route cho /api/users/:id
app.use("/api/admin", adminRoutes);
app.use("/api", advancedRoutes);

const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});