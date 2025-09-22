import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      <div className="relative container mx-auto px-4 py-24 lg:py-32">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
            Live Crypto Payment Gateway
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Accept <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Crypto</span> Payments
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Instantly</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl lg:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Secure, fast, and reliable cryptocurrency payment processing. 
            Support for 20+ cryptocurrencies with real-time confirmations and instant settlements.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link
              href="#products"
              className="bg-white hover:bg-gray-100 text-blue-600 font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              🛍️ Shop Products
            </Link>
            <Link
              href="/payment"
              className="border-2 border-white hover:bg-white hover:text-blue-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              🚀 Try Demo
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">20+</div>
              <div className="text-blue-200">Cryptocurrencies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">99.9%</div>
              <div className="text-blue-200">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">&lt;30s</div>
              <div className="text-blue-200">Processing Time</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-400/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-cyan-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-400/20 rounded-full blur-xl animate-pulse delay-500"></div>
    </section>
  );
}
