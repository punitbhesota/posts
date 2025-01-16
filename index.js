import express from 'express';
import cors from 'cors'

import postRouter from './routes/posts.js'
import { config } from './config/config.js';
import { connectDB } from './config/db.js';

const app = express();
const port = config.port || 4500;

// Middleware
app.use(cors());
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: true, limit: '30mb' }));

// Connect DB
await connectDB();

// Routes
app.use('/posts', postRouter);

// Health route
app.get('/', (req, res) => {
    res.send('Posts service is up and running !');
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});