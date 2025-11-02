import logger from '../src/utils/errorLogger.js';
import { config } from './index.js';

const isProduction = config.NODE_ENV === 'production';

export const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    if (config.ALLOWED_ORIGINS.includes(origin)) return callback(null, true);

    if (!isProduction) {
      console.warn('Blocked CORS request from:', origin);
    } else {
      logger.warn(`Blocked CORS request from: ${origin}`);
    }

    return callback(null, false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
