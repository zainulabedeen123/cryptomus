import Link from 'next/link';

export default function PaymentFailedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center p-8">
        {/* Simulation Banner */}
        <div className="bg-yellow-500 text-black py-2 px-4 rounded-lg mb-6 text-sm font-medium">
          🎭 SIMULATION MODE - This was a demo payment failure
        </div>

        {/* Error Icon */}
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-red-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Payment Failed
        </h1>

        {/* Description */}
        <p className="text-gray-600 mb-8 leading-relaxed">
          Your payment could not be processed. This could be due to insufficient funds, 
          network issues, or the payment window expiring.
        </p>

        {/* Common Reasons */}
        <div className="bg-white rounded-xl p-6 mb-8 text-left">
          <h3 className="font-semibold text-gray-900 mb-4">Common reasons for payment failure:</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start space-x-2">
              <span className="text-red-500 mt-1">•</span>
              <span>Insufficient balance in your wallet</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-red-500 mt-1">•</span>
              <span>Network congestion or high gas fees</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-red-500 mt-1">•</span>
              <span>Payment window expired</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-red-500 mt-1">•</span>
              <span>Incorrect payment amount or address</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-red-500 mt-1">•</span>
              <span>Transaction rejected by the network</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link
            href="/"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors inline-block"
          >
            Try Again
          </Link>
          
          <Link
            href="/support"
            className="w-full border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-bold py-3 px-6 rounded-xl transition-colors inline-block"
          >
            Contact Support
          </Link>
        </div>

        {/* Help Text */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Need help?</strong> If you continue to experience issues, please contact our support team 
            with your order details for assistance.
          </p>
        </div>

        {/* Footer */}
        <div className="mt-8 text-sm text-gray-500">
          <p>Powered by Cryptomus Payment Gateway</p>
        </div>
      </div>
    </div>
  );
}
