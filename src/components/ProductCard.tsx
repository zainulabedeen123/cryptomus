'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  image: string;
  features: string[];
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

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

  const getCurrencyIcon = (currency: string) => {
    const icons: Record<string, string> = {
      'BTC': '₿',
      'ETH': 'Ξ',
      'USDT': '₮',
      'USDC': '$',
      'USD': '$'
    };
    return icons[currency] || '₿';
  };

  return (
    <div
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl opacity-20">
            {product.name.includes('Course') && '📚'}
            {product.name.includes('NFT') && '🎨'}
            {product.name.includes('Bot') && '🤖'}
            {product.name.includes('Consultation') && '💬'}
            {product.name.includes('Guide') && '📖'}
            {product.name.includes('Security') && '🛡️'}
          </div>
        </div>
        
        {/* Currency Badge */}
        <div className="absolute top-4 right-4">
          <div className={`bg-gradient-to-r ${getCurrencyColor(product.currency)} text-white px-3 py-1 rounded-full text-sm font-bold flex items-center space-x-1`}>
            <span>{getCurrencyIcon(product.currency)}</span>
            <span>{product.currency}</span>
          </div>
        </div>

        {/* Hover Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute bottom-4 left-4 right-4">
            <div className="text-white text-sm opacity-90">
              Click to purchase with crypto
            </div>
          </div>
        </div>
      </div>

      {/* Product Content */}
      <div className="p-6">
        {/* Product Name & Price */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">
              {formatPrice(product.price, product.currency)}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-4 leading-relaxed">
          {product.description}
        </p>

        {/* Features */}
        <div className="mb-6">
          <div className="grid grid-cols-2 gap-2">
            {product.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Purchase Button */}
        <Link
          href={`/checkout/${product.id}`}
          className={`w-full bg-gradient-to-r ${getCurrencyColor(product.currency)} hover:shadow-lg text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 group-hover:shadow-xl`}
        >
          <span>{getCurrencyIcon(product.currency)}</span>
          <span>Pay with Crypto</span>
          <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>

      {/* Animated Border */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${getCurrencyColor(product.currency)} opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none`}></div>
    </div>
  );
}
