import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import routes from './routes';
import { errorHandler } from './middleware/errorHandler.middleware';
import { logger } from './middleware/logger.middleware';

const app: Application = express();

// Security
app.use(helmet());
app.use(cors());

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging
app.use(logger);

// Routes
app.use('/api/v1', routes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Error handling
app.use(errorHandler);

export default app;
