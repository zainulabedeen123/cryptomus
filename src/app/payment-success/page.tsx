'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import PaymentStatus from '@/components/PaymentStatus';
import { Invoice } from '@/lib/cryptomus/types';

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const uuid = searchParams.get('uuid');
    const orderId = searchParams.get('order_id');

    if (!uuid && !orderId) {
      setError('No payment information found');
      setLoading(false);
      return;
    }

    fetchPaymentStatus(uuid, orderId);
  }, [searchParams]);

  const fetchPaymentStatus = async (uuid: string | null, orderId: string | null) => {
    try {
      const params = new URLSearchParams();
      if (uuid) params.append('uuid', uuid);
      if (orderId) params.append('order_id', orderId);

      const response = await fetch(`/api/cryptomus/payment-status?${params}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch payment status');
      }

      if (data.success) {
        setInvoice(data.payment);
      } else {
        throw new Error('Payment not found');
      }
    } catch (error) {
      console.error('Error fetching payment status:', error);
      setError(error instanceof Error ? error.message : 'Failed to load payment information');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = (updatedInvoice: Invoice) => {
    setInvoice(updatedInvoice);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading payment information...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-red-600 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Error</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <Link
              href="/payment"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Create New Payment
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Payment Not Found</h2>
            <p className="text-gray-600 mb-4">The payment information could not be found.</p>
            <Link
              href="/payment"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Create New Payment
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simulation Banner */}
      <div className="bg-yellow-500 text-black py-3 px-4 text-center font-medium">
        🎭 SIMULATION MODE - This was a demo payment success
      </div>

      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Payment Information
          </h1>
          <p className="text-gray-600">
            Track your cryptocurrency payment status
          </p>
        </div>

        <PaymentStatus 
          invoice={invoice}
          onStatusUpdate={handleStatusUpdate}
        />

        <div className="mt-8 text-center space-x-4">
          <Link
            href="/payment"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Create New Payment
          </Link>
          
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Back to Home
          </Link>
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Need Help?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Payment Issues</h3>
              <ul className="space-y-1">
                <li>• Check your transaction on the blockchain</li>
                <li>• Ensure you sent the correct amount</li>
                <li>• Verify the payment address</li>
                <li>• Wait for network confirmations</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Contact Support</h3>
              <ul className="space-y-1">
                <li>• Email: support@example.com</li>
                <li>• Include your Order ID</li>
                <li>• Provide transaction hash if available</li>
                <li>• Response within 24 hours</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
