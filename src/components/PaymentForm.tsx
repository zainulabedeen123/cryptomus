'use client';

import { useState } from 'react';
import { PaymentFormData } from '@/lib/cryptomus/types';
import { SUPPORTED_CURRENCIES, FIAT_CURRENCIES, CRYPTO_CURRENCIES } from '@/lib/cryptomus/constants';

interface PaymentFormProps {
  onPaymentCreated: (paymentData: any) => void;
  onError: (error: string) => void;
}

export default function PaymentForm({ onPaymentCreated, onError }: PaymentFormProps) {
  const [formData, setFormData] = useState<PaymentFormData>({
    amount: 0,
    currency: 'USD',
    description: '',
    customerEmail: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.amount <= 0) {
      onError('Please enter a valid amount');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/cryptomus/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data.details ? `${data.error}: ${data.details}` : (data.error || 'Failed to create payment');
        throw new Error(errorMessage);
      }

      if (data.success) {
        onPaymentCreated(data.invoice);
      } else {
        throw new Error('Payment creation failed');
      }
    } catch (error) {
      console.error('Payment creation error:', error);
      onError(error instanceof Error ? error.message : 'Failed to create payment');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) || 0 : value,
    }));
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Create Payment
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            Amount *
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount || ''}
            onChange={handleInputChange}
            step="0.01"
            min="0"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1">
            Currency *
          </label>
          <select
            id="currency"
            name="currency"
            value={formData.currency}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <optgroup label="Fiat Currencies">
              {FIAT_CURRENCIES.map(currency => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </optgroup>
            <optgroup label="Cryptocurrencies">
              {CRYPTO_CURRENCIES.map(currency => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </optgroup>
          </select>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Payment description (optional)"
          />
        </div>

        <div>
          <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="customerEmail"
            name="customerEmail"
            value={formData.customerEmail}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="your@email.com (optional)"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Creating Payment...' : 'Create Payment'}
        </button>
      </form>
    </div>
  );
}
