'use client';
import Image from 'next/image';

export default function BookingDetailsCard({ booking }) {
  const statusColors = {
    confirmed: 'bg-green-100 text-green-800 border-green-200',
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    failed: 'bg-red-100 text-red-800 border-red-200',
  };

  const statusIcons = {
    confirmed: '✅',
    pending: '⏳',
    failed: '❌',
  };

  const formatDate = dateString => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatCurrency = amount => {
    return `₹${Math.round(amount).toLocaleString('en-IN')}`;
  };

  const experience = booking.slot?.experienceId || {};
  const slotPrice = booking.slot?.experienceId?.price || 0;
  const basePrice = slotPrice * booking.quantity;
  const tax = experience.tax || 0;

  let discount = 0;
  let discountPercentage = 0;
  if (booking.promocode) {
    discountPercentage = booking.promocode.discountPercentage || 0;
    discount = ((basePrice + tax) * discountPercentage) / 100;
  }

  const totalAmount = basePrice + tax - discount;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="hd-btn-primary p-4 sm:p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 sm:gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
              Booking Confirmation
            </h2>
            <p className="text-gray-700 text-xs sm:text-sm">
              Booking ID: {booking._id}
            </p>
          </div>
          <div
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border-2 font-semibold flex items-center gap-2 text-xs sm:text-sm ${statusColors[booking.status]}`}
          >
            <span>{statusIcons[booking.status]}</span>
            <span className="capitalize">{booking.status}</span>
          </div>
        </div>
      </div>

      {/* Customer Details */}
      <div className="p-4 sm:p-6 border-b border-gray-200 bg-gray-50">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">
          Customer Details
        </h3>
        <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <p className="text-gray-600 text-xs sm:text-sm">Name</p>
            <p className="font-semibold text-gray-900 text-sm sm:text-base">
              {booking.name}
            </p>
          </div>
          <div>
            <p className="text-gray-600 text-xs sm:text-sm">Email</p>
            <p className="font-semibold text-gray-900 text-sm sm:text-base break-all">
              {booking.email}
            </p>
          </div>
          <div>
            <p className="text-gray-600 text-xs sm:text-sm">Booking Date</p>
            <p className="font-semibold text-gray-900 text-sm sm:text-base">
              {formatDate(booking.createdAt)}
            </p>
          </div>
          <div>
            <p className="text-gray-600 text-xs sm:text-sm">Number of Guests</p>
            <p className="font-semibold text-gray-900 text-sm sm:text-base">
              {booking.quantity}
            </p>
          </div>
        </div>
      </div>

      {/* Experience Details */}
      <div className="p-4 sm:p-6 border-b border-gray-200 bg-white">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">
          Experience Details
        </h3>
        <div className="flex flex-col gap-3">
          {experience.imgSrc && (
            <div className="relative w-full h-48 sm:h-64 rounded-lg overflow-hidden">
              <Image
                src={experience.imgSrc}
                alt={experience.name || 'Experience'}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="flex-1">
            <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
              {experience.name || 'Experience'}
            </h4>
            <p className="text-gray-700 mb-2 text-sm sm:text-base">
              {experience.description || experience.about || ''}
            </p>
            {experience.location && (
              <div className="flex items-center gap-2 text-gray-800 text-sm sm:text-base">
                <span className="text-base sm:text-lg">📍</span>
                <span>{experience.location}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Slot Details */}
      <div className="p-4 sm:p-6 border-b border-gray-200 bg-gray-50">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">
          Scheduled Time
        </h3>
        <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xl sm:text-2xl">📅</span>
            <div>
              <p className="text-gray-600 text-xs sm:text-sm">Date</p>
              <p className="font-semibold text-gray-900 text-sm sm:text-base">
                {booking.slot?.date || 'N/A'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xl sm:text-2xl">🕐</span>
            <div>
              <p className="text-gray-600 text-xs sm:text-sm">Time</p>
              <p className="font-semibold text-gray-900 text-sm sm:text-base">
                {booking.slot?.time || 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Billing Details */}
      <div className="p-4 sm:p-6 border-b border-gray-200 bg-white">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
          Billing Details
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-xs sm:text-sm">
              Base Price ({booking.quantity} × {formatCurrency(slotPrice)})
            </span>
            <span className="font-semibold text-gray-900 text-sm sm:text-base">
              {formatCurrency(basePrice)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-xs sm:text-sm">
              Taxes & Fees
            </span>
            <span className="font-semibold text-gray-900 text-sm sm:text-base">
              {formatCurrency(tax)}
            </span>
          </div>

          {booking.promocode && (
            <div className="flex justify-between items-center text-green-800 bg-green-100 p-2 rounded-md border border-green-200">
              <span className="flex items-center gap-2 text-xs sm:text-sm font-medium">
                <span>🎟️</span>
                Promo ({booking.promocode.code}) - {discountPercentage}% off
              </span>
              <span className="font-semibold text-sm sm:text-base">
                -{formatCurrency(discount)}
              </span>
            </div>
          )}

          <div className="pt-3 border-t-2 border-gray-300 flex justify-between items-center">
            <span className="text-base sm:text-lg font-bold text-gray-900">
              Total Amount
            </span>
            <span className="text-xl sm:text-2xl font-bold text-green-700">
              {formatCurrency(totalAmount)}
            </span>
          </div>
        </div>
      </div>

      {/* Payment Details */}
      <div className="p-4 sm:p-6 bg-gray-50">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">
          Payment Information
        </h3>
        <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
          {booking.razorPaymentId && (
            <div>
              <p className="text-gray-600 text-xs sm:text-sm">Payment ID</p>
              <p className="font-mono text-xs sm:text-sm text-gray-900 break-all">
                {booking.razorPaymentId}
              </p>
            </div>
          )}
          <div>
            <p className="text-gray-600 text-xs sm:text-sm">Payment Status</p>
            <p
              className={`font-semibold capitalize text-sm sm:text-base ${
                booking.status === 'confirmed'
                  ? 'text-green-700'
                  : booking.status === 'pending'
                    ? 'text-yellow-700'
                    : 'text-red-700'
              }`}
            >
              {booking.status}
            </p>
          </div>
        </div>

        {booking.status === 'confirmed' && (
          <div className="p-3 sm:p-4 bg-green-100 border-2 border-green-300 rounded-md">
            <p className="text-green-800 text-xs sm:text-sm font-medium">
              ✅ Your booking is confirmed! Please arrive 15 minutes before the
              scheduled time.
            </p>
          </div>
        )}

        {booking.status === 'pending' && (
          <div className="p-3 sm:p-4 bg-yellow-100 border-2 border-yellow-300 rounded-md">
            <p className="text-yellow-800 text-xs sm:text-sm font-medium">
              ⏳ Your payment is being processed. This may take a few minutes.
            </p>
          </div>
        )}

        {booking.status === 'failed' && (
          <div className="p-3 sm:p-4 bg-red-100 border-2 border-red-300 rounded-md">
            <p className="text-red-800 text-xs sm:text-sm font-medium">
              ❌ Payment failed. Please contact support or try booking again.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
