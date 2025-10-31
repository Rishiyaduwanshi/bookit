import express from 'express';
import cors from 'cors'
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser'
import { config } from '../config/index.js';
import { AppError } from './utils/appError.js';
import httpLogger from './utils/appLogger.js';
import globalErrorHandler from './middlewares/globalError.mid.js';
import { corsOptions } from '../config/cors.js';


const app = express();

app.use(cors(corsOptions));

app.use(cookieParser())
app.use(httpLogger);
app.use(rateLimit(config.GLOBAL_RATE_LIMIT_CONFIG));
app.use(rateLimit(config.PER_IP_RATE_LIMIT_CONFIG));
app.use(express.json());

// Routes
import indexRoutes from './routes/index.js';
import authRoutes from './routes/auth.routes.js';
import experiencesRoutes from './routes/experience.routes.js'
import promoRoutes from './routes/promo.routes.js'


// API routes
const api = express.Router();
app.use(`/api/v${config.VERSION.split(".")[0]}`, api);

app.use('/', indexRoutes);
api.use('/auth', authRoutes);
api.use('/auth', authRoutes);
api.use('/experiences', experiencesRoutes);
api.use('/promo', promoRoutes);


// 404 handler for undefined routes
app.use((_, __, next) => {
  next(new AppError({ statusCode: 404, message: 'Route not found' }));
});

app.use(globalErrorHandler);
export default app;
