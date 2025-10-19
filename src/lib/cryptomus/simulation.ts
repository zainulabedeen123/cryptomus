import { CreateInvoiceRequest, Invoice, PaymentStatus, WebhookPayload } from './types';
import { generateOrderId } from './utils';

/**
 * Mock Cryptomus API for simulation purposes
 * This provides realistic responses for development and testing
 */

// Simulated cryptocurrency addresses for different networks
const MOCK_ADDRESSES = {
  BTC: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
  ETH: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b5',
  USDT: {
    ethereum: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b5',
    tron: 'TQn9Y2khEsLJW1ChVWFMSMeRDow5KcbLSE',
    bsc: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b5'
  },
  USDC: {
    ethereum: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b5',
    polygon: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b5',
    bsc: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b5'
  },
  LTC: 'LTC1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4',
  BCH: 'bitcoincash:qpm2qsznhks23z7629mms6s4cwef74vcwvy22gdx6a',
  XRP: 'rN7n7otQDd6FczFgLdSqtcsAUxDkw6fzRH',
  ADA: 'addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3jcu5d8ps7zex2k2xt3uqxgjqnnj83ws8lhrn648jjxtwq2ytjqp',
  DOT: '1FRMM8PEiWXYax7rpS6X4XZX1aAAxSWx1CrKTyrVYhV24fg',
  LINK: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b5',
  BNB: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b5',
  SOL: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
  MATIC: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b5',
  AVAX: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b5',
  TRX: 'TQn9Y2khEsLJW1ChVWFMSMeRDow5KcbLSE',
  DOGE: 'DH5yaieqoZN36fDVciNyRueRGvGLR3mr7L'
};

// Simulated exchange rates (in USD)
const MOCK_RATES = {
  BTC: 43250.00,
  ETH: 2650.00,
  USDT: 1.00,
  USDC: 1.00,
  LTC: 72.50,
  BCH: 245.00,
  XRP: 0.52,
  ADA: 0.38,
  DOT: 5.85,
  LINK: 14.20,
  BNB: 315.00,
  SOL: 98.50,
  MATIC: 0.85,
  AVAX: 36.50,
  TRX: 0.105,
  DOGE: 0.085
};

/**
 * Get a mock address for a cryptocurrency
 */
function getMockAddress(currency: string, network?: string): string {
  const addresses = MOCK_ADDRESSES[currency as keyof typeof MOCK_ADDRESSES];
  
  if (typeof addresses === 'string') {
    return addresses;
  }
  
  if (typeof addresses === 'object' && network) {
    return addresses[network as keyof typeof addresses] || Object.values(addresses)[0];
  }
  
  if (typeof addresses === 'object') {
    return Object.values(addresses)[0];
  }
  
  // Fallback to Bitcoin address
  return MOCK_ADDRESSES.BTC;
}

/**
 * Convert amount between currencies
 */
function convertAmount(amount: number, fromCurrency: string, toCurrency: string): number {
  if (fromCurrency === toCurrency) return amount;
  
  const fromRate = MOCK_RATES[fromCurrency as keyof typeof MOCK_RATES] || 1;
  const toRate = MOCK_RATES[toCurrency as keyof typeof MOCK_RATES] || 1;
  
  const usdAmount = amount * fromRate;
  return parseFloat((usdAmount / toRate).toFixed(8));
}

/**
 * Generate a mock transaction hash
 */
function generateMockTxHash(): string {
  const chars = '0123456789abcdef';
  let result = '';
  for (let i = 0; i < 64; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Create a mock invoice (simulates Cryptomus createInvoice API)
 */
export function createMockInvoice(request: CreateInvoiceRequest): Invoice {
  const uuid = `sim-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const orderId = request.order_id || generateOrderId();
  
  // Determine the payer currency and amount
  let payerCurrency = request.currency;
  let payerAmount = parseFloat(request.amount);
  
  // If to_currency is specified, convert to that currency
  if (request.to_currency && request.to_currency !== request.currency) {
    payerCurrency = request.to_currency;
    payerAmount = convertAmount(parseFloat(request.amount), request.currency, request.to_currency);
  }
  
  // Get mock address
  const address = getMockAddress(payerCurrency, request.network);
  
  // Calculate merchant amount (what they receive after fees)
  const merchantAmount = payerAmount * 0.995; // Simulate 0.5% fee
  
  const now = new Date();
  const expiredAt = Math.floor((now.getTime() + (request.lifetime || 3600) * 1000) / 1000);
  
  return {
    uuid,
    order_id: orderId,
    amount: request.amount,
    payment_amount: null,
    payer_amount: payerAmount.toFixed(8),
    discount_percent: request.discount_percent || null,
    discount: '0.00000000',
    payer_currency: payerCurrency,
    currency: request.currency,
    merchant_amount: merchantAmount.toFixed(8),
    network: request.network || 'mainnet',
    address,
    from: null,
    txid: null,
    payment_status: PaymentStatus.CHECK,
    status: PaymentStatus.CHECK,
    url: `${process.env.NEXT_PUBLIC_APP_URL}/simulate/payment/${uuid}`,
    expired_at: expiredAt,
    is_final: false,
    additional_data: request.additional_data || null,
    created_at: now.toISOString(),
    updated_at: now.toISOString()
  };
}

/**
 * Simulate payment status updates
 */
export function simulatePaymentUpdate(invoice: Invoice, status: PaymentStatus): Invoice {
  const updatedInvoice = { ...invoice };
  updatedInvoice.payment_status = status;
  updatedInvoice.updated_at = new Date().toISOString();
  
  if (status === PaymentStatus.PAID || status === PaymentStatus.PAID_OVER) {
    updatedInvoice.payment_amount = updatedInvoice.payer_amount;
    updatedInvoice.txid = generateMockTxHash();
    updatedInvoice.from = getMockAddress(updatedInvoice.payer_currency || 'BTC');
    updatedInvoice.is_final = true;
  } else if (status === PaymentStatus.FAIL || status === PaymentStatus.CANCEL) {
    updatedInvoice.is_final = true;
  }
  
  return updatedInvoice;
}

/**
 * Create a mock webhook payload
 */
export function createMockWebhook(invoice: Invoice): WebhookPayload {
  return {
    type: 'payment',
    uuid: invoice.uuid,
    order_id: invoice.order_id,
    amount: invoice.amount,
    payment_amount: invoice.payment_amount || '0',
    payment_amount_usd: '0',
    merchant_amount: invoice.merchant_amount || '0',
    commission: '0',
    is_final: invoice.is_final,
    status: invoice.payment_status,
    from: invoice.from || '',
    wallet_address_uuid: null,
    network: invoice.network || 'mainnet',
    currency: invoice.currency,
    payer_currency: invoice.payer_currency || 'BTC',
    additional_data: invoice.additional_data,
    sign: 'mock-signature'
  };
}

/**
 * Check if simulation mode is enabled
 */
export function isSimulationMode(): boolean {
  return process.env.SIMULATION_MODE === 'true';
}

/**
 * Get simulation status message
 */
export function getSimulationMessage(): string {
  return 'SIMULATION MODE: This is a demo payment. No real cryptocurrency will be transferred.';
}
