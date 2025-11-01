import { Router } from 'express';
import appResponse from '../utils/appResponse.js';
import { config } from '../../config/index.js';

const router = Router();

router.get('/', (req, res) => {
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  const apiVersion = `v${config.VERSION.split('.')[0]}`;

  appResponse(res, {
    message: 'Welcome to BookIt API 🎫',
    data: {
      name: 'BookIt API',
      version: config.VERSION,
      description: 'Experience Booking Platform API',
      status: 'Running',
      environment: config.NODE_ENV,
      documentation: {
        health: `${baseUrl}/health`,
        apiBase: `${baseUrl}/api/${apiVersion}`,
      },
      endpoints: {
        experiences: {
          getAll: `GET ${baseUrl}/api/${apiVersion}/experiences`,
          search: `GET ${baseUrl}/api/${apiVersion}/experiences?search=query`,
          getById: `GET ${baseUrl}/api/${apiVersion}/experiences/:id`,
        },
        bookings: {
          create: `POST ${baseUrl}/api/${apiVersion}/bookings`,
          description: 'Create new booking with name, email, slotId, quantity, and optional promocode',
        },
        promo: {
          validate: `POST ${baseUrl}/api/${apiVersion}/promo/validate`,
          description: 'Validate promo code and get discount details',
        },
      },
      links: {
        frontend: 'https://bookit.iamabhinav.dev',
        portfolio: 'https://iamabhinav.dev',
        blog: 'https://blog.iamabhinav.dev',
        github: 'https://github.com/rishiyaduwanshi/bookit',
      },
      developer: {
        name: 'Abhinav Yaduwanshi',
        portfolio: 'https://iamabhinav.dev',
      },
    },
  });
});

// Health check route
router.get('/health', (req, res) => {
  appResponse(res, {
    message: 'Server is healthy',
    data: {
      status: 'UP',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      environment: config.NODE_ENV,
    },
  });
});

export default router;
