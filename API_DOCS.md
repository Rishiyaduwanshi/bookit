# BookIt API Documentation 🎫

Complete API documentation for the BookIt Experience Booking Platform.

**Base URL**: `https://api.bookit.iamabhinav.dev/api/v1`  
**Local Development**: `http://localhost:5000/api/v1`

---

## 📚 Table of Contents

- [Authentication](#authentication)
- [Rate Limiting](#rate-limiting)
- [Response Format](#response-format)
- [Error Handling](#error-handling)
- [Endpoints](#endpoints)
  - [Experiences](#experiences)
  - [Bookings](#bookings)
  - [Promo Codes](#promo-codes)
  - [Health Check](#health-check)

---

## 🔐 Authentication

Currently, the API does not require authentication for public endpoints. Future versions may include API keys or OAuth.

---

## ⚡ Rate Limiting

- **Global Rate Limit**: 100 requests per 15 minutes
- **Per IP Rate Limit**: 50 requests per 15 minutes

When rate limit is exceeded, you'll receive a `429 Too Many Requests` response.

---

## 📦 Response Format

All API responses follow this structure:

```json
{
  "success": true,
  "message": "Success message",
  "data": {
    // Response data
  }
}
```

---

## ❌ Error Handling

Error responses include:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Error type",
  "statusCode": 400
}
```

### Common Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `410` - Gone (expired promo code)
- `429` - Too Many Requests
- `500` - Internal Server Error

---

## 🎯 Endpoints

### Experiences

#### 1. Get All Experiences

Retrieve a list of all available experiences with optional search.

**Endpoint**: `GET /experiences`

**Query Parameters**:
- `search` (optional) - Search by name, location, or description

**Example Request**:
```bash
GET /api/v1/experiences
GET /api/v1/experiences?search=adventure
```

**Example Response**:
```json
{
  "success": true,
  "message": "Experiences retrieved successfully",
  "data": [
    {
      "_id": "673e5f4c9...",
      "name": "Paragliding Adventure",
      "location": "Bir Billing",
      "description": "Experience the thrill of flying",
      "about": "Detailed description...",
      "imgSrc": "https://example.com/image.jpg",
      "price": 3500,
      "tax": 350,
      "createdAt": "2024-11-20T10:00:00.000Z",
      "updatedAt": "2024-11-20T10:00:00.000Z"
    }
  ]
}
```

---

#### 2. Get Experience by ID

Get detailed information about a specific experience including available slots.

**Endpoint**: `GET /experiences/:id`

**URL Parameters**:
- `id` (required) - Experience ID

**Example Request**:
```bash
GET /api/v1/experiences/673e5f4c9...
```

**Example Response**:
```json
{
  "success": true,
  "message": "Experience details retrieved successfully",
  "data": {
    "_id": "673e5f4c9...",
    "name": "Paragliding Adventure",
    "location": "Bir Billing",
    "description": "Experience the thrill of flying",
    "about": "Detailed description...",
    "imgSrc": "https://example.com/image.jpg",
    "price": 3500,
    "tax": 350,
    "slots": [
      {
        "_id": "673e5f7d8...",
        "date": "2024-11-25",
        "time": "09:00 AM - 11:00 AM",
        "price": 3500,
        "totalSeats": 10,
        "bookedSeats": 3,
        "availableSeats": 7
      }
    ]
  }
}
```

---

### Bookings

#### 1. Create Booking

Create a new booking and initiate Razorpay payment order.

**Endpoint**: `POST /bookings`

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "slotId": "673e5f7d8...",
  "quantity": 2,
  "promocode": "SAVE20"  // optional
}
```

**Validation Rules**:
- `name` - Required, string
- `email` - Required, valid email format
- `slotId` - Required, valid slot ID
- `quantity` - Required, number >= 1
- `promocode` - Optional, string

**Example Response**:
```json
{
  "success": true,
  "message": "Booking initiated, proceed to payment",
  "data": {
    "bookingId": "673e6012a...",
    "razorId": "order_NXb7...",
    "receipt": "booking_673e6012a...",
    "razorKey": "rzp_test_...",
    "amount": 7700,
    "appliedPromo": {
      "code": "SAVE20",
      "discountPercentage": 20
    }
  }
}
```

---

#### 2. Verify Payment

Verify Razorpay payment signature and confirm booking.

**Endpoint**: `POST /bookings/verifypayment`

**Request Body**:
```json
{
  "bookingId": "673e6012a...",
  "razorpay_order_id": "order_NXb7...",
  "razorpay_payment_id": "pay_NXb7...",
  "razorpay_signature": "a1b2c3d4..."
}
```

**Example Response**:
```json
{
  "success": true,
  "message": "Payment verified successfully",
  "data": {
    "bookingId": "673e6012a...",
    "status": "confirmed",
    "paymentId": "pay_NXb7..."
  }
}
```

**Error Response** (Invalid Signature):
```json
{
  "success": false,
  "message": "Payment verification failed",
  "error": "Invalid signature",
  "statusCode": 400
}
```

---

#### 3. Get Booking Details

Retrieve booking details by email or booking ID. Returns all bookings for an email or specific booking by ID.

**Endpoint**: `GET /bookings/details`

**Query Parameters** (provide one):
- `email` - User's email address
- `bookingId` - Specific booking ID

**Example Requests**:
```bash
GET /api/v1/bookings/details?email=john@example.com
GET /api/v1/bookings/details?bookingId=673e6012a...
```

**Example Response**:
```json
{
  "success": true,
  "message": "Booking details retrieved successfully",
  "data": [
    {
      "_id": "673e6012a...",
      "name": "John Doe",
      "email": "john@example.com",
      "quantity": 2,
      "status": "confirmed",
      "razorPaymentId": "pay_NXb7...",
      "createdAt": "2024-11-20T12:00:00.000Z",
      "slot": {
        "date": "2024-11-25",
        "time": "09:00 AM - 11:00 AM",
        "price": 3500,
        "experienceId": {
          "name": "Paragliding Adventure",
          "location": "Bir Billing",
          "about": "Detailed description...",
          "description": "Experience the thrill",
          "price": 3500,
          "tax": 350,
          "imgSrc": "https://example.com/image.jpg"
        }
      },
      "promocode": {
        "code": "SAVE20",
        "discountPercentage": 20
      }
    }
  ]
}
```

**Billing Calculation** (Frontend):
```javascript
const basePrice = slot.price * quantity;           // 3500 * 2 = 7000
const tax = slot.experienceId.tax;                 // 350
const discount = (basePrice + tax) * 0.20;         // 7350 * 0.20 = 1470
const totalAmount = basePrice + tax - discount;    // 7000 + 350 - 1470 = 5880
```

---

### Promo Codes

#### Validate Promo Code

Validate a promo code and retrieve discount information.

**Endpoint**: `POST /promo/validate`

**Request Body**:
```json
{
  "promocode": "SAVE20"
}
```

**Example Response** (Valid):
```json
{
  "success": true,
  "message": "Promo code is valid",
  "data": {
    "_id": "673e5fa1b...",
    "code": "SAVE20",
    "discountPercentage": 20,
    "isActive": true,
    "validTill": "2024-12-31T23:59:59.999Z"
  }
}
```

**Error Responses**:

Invalid Code:
```json
{
  "success": false,
  "message": "Invalid promo code",
  "statusCode": 404
}
```

Expired Code:
```json
{
  "success": false,
  "message": "Promo code has expired",
  "statusCode": 410
}
```

Inactive Code:
```json
{
  "success": false,
  "message": "Promo code is not active",
  "statusCode": 400
}
```

---

### Health Check

#### Server Health

Check if the server is running and healthy.

**Endpoint**: `GET /health`

**Example Request**:
```bash
GET /health
```

**Example Response**:
```json
{
  "success": true,
  "message": "Server is healthy",
  "data": {
    "status": "UP",
    "uptime": 123456.789,
    "timestamp": "2024-11-20T12:00:00.000Z",
    "environment": "production"
  }
}
```

---

## 🔄 Booking Flow

1. **Browse Experiences** - `GET /experiences`
2. **View Details & Slots** - `GET /experiences/:id`
3. **Validate Promo** (optional) - `POST /promo/validate`
4. **Create Booking** - `POST /bookings` → Receive Razorpay order
5. **Payment** - Use Razorpay SDK on frontend
6. **Verify Payment** - `POST /bookings/verifypayment`
7. **Track Booking** - `GET /bookings/details?email=...`

---

## 📊 Data Models

### Experience
```typescript
{
  _id: string;
  name: string;
  location: string;
  description: string;
  about: string;
  imgSrc: string;
  price: number;
  tax: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### Slot
```typescript
{
  _id: string;
  experienceId: string;
  date: string;        // "YYYY-MM-DD"
  time: string;        // "09:00 AM - 11:00 AM"
  price: number;
  totalSeats: number;
  bookedSeats: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### Booking
```typescript
{
  _id: string;
  name: string;
  email: string;
  slot: string;        // Slot ID
  quantity: number;
  promocode?: string;  // PromoCode ID
  razorOrderId: string;
  razorPaymentId?: string;
  status: "pending" | "confirmed" | "failed";
  createdAt: Date;
  updatedAt: Date;
}
```

### PromoCode
```typescript
{
  _id: string;
  code: string;
  discountPercentage: number;
  isActive: boolean;
  validTill: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 🛠️ Development

### Environment Variables

```env
PORT=5000
MONGODB_URI=mongodb://...
RAZORPAY_KEY_ID=rzp_test_...
RAZORPAY_KEY_SECRET=...
NODE_ENV=development
```

### Testing Endpoints

Use the REST files in `/api` directory:
- `experiences.rest`
- `bookings.rest`
- `promocode.rest`
- `track-booking.rest`

---

## 📝 Notes

- All dates are in ISO 8601 format
- Times are in 12-hour format with AM/PM
- Prices are in INR (Indian Rupees)
- Booking status changes from `pending` → `confirmed` after payment verification
- Seats are only booked after payment confirmation

---

## 🔗 Links

- **Frontend**: [https://bookit.iamabhinav.dev](https://bookit.iamabhinav.dev)
- **API Base**: [https://api.bookit.iamabhinav.dev](https://api.bookit.iamabhinav.dev)
- **GitHub**: [https://github.com/rishiyaduwanshi/bookit](https://github.com/rishiyaduwanshi/bookit)
- **Developer**: [Abhinav Yaduwanshi](https://iamabhinav.dev)

---

## 📧 Support

For issues or questions, please contact:
- Portfolio: [https://iamabhinav.dev](https://iamabhinav.dev)
- GitHub: [@rishiyaduwanshi](https://github.com/rishiyaduwanshi)
