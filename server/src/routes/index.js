import { Router } from 'express';
import { config } from '../../config/index.js';
import appResponse from '../utils/appResponse.js';

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
        apiDocs: 'See API_DOCS.md for detailed documentation',
      },
      endpoints: {
        experiences: {
          listAll: {
            method: 'GET',
            url: `${baseUrl}/api/${apiVersion}/experiences`,
            description: 'Get all experiences with optional search',
            query: {
              search: 'optional - search by name, location, or description',
            },
          },
          getById: {
            method: 'GET',
            url: `${baseUrl}/api/${apiVersion}/experiences/:id`,
            description: 'Get specific experience details with available slots',
            params: { id: 'experience ID' },
          },
        },
        bookings: {
          create: {
            method: 'POST',
            url: `${baseUrl}/api/${apiVersion}/bookings`,
            description: 'Create new booking and initiate payment',
            body: {
              name: 'string (required)',
              email: 'string (required)',
              slotId: 'string (required)',
              quantity: 'number (required)',
              promocode: 'string (optional)',
            },
          },
          verifyPayment: {
            method: 'POST',
            url: `${baseUrl}/api/${apiVersion}/bookings/verifypayment`,
            description: 'Verify Razorpay payment and confirm booking',
            body: {
              bookingId: 'string (required)',
              razorpay_order_id: 'string (required)',
              razorpay_payment_id: 'string (required)',
              razorpay_signature: 'string (required)',
            },
          },
          getDetails: {
            method: 'GET',
            url: `${baseUrl}/api/${apiVersion}/bookings/details`,
            description: 'Get booking details by email or booking ID',
            query: {
              email: 'string (optional)',
              bookingId: 'string (optional)',
              note: 'Provide either email or bookingId',
            },
          },
        },
        promo: {
          validate: {
            method: 'POST',
            url: `${baseUrl}/api/${apiVersion}/promo/validate`,
            description: 'Validate promo code and get discount details',
            body: { promocode: 'string (required)' },
          },
        },
      },
      links: {
        frontend: 'https://bookit.iamabhinav.dev',
        portfolio: 'https://iamabhinav.dev',
        blog: 'https://blog.iamabhinav.dev',
        github: 'https://github.com/rishiyaduwanshi/bookit',
      },
      developer: {
        name: 'Abhinav Prakash',
        portfolio: 'https://iamabhinav.dev',
      },
    },
  });
});

// Health check route
router.get('/health', (_, res) => {
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
