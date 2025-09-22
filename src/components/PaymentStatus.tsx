'use client';

import { useState, useEffect } from 'react';
import { Invoice } from '@/lib/cryptomus/types';
import { getPaymentStatusText, getPaymentStatusColor, formatTimestamp } from '@/lib/cryptomus/utils';
import { SUCCESS_PAYMENT_STATUSES, FAILED_PAYMENT_STATUSES } from '@/lib/cryptomus/constants';

interface PaymentStatusProps {
  invoice: Invoice;
  onStatusUpdate?: (updatedInvoice: Invoice) => void;
}

export default function PaymentStatus({ invoice, onStatusUpdate }: PaymentStatusProps) {
  const [currentInvoice, setCurrentInvoice] = useState<Invoice>(invoice);
  const [isPolling, setIsPolling] = useState(false);
  const [copied, setCopied] = useState(false);

  // Poll for status updates if payment is not final
  useEffect(() => {
    if (currentInvoice.is_final) {
      setIsPolling(false);
      return;
    }

    setIsPolling(true);
    const interval = setInterval(async () => {
      try {
        const response = await fetch(`/api/cryptomus/payment-status?uuid=${currentInvoice.uuid}`);
        const data = await response.json();
        
        if (data.success && data.payment) {
          setCurrentInvoice(data.payment);
          onStatusUpdate?.(data.payment);
          
          // Stop polling if payment is final
          if (data.payment.is_final) {
            setIsPolling(false);
          }
        }
      } catch (error) {
        console.error('Error polling payment status:', error);
      }
    }, 10000); // Poll every 10 seconds

    return () => {
      clearInterval(interval);
      setIsPolling(false);
    };
  }, [currentInvoice.uuid, currentInvoice.is_final, onStatusUpdate]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const isSuccess = SUCCESS_PAYMENT_STATUSES.includes(currentInvoice.payment_status as any);
  const isFailed = FAILED_PAYMENT_STATUSES.includes(currentInvoice.payment_status as any);
  const isPending = !isSuccess && !isFailed;

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Payment Status
        </h2>
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getPaymentStatusColor(currentInvoice.payment_status)}`}>
          {isPolling && isPending && (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
          )}
          {getPaymentStatusText(currentInvoice.payment_status)}
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Order ID</label>
            <p className="mt-1 text-sm text-gray-900 font-mono">{currentInvoice.order_id}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Amount</label>
            <p className="mt-1 text-sm text-gray-900">
              {currentInvoice.amount} {currentInvoice.currency}
            </p>
          </div>

          {currentInvoice.payer_amount && currentInvoice.payer_currency && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Amount to Pay</label>
              <p className="mt-1 text-sm text-gray-900">
                {currentInvoice.payer_amount} {currentInvoice.payer_currency}
              </p>
            </div>
          )}

          {currentInvoice.payment_amount && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Paid Amount</label>
              <p className="mt-1 text-sm text-gray-900">
                {currentInvoice.payment_amount} {currentInvoice.payer_currency || currentInvoice.currency}
              </p>
            </div>
          )}

          {currentInvoice.network && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Network</label>
              <p className="mt-1 text-sm text-gray-900 capitalize">{currentInvoice.network}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">Created</label>
            <p className="mt-1 text-sm text-gray-900">
              {new Date(currentInvoice.created_at).toLocaleString()}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Expires</label>
            <p className="mt-1 text-sm text-gray-900">
              {formatTimestamp(currentInvoice.expired_at)}
            </p>
          </div>
        </div>

        {currentInvoice.address && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Payment Address</label>
            <div className="flex items-center space-x-2">
              <code className="flex-1 bg-gray-100 px-3 py-2 rounded text-sm font-mono break-all">
                {currentInvoice.address}
              </code>
              <button
                onClick={() => copyToClipboard(currentInvoice.address!)}
                className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        )}

        {currentInvoice.txid && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Transaction Hash</label>
            <code className="block bg-gray-100 px-3 py-2 rounded text-sm font-mono break-all">
              {currentInvoice.txid}
            </code>
          </div>
        )}

        {currentInvoice.from && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">From Address</label>
            <code className="block bg-gray-100 px-3 py-2 rounded text-sm font-mono break-all">
              {currentInvoice.from}
            </code>
          </div>
        )}

        {isPending && currentInvoice.url && (
          <div className="text-center pt-4">
            <a
              href={currentInvoice.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Pay Now
              <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        )}

        {isSuccess && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <div className="text-green-600 mb-2">
              <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-green-900">Payment Successful!</h3>
            <p className="text-green-700">Your payment has been confirmed.</p>
          </div>
        )}

        {isFailed && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <div className="text-red-600 mb-2">
              <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-red-900">Payment Failed</h3>
            <p className="text-red-700">There was an issue with your payment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
