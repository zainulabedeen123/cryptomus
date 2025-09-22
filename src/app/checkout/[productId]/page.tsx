'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

// Product data (in a real app, this would come from a database)
const products = {
  'premium-course': {
    id: 'premium-course',
    name: 'Premium Crypto Course',
    description: 'Complete cryptocurrency trading and investment course with expert insights.',
    price: 0.01,
    currency: 'USDC',
    features: ['10+ Hours of Content', 'Expert Strategies', 'Live Q&A Sessions', 'Certificate'],
    longDescription: 'Master the art of cryptocurrency trading with our comprehensive course. Learn from industry experts, understand market dynamics, and develop winning strategies that have been tested in real markets.'
  },
  'nft-artwork': {
    id: 'nft-artwork',
    name: 'Digital NFT Artwork',
    description: 'Exclusive digital artwork collection by renowned crypto artists.',
    price: 0.005,
    currency: 'ETH',
    features: ['Unique Design', 'Blockchain Verified', 'High Resolution', 'Commercial Rights'],
    longDescription: 'Own a piece of digital art history with this exclusive NFT collection. Each piece is uniquely crafted and verified on the blockchain, giving you true ownership and commercial rights.'
  },
  'trading-bot': {
    id: 'trading-bot',
    name: 'AI Trading Bot License',
    description: 'Advanced AI-powered trading bot with proven performance metrics.',
    price: 0.02,
    currency: 'BTC',
    features: ['24/7 Trading', 'Risk Management', 'Multiple Exchanges', '1 Year License'],
    longDescription: 'Automate your trading with our advanced AI bot. Proven performance across multiple exchanges with built-in risk management and 24/7 operation.'
  },
  'consultation': {
    id: 'consultation',
    name: 'Crypto Consultation',
    description: 'One-on-one consultation with blockchain and cryptocurrency experts.',
    price: 15,
    currency: 'USDT',
    features: ['1 Hour Session', 'Expert Advice', 'Custom Strategy', 'Follow-up Support'],
    longDescription: 'Get personalized advice from blockchain experts. Whether you\'re starting your crypto journey or looking to optimize your portfolio, our experts will provide tailored guidance.'
  },
  'defi-guide': {
    id: 'defi-guide',
    name: 'DeFi Mastery Guide',
    description: 'Comprehensive guide to decentralized finance protocols and strategies.',
    price: 25,
    currency: 'USD',
    features: ['200+ Pages', 'Protocol Analysis', 'Yield Strategies', 'Risk Assessment'],
    longDescription: 'Navigate the complex world of DeFi with confidence. This comprehensive guide covers all major protocols, yield farming strategies, and risk management techniques.'
  },
  'wallet-security': {
    id: 'wallet-security',
    name: 'Wallet Security Kit',
    description: 'Complete security package for protecting your cryptocurrency assets.',
    price: 0.008,
    currency: 'USDC',
    features: ['Hardware Wallet', 'Security Guide', 'Backup Tools', 'Support'],
    longDescription: 'Protect your crypto assets with our comprehensive security kit. Includes hardware wallet, detailed security guide, backup tools, and ongoing support.'
  }
};

export default function CheckoutPage() {
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const productId = params.productId as string;
  const product = products[productId as keyof typeof products];

  useEffect(() => {
    if (!product) {
      router.push('/');
    }
  }, [product, router]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link href="/" className="text-blue-600 hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number, currency: string) => {
    if (currency === 'USD') {
      return `$${price}`;
    }
    return `${price} ${currency}`;
  };

  const getCurrencyColor = (currency: string) => {
    const colors: Record<string, string> = {
      'BTC': 'from-orange-500 to-yellow-500',
      'ETH': 'from-blue-500 to-purple-500',
      'USDT': 'from-green-500 to-emerald-500',
      'USDC': 'from-blue-600 to-cyan-500',
      'USD': 'from-gray-600 to-gray-800'
    };
    return colors[currency] || 'from-blue-500 to-purple-500';
  };

  const handlePurchase = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/cryptomus/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: product.price.toString(),
          currency: product.currency,
          order_id: `${product.id}-${Date.now()}`,
          additional_data: JSON.stringify({
            product_id: product.id,
            product_name: product.name
          }),
          url_success: `${window.location.origin}/payment-success`,
          url_return: `${window.location.origin}/checkout/${product.id}`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create payment');
      }

      if (data.success && data.invoice?.payment_url) {
        // Redirect to Cryptomus payment page
        window.location.href = data.invoice.payment_url;
      } else {
        throw new Error('Invalid payment response');
      }
    } catch (err) {
      console.error('Payment creation error:', err);
      setError(err instanceof Error ? err.message : 'Failed to create payment');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Products
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid lg:grid-cols-2">
              {/* Product Details */}
              <div className="p-8 lg:p-12">
                <div className="mb-6">
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    {product.name}
                  </h1>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {product.longDescription}
                  </p>
                </div>

                {/* Features */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">What's Included:</h3>
                  <div className="space-y-3">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Security Badge */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-green-800">Secure Payment</div>
                      <div className="text-green-600 text-sm">Protected by Cryptomus encryption</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Section */}
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-8 lg:p-12">
                <div className="text-center mb-8">
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    {formatPrice(product.price, product.currency)}
                  </div>
                  <div className="text-gray-600">One-time payment</div>
                </div>

                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                    <div className="text-red-800 text-sm">{error}</div>
                  </div>
                )}

                <button
                  onClick={handlePurchase}
                  disabled={isLoading}
                  className={`w-full bg-gradient-to-r ${getCurrencyColor(product.currency)} hover:shadow-lg text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <span>🚀</span>
                      <span>Pay with {product.currency}</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </button>

                <div className="mt-6 text-center text-sm text-gray-500">
                  <p>Secure payment powered by Cryptomus</p>
                  <p className="mt-2">Supports 20+ cryptocurrencies</p>
                </div>

                {/* Supported Currencies */}
                <div className="mt-8">
                  <div className="text-center text-sm text-gray-600 mb-4">Accepted Cryptocurrencies:</div>
                  <div className="flex flex-wrap justify-center gap-2">
                    {['BTC', 'ETH', 'USDT', 'USDC', 'LTC', 'BCH'].map((crypto) => (
                      <span key={crypto} className="px-3 py-1 bg-white rounded-full text-xs font-medium text-gray-700 border">
                        {crypto}
                      </span>
                    ))}
                    <span className="px-3 py-1 bg-white rounded-full text-xs font-medium text-gray-700 border">
                      +14 more
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
