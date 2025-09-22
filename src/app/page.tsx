import Link from 'next/link';
import { ProductCard } from '@/components/ProductCard';
import { HeroSection } from '@/components/HeroSection';
import { FeaturesSection } from '@/components/FeaturesSection';

const products = [
  {
    id: 'premium-course',
    name: 'Premium Crypto Course',
    description: 'Complete cryptocurrency trading and investment course with expert insights.',
    price: 0.01,
    currency: 'USDC',
    image: '/api/placeholder/300/200?text=Crypto+Course',
    features: ['10+ Hours of Content', 'Expert Strategies', 'Live Q&A Sessions', 'Certificate']
  },
  {
    id: 'nft-artwork',
    name: 'Digital NFT Artwork',
    description: 'Exclusive digital artwork collection by renowned crypto artists.',
    price: 0.005,
    currency: 'ETH',
    image: '/api/placeholder/300/200?text=NFT+Art',
    features: ['Unique Design', 'Blockchain Verified', 'High Resolution', 'Commercial Rights']
  },
  {
    id: 'trading-bot',
    name: 'AI Trading Bot License',
    description: 'Advanced AI-powered trading bot with proven performance metrics.',
    price: 0.02,
    currency: 'BTC',
    image: '/api/placeholder/300/200?text=Trading+Bot',
    features: ['24/7 Trading', 'Risk Management', 'Multiple Exchanges', '1 Year License']
  },
  {
    id: 'consultation',
    name: 'Crypto Consultation',
    description: 'One-on-one consultation with blockchain and cryptocurrency experts.',
    price: 15,
    currency: 'USDT',
    image: '/api/placeholder/300/200?text=Consultation',
    features: ['1 Hour Session', 'Expert Advice', 'Custom Strategy', 'Follow-up Support']
  },
  {
    id: 'defi-guide',
    name: 'DeFi Mastery Guide',
    description: 'Comprehensive guide to decentralized finance protocols and strategies.',
    price: 25,
    currency: 'USD',
    image: '/api/placeholder/300/200?text=DeFi+Guide',
    features: ['200+ Pages', 'Protocol Analysis', 'Yield Strategies', 'Risk Assessment']
  },
  {
    id: 'wallet-security',
    name: 'Wallet Security Kit',
    description: 'Complete security package for protecting your cryptocurrency assets.',
    price: 0.008,
    currency: 'USDC',
    image: '/api/placeholder/300/200?text=Security+Kit',
    features: ['Hardware Wallet', 'Security Guide', 'Backup Tools', 'Support']
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <HeroSection />

      {/* Products Section */}
      <section id="products" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Premium Digital Products
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our collection of high-quality digital products. Pay securely with cryptocurrency
              and get instant access to premium content and services.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <FeaturesSection />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Accepting Crypto Payments?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses already using our secure cryptocurrency payment gateway.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/payment"
              className="bg-white hover:bg-gray-100 text-blue-600 font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Try Demo Payment
            </Link>
            <Link
              href="#products"
              className="border-2 border-white hover:bg-white hover:text-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>

      {/* Supported Cryptocurrencies */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Supported Cryptocurrencies
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {[
              'BTC', 'ETH', 'USDT', 'USDC', 'LTC', 'BCH', 'XRP', 'ADA',
              'DOT', 'LINK', 'BNB', 'SOL', 'MATIC', 'AVAX', 'TRX', 'DOGE'
            ].map((crypto) => (
              <div key={crypto} className="text-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <span className="text-lg font-bold text-gray-800">{crypto}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
