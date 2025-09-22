'use client';

interface SetupGuideProps {
  error?: string;
}

export default function SetupGuide({ error }: SetupGuideProps) {
  const isConfigError = error?.includes('Configuration Error') || error?.includes('CRYPTOMUS_MERCHANT_UUID');

  if (!isConfigError) return null;

  return (
    <div className="max-w-2xl mx-auto mb-8">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-medium text-yellow-800 mb-3">
              🔧 Setup Required
            </h3>
            <div className="text-yellow-700 space-y-4">
              <p className="font-medium">
                You need to configure your Cryptomus credentials to use the payment gateway.
              </p>
              
              <div className="bg-yellow-100 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Step 1: Get Your Merchant ID</h4>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  <li>Go to <a href="https://app.cryptomus.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Cryptomus Dashboard</a></li>
                  <li>Navigate to <strong>Settings → API</strong></li>
                  <li>Copy your <strong>Merchant ID</strong> (not the API key)</li>
                </ol>
              </div>

              <div className="bg-yellow-100 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Step 2: Update Environment Variables</h4>
                <p className="text-sm mb-2">Update your <code className="bg-yellow-200 px-1 py-0.5 rounded">.env.local</code> file:</p>
                <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs overflow-x-auto">
{`CRYPTOMUS_API_KEY=Gg2WrXYX8O1t7QpdXyljRVvMMk83IQq9LBrkjQNEOLOEQ1WFU0A4Vv8DjPlVd38nXJnEEOeNQ2dzEyifnMuykMMBfLkEHeIVbdFNjsEEMG2F08NnfHD8iYJ4SKIFUAXf
CRYPTOMUS_MERCHANT_UUID=your-actual-merchant-id-here
CRYPTOMUS_API_BASE_URL=https://api.cryptomus.com
NEXT_PUBLIC_APP_URL=http://localhost:3000`}
                </pre>
              </div>

              <div className="bg-yellow-100 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Step 3: Restart Development Server</h4>
                <p className="text-sm">After updating the environment variables, restart your development server:</p>
                <pre className="bg-gray-800 text-green-400 p-2 rounded text-xs mt-2">
npm run dev
                </pre>
              </div>

              <div className="flex items-start space-x-2 text-sm">
                <svg className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-medium">Need help?</p>
                  <p>Check the <a href="https://doc.cryptomus.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Cryptomus Documentation</a> for more details.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
