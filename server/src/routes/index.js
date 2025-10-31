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
        authentication: {
          register: `POST ${baseUrl}/api/${apiVersion}/auth/register`,
          login: `POST ${baseUrl}/api/${apiVersion}/auth/login`,
          me: `GET ${baseUrl}/api/${apiVersion}/auth/me`,
          logout: `POST ${baseUrl}/api/${apiVersion}/auth/logout`,
        },
        experiences: {
          getAll: `GET ${baseUrl}/api/${apiVersion}/experiences`,
          getById: `GET ${baseUrl}/api/${apiVersion}/experiences/:id`,
        },
        promo: {
          validate: `POST ${baseUrl}/api/${apiVersion}/promo/validate`,
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
