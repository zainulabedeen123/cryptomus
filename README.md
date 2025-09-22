# 🚀 Cryptomus Payment Gateway - Complete Next.js Template

> **A complete, production-ready cryptocurrency payment gateway template with simulation mode for learning and testing!**

A professional Next.js application demonstrating cryptocurrency payment processing using the Cryptomus API. Perfect for developers, YouTube tutorials, and businesses wanting to integrate crypto payments.

## ✨ Features

### 🎭 **Simulation Mode**
- **Demo payments** without real cryptocurrency transfers
- **Interactive payment flow** with success/failure simulation
- **Perfect for testing** and learning how crypto payments work
- **Educational banners** showing it's a simulation
- **No API credentials required** for initial testing

### 💳 **Crypto Payment Processing**
- **20+ cryptocurrencies** including Bitcoin, Ethereum, USDT, USDC
- **Real-time confirmations** and payment status updates
- **Secure webhook handling** with signature verification
- **Professional payment pages** that look like real crypto exchanges

### 🎨 **Professional UI/UX**
- **Modern design** with gradient backgrounds and animations
- **Mobile-responsive** design that works on all devices
- **Product showcase** with 6 different digital products
- **Clean checkout flow** from product selection to payment completion

### 🔧 **Developer-Friendly**
- **TypeScript** for type safety and better development experience
- **Modular architecture** with reusable components
- **Comprehensive error handling** with user-friendly messages
- **Easy configuration** with environment variables

## 🎯 Perfect For

- **YouTube tutorials** on crypto payment integration
- **Learning projects** for understanding blockchain payments
- **Startup MVPs** that need crypto payment functionality
- **E-commerce sites** selling digital products
- **SaaS applications** with subscription models

## 🚀 Quick Start (Simulation Mode)

### 1. Clone & Install
```bash
git clone https://github.com/zainulabedeen123/cryptomus.git
cd cryptomus
npm install
```

### 2. Set Up Environment
```bash
cp .env.example .env.local
```

### 3. Configure Simulation Mode
```env
# Edit .env.local - Start with simulation mode for testing
SIMULATION_MODE=true
NEXT_PUBLIC_APP_URL=http://localhost:3000

# No other credentials needed for simulation!
```

### 4. Run the Application
```bash
npm run dev
```

### 5. Test the Demo
- Visit `http://localhost:3000`
- Browse the product showcase
- Click "Pay with Crypto" on any product
- Use simulation controls to test success/failure scenarios

## 📋 Complete Setup Guide

### Option 1: Simulation Mode (Recommended for Learning)

**Perfect for:** Learning, testing, YouTube tutorials, development

#### Step 1: Clone the Repository
```bash
git clone https://github.com/zainulabedeen123/cryptomus.git
cd cryptomus
```

#### Step 2: Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

#### Step 3: Set Up Environment Variables
```bash
cp .env.example .env.local
```

#### Step 4: Configure Simulation Mode
Edit `.env.local` file:
```env
# =============================================================================
# SIMULATION MODE CONFIGURATION (No API keys needed!)
# =============================================================================
SIMULATION_MODE=true
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

#### Step 5: Start Development Server
```bash
npm run dev
```

#### Step 6: Explore the Application
- **Landing Page**: `http://localhost:3000`
- **Product Showcase**: Browse 6 different digital products
- **Payment Simulation**: Click "Pay with Crypto" on any product
- **Test Controls**: Use simulation buttons to test success/failure

### Option 2: Production Mode (Real Payments)

**Perfect for:** Live applications, real business use

**⚠️ Important:** You need an approved Cryptomus merchant account for production mode.

#### Step 1: Create Cryptomus Account

