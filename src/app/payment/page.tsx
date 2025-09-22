'use client';

import { useState } from 'react';
import PaymentForm from '@/components/PaymentForm';
import PaymentStatus from '@/components/PaymentStatus';
import SetupGuide from '@/components/SetupGuide';
import { Invoice } from '@/lib/cryptomus/types';

export default function PaymentPage() {
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [error, setError] = useState<string>('');

  const handlePaymentCreated = (paymentData: Invoice) => {
    setInvoice(paymentData);
    setError('');
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    setInvoice(null);
  };

  const handleStatusUpdate = (updatedInvoice: Invoice) => {
    setInvoice(updatedInvoice);
  };

  const handleNewPayment = () => {
    setInvoice(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Cryptomus Payment Gateway
          </h1>
          <p className="text-gray-600">
            Accept cryptocurrency payments securely
          </p>
        </div>

        <SetupGuide error={error} />

        {error && !error.includes('Configuration Error') && !error.includes('CRYPTOMUS_MERCHANT_UUID') && (
          <div className="mb-6 max-w-md mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error</h3>
                  <p className="mt-1 text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {!invoice ? (
          <PaymentForm 
            onPaymentCreated={handlePaymentCreated}
            onError={handleError}
          />
        ) : (
          <div className="space-y-6">
            <PaymentStatus 
              invoice={invoice}
              onStatusUpdate={handleStatusUpdate}
            />
            
            <div className="text-center">
              <button
                onClick={handleNewPayment}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Create New Payment
              </button>
            </div>
          </div>
        )}

        <div className="mt-12 text-center">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Supported Cryptocurrencies
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 text-sm text-gray-600">
              <div>Bitcoin (BTC)</div>
              <div>Ethereum (ETH)</div>
              <div>Tether (USDT)</div>
              <div>USD Coin (USDC)</div>
              <div>Litecoin (LTC)</div>
              <div>Bitcoin Cash (BCH)</div>
              <div>Ripple (XRP)</div>
              <div>Cardano (ADA)</div>
              <div>Polkadot (DOT)</div>
              <div>Chainlink (LINK)</div>
              <div>Binance Coin (BNB)</div>
              <div>Solana (SOL)</div>
              <div>Polygon (MATIC)</div>
              <div>Avalanche (AVAX)</div>
              <div>Tron (TRX)</div>
              <div>Dogecoin (DOGE)</div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              How it works
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-800">
              <div>
                <div className="font-medium mb-1">1. Create Payment</div>
                <div>Enter amount and select currency</div>
              </div>
              <div>
                <div className="font-medium mb-1">2. Pay with Crypto</div>
                <div>Send payment to the provided address</div>
              </div>
              <div>
                <div className="font-medium mb-1">3. Confirmation</div>
                <div>Receive instant confirmation</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
