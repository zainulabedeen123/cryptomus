'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { PaymentStatus } from '@/lib/cryptomus/types';

// Mock invoice data (in a real app, this would come from a database or API)
const mockInvoices: Record<string, any> = {};

export default function SimulatedPaymentPage() {
  const params = useParams();
  const router = useRouter();
  const [invoice, setInvoice] = useState<any>(null);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>(PaymentStatus.CHECK);
  const [timeLeft, setTimeLeft] = useState<number>(3600); // 1 hour
  const [copied, setCopied] = useState(false);
  
  const uuid = params.uuid as string;

  useEffect(() => {
    // In a real app, this would fetch the invoice from the API
    // For simulation, we'll create a mock invoice
    if (!mockInvoices[uuid]) {
      mockInvoices[uuid] = {
        uuid,
        amount: '0.01',
        currency: 'USDC',
        payer_currency: 'USDC',
        payer_amount: '0.01',
        address: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b5',
        network: 'ethereum',
        payment_status: PaymentStatus.CHECK,
        expired_at: Math.floor(Date.now() / 1000) + 3600,
        created_at: new Date().toISOString()
      };
    }
    setInvoice(mockInvoices[uuid]);
    setPaymentStatus(mockInvoices[uuid].payment_status);
  }, [uuid]);

  useEffect(() => {
    if (!invoice) return;

    const timer = setInterval(() => {
      const now = Math.floor(Date.now() / 1000);
      const remaining = invoice.expired_at - now;
      
      if (remaining <= 0) {
        setTimeLeft(0);
        setPaymentStatus(PaymentStatus.CANCEL);
        clearInterval(timer);
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [invoice]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const simulatePayment = (status: PaymentStatus) => {
    setPaymentStatus(status);
    mockInvoices[uuid].payment_status = status;
    
    // Simulate webhook call
    setTimeout(() => {
      if (status === PaymentStatus.PAID) {
        router.push('/payment-success');
      } else if (status === PaymentStatus.FAIL) {
        router.push('/payment-failed');
      }
    }, 2000);
  };

  if (!invoice) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading payment details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Simulation Banner */}
      <div className="bg-yellow-500 text-black py-3 px-4 text-center font-medium">
        🎭 SIMULATION MODE - This is a demo payment. No real cryptocurrency will be transferred.
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Complete Your Payment
            </h1>
            <p className="text-gray-600">
              Send exactly <span className="font-bold text-blue-600">{invoice.payer_amount} {invoice.payer_currency}</span> to the address below
            </p>
          </div>

          {/* Payment Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Status Header */}
            <div className={`p-4 text-center text-white ${
              paymentStatus === PaymentStatus.CHECK ? 'bg-blue-600' :
              paymentStatus === PaymentStatus.PAID ? 'bg-green-600' :
              paymentStatus === PaymentStatus.FAIL ? 'bg-red-600' :
              'bg-gray-600'
            }`}>
              <div className="flex items-center justify-center space-x-2">
                {paymentStatus === PaymentStatus.CHECK && (
                  <>
                    <div className="animate-pulse w-3 h-3 bg-white rounded-full"></div>
                    <span>Waiting for Payment</span>
                  </>
                )}
                {paymentStatus === PaymentStatus.PAID && (
                  <>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Payment Confirmed</span>
                  </>
                )}
                {paymentStatus === PaymentStatus.FAIL && (
                  <>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <span>Payment Failed</span>
                  </>
                )}
              </div>
              {paymentStatus === PaymentStatus.CHECK && (
                <div className="mt-2 text-sm">
                  Time remaining: {formatTime(timeLeft)}
                </div>
              )}
            </div>

            <div className="p-6">
              {/* Payment Amount */}
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {invoice.payer_amount} {invoice.payer_currency}
                </div>
                <div className="text-gray-600">
                  Network: {invoice.network}
                </div>
              </div>

              {/* Payment Address */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Address
                </label>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 p-3 bg-gray-50 rounded-lg font-mono text-sm break-all">
                    {invoice.address}
                  </div>
                  <button
                    onClick={() => copyToClipboard(invoice.address)}
                    className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {copied ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* QR Code Placeholder */}
              <div className="text-center mb-6">
                <div className="inline-block p-4 bg-gray-100 rounded-lg">
                  <div className="w-48 h-48 bg-white border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 2V5h1v1H5zM3 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zm2 2v-1h1v1H5zM13 3a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1V4a1 1 0 00-1-1h-3zm1 2v1h1V5h-1z" clipRule="evenodd" />
                      </svg>
                      <div className="text-sm">QR Code</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Simulation Controls */}
              {paymentStatus === PaymentStatus.CHECK && (
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                    🎭 Simulation Controls
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => simulatePayment(PaymentStatus.PAID)}
                      className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
                    >
                      ✅ Simulate Success
                    </button>
                    <button
                      onClick={() => simulatePayment(PaymentStatus.FAIL)}
                      className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
                    >
                      ❌ Simulate Failure
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 text-center mt-3">
                    Click these buttons to simulate different payment outcomes
                  </p>
                </div>
              )}

              {/* Instructions */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Payment Instructions:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Send exactly {invoice.payer_amount} {invoice.payer_currency}</li>
                  <li>• Use the {invoice.network} network</li>
                  <li>• Payment will be confirmed automatically</li>
                  <li>• Do not send from an exchange wallet</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="text-center mt-8">
            <Link
              href="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Store
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
