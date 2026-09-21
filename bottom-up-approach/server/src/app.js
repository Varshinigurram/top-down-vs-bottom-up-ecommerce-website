import express from 'express';
import cors from 'cors';
import healthRoutes from './routes/health.routes.js';
import productRoutes from './routes/product.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

// Composed API routes
app.use('/api', healthRoutes);
app.use('/api', productRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    error: err.message || 'Internal Server Error'
  });
});

export default app;
