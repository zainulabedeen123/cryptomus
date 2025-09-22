export function FeaturesSection() {
  const features = [
    {
      icon: '🔒',
      title: 'Bank-Level Security',
      description: 'End-to-end encryption, multi-signature wallets, and advanced fraud protection keep your transactions secure.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '⚡',
      title: 'Lightning Fast',
      description: 'Process payments in seconds with real-time confirmations and instant settlement to your wallet.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: '🌍',
      title: 'Global Reach',
      description: 'Accept payments from anywhere in the world with support for major cryptocurrencies and networks.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: '📊',
      title: 'Real-time Analytics',
      description: 'Track payments, monitor performance, and get detailed insights with our comprehensive dashboard.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: '🔄',
      title: 'Auto-Convert',
      description: 'Automatically convert crypto to your preferred currency with competitive exchange rates.',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      icon: '🛡️',
      title: 'Compliance Ready',
      description: 'Built-in AML/KYC compliance tools and regulatory reporting to keep your business compliant.',
      color: 'from-red-500 to-pink-500'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose Our Payment Gateway?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Built for modern businesses that want to embrace the future of payments. 
            Our platform combines security, speed, and simplicity.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              {/* Icon with gradient background */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover effect border */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`}></div>
            </div>
          ))}
        </div>

        {/* Additional Info Section */}
        <div className="mt-20 bg-white rounded-3xl p-8 lg:p-12 shadow-xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Enterprise-Grade Infrastructure
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">99.99% uptime SLA guarantee</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">24/7 technical support</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">SOC 2 Type II certified</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Multi-region redundancy</span>
                </div>
              </div>
            </div>
            <div className="text-center lg:text-right">
              <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white">
                <div className="text-4xl font-bold mb-2">$50M+</div>
                <div className="text-blue-100">Processed Monthly</div>
                <div className="text-2xl font-bold mt-4 mb-2">10,000+</div>
                <div className="text-blue-100">Active Merchants</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