1. **Visit Cryptomus**: Go to [https://app.cryptomus.com/](https://app.cryptomus.com/)
2. **Sign Up**: Create a new account
3. **Verify Email**: Check your email and verify your account
4. **Complete KYC**: Submit required documents for verification
5. **Wait for Approval**: Merchant account approval can take 1-3 business days

#### Step 2: Get API Credentials

Once your account is approved:

1. **Login to Dashboard**: [https://app.cryptomus.com/](https://app.cryptomus.com/)
2. **Navigate to API Settings**:
   - Click on your profile/settings
   - Go to **Settings** → **API**
3. **Generate Payment API Key**:
   - Look for "Payment API" section
   - Click "Generate API Key"
   - **Copy and save this key securely**
4. **Get Merchant UUID**:
   - In the same API settings page
   - Look for "Merchant ID" or "Merchant UUID"
   - **Copy this UUID**
5. **Set Webhook Secret** (Optional but recommended):
   - Generate a random string for webhook security
   - Example: `webhook_secret_2024_secure_key`

#### Step 3: Configure Production Environment

Edit `.env.local` file:
```env
# =============================================================================
# PRODUCTION MODE CONFIGURATION
# =============================================================================
SIMULATION_MODE=false

# CRYPTOMUS API CREDENTIALS (Get from https://app.cryptomus.com/)
CRYPTOMUS_API_KEY=your-actual-payment-api-key-here
CRYPTOMUS_MERCHANT_UUID=your-actual-merchant-uuid-here
CRYPTOMUS_API_BASE_URL=https://api.cryptomus.com

# WEBHOOK CONFIGURATION
CRYPTOMUS_WEBHOOK_SECRET=your-webhook-secret-here

# APPLICATION CONFIGURATION
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

#### Step 4: Test Production Mode

1. **Start the application**: `npm run dev`
2. **Create a test payment**: Use small amounts for testing
3. **Monitor webhook calls**: Check your application logs
4. **Verify payments**: Confirm payments in Cryptomus dashboard

## 🔑 API Credentials Guide

### Where to Find Your Credentials

#### 1. Payment API Key
- **Location**: Cryptomus Dashboard → Settings → API → Payment API
- **Purpose**: Used for creating payment invoices and API authentication
- **Format**: Long alphanumeric string (e.g., `Gg2WrXYX8O1t7QpdXyljRVvMMk83IQq9...`)
- **Security**: Keep this secret, never commit to version control

#### 2. Merchant UUID
- **Location**: Cryptomus Dashboard → Settings → API → Merchant Information
- **Purpose**: Identifies your merchant account in API requests
- **Format**: UUID format (e.g., `73fd3bcb-6a30-4d32-9fc4-cfac51c9b1cc`)
- **Note**: Different from API key, both are required

#### 3. Webhook Secret (Optional)
- **Location**: You generate this yourself
- **Purpose**: Secures webhook communications
- **Format**: Any secure random string
- **Recommendation**: Use a password generator for security

### API Key Types in Cryptomus

Cryptomus has different API keys for different purposes:

1. **Payment API Key** ✅ (What you need)
   - For accepting cryptocurrency payments
   - Used in this template

2. **Payout API Key** ❌ (Not needed)
   - For sending cryptocurrency payments
   - Not used in this template

3. **Exchange API Key** ❌ (Not needed)
   - For trading cryptocurrencies
   - Not used in this template

**Make sure you're using the Payment API Key!**

## 🌟 Supported Cryptocurrencies

| Currency | Symbol | Networks |
|----------|--------|----------|
| Bitcoin | BTC | Native |
| Ethereum | ETH | Native |
| Tether | USDT | Ethereum, Tron, BSC |
| USD Coin | USDC | Ethereum, Polygon, BSC |
| Litecoin | LTC | Native |
| Bitcoin Cash | BCH | Native |
| Ripple | XRP | Native |
| Cardano | ADA | Native |
| Polkadot | DOT | Native |
| Chainlink | LINK | Ethereum |
| Binance Coin | BNB | BSC |
| Solana | SOL | Native |
| Polygon | MATIC | Polygon |
| Avalanche | AVAX | Avalanche |
| Tron | TRX | Tron |
| Dogecoin | DOGE | Native |

## 📦 What's Included

### 🏪 **Product Showcase**
- **6 different digital products** with various cryptocurrencies
- **Professional product cards** with features and pricing
- **Individual checkout pages** for each product
- **Responsive grid layout** that looks great on all devices

### 💰 **Payment Processing**
- **Complete payment flow** from product selection to confirmation
- **Real-time status updates** with countdown timers
- **Professional payment pages** with QR codes and copy buttons
- **Success and failure handling** with appropriate redirects

### 🎨 **UI Components**
- **Hero section** with call-to-action buttons
- **Features grid** showcasing payment gateway benefits
- **Product cards** with hover effects and animations
- **Payment forms** with validation and error handling
- **Status pages** for success, failure, and loading states

### 🔧 **Technical Features**
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Next.js 15** with App Router
- **React 19** with modern hooks
- **Webhook handling** with signature verification
- **Environment-based configuration**

## 🏗 Project Structure

```
src/
├── app/
│   ├── api/cryptomus/          # Payment API endpoints
│   │   ├── create-payment/     # Invoice creation
│   │   ├── webhook/            # Payment notifications
│   │   └── payment-status/     # Status checking
│   ├── checkout/[productId]/   # Product checkout pages
│   ├── simulate/payment/       # Simulation payment pages
│   ├── payment-success/        # Success page
│   ├── payment-failed/         # Failure page
│   └── page.tsx               # Landing page
├── components/                 # Reusable UI components
│   ├── HeroSection.tsx        # Landing page hero
│   ├── FeaturesSection.tsx    # Features showcase
│   ├── ProductCard.tsx        # Product display cards
│   ├── PaymentForm.tsx        # Payment form component
│   └── PaymentStatus.tsx      # Status display
├── lib/cryptomus/             # Cryptomus integration
│   ├── client.ts              # API client with simulation
│   ├── simulation.ts          # Mock payment system
│   ├── types.ts               # TypeScript definitions
│   ├── utils.ts               # Helper functions
│   └── constants.ts           # API endpoints
└── styles/                    # Global styles
```

## 🔒 Security Features

- ✅ **Webhook signature verification** prevents tampering
- ✅ **Environment variable validation** ensures proper setup
- ✅ **Input sanitization** protects against injection attacks
- ✅ **HTTPS enforcement** in production environments
- ✅ **Error handling** prevents information leakage

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Docker
```bash
docker build -t cryptomus-gateway .
docker run -p 3000:3000 cryptomus-gateway
```

### Traditional Hosting
```bash
npm run build
npm start
```

## 🛠 Troubleshooting

### Common Issues

#### 1. "Merchant UUID not set" Error
- **Cause**: Missing or incorrect merchant UUID in production mode
- **Solution**: Ensure `SIMULATION_MODE=false` and valid `CRYPTOMUS_MERCHANT_UUID`

#### 2. "Authentication Failed" Error
- **Cause**: Invalid API key or merchant UUID
- **Solution**: Double-check credentials from Cryptomus dashboard

#### 3. Webhook Not Receiving
- **Cause**: Incorrect webhook URL or firewall blocking
- **Solution**: Ensure `NEXT_PUBLIC_APP_URL` is accessible from internet

#### 4. Payment Page Not Loading
- **Cause**: Network issues or invalid payment data
- **Solution**: Check browser console for errors and verify payment amounts

### Getting Help

1. **Check the logs**: Look at browser console and server logs
2. **Verify environment**: Ensure all required variables are set
3. **Test simulation**: Always test with simulation mode first
4. **Contact support**: Reach out to Cryptomus support for API issues

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - feel free to use this template for your projects!

## 🙏 Acknowledgments

- **[Cryptomus](https://cryptomus.com/)** for the excellent payment gateway API
- **[Next.js](https://nextjs.org/)** for the amazing React framework
- **[Tailwind CSS](https://tailwindcss.com/)** for the utility-first CSS framework
- **YouTube Community** for inspiration and feedback

---

**Ready to accept crypto payments? Start with simulation mode and switch to production when your merchant account is approved!** 🚀

## 📞 Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/zainulabedeen123/cryptomus/issues)
- **Cryptomus Documentation**: [Official API docs](https://doc.cryptomus.com/)
- **YouTube Channel**: Subscribe for tutorials and updates
