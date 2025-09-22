// Cryptomus API Constants

export const CRYPTOMUS_ENDPOINTS = {
  CREATE_PAYMENT: '/v1/payment',
  PAYMENT_INFO: '/v1/payment/info',
  PAYMENT_SERVICES: '/v1/payment/services',
  PAYMENT_HISTORY: '/v1/payment/list',
  RESEND_WEBHOOK: '/v1/payment/resend',
  TEST_WEBHOOK: '/v1/test/webhook/payment',
} as const;

export const SUPPORTED_CURRENCIES = [
  'USD', 'EUR', 'RUB', 'UAH', 'BYN', 'KZT', 'UZS', 'GEL', 'TRY',
  'BTC', 'ETH', 'USDT', 'USDC', 'LTC', 'BCH', 'XRP', 'ADA', 'DOT',
  'LINK', 'BNB', 'SOL', 'MATIC', 'AVAX', 'TRX', 'DOGE', 'SHIB'
] as const;

export const SUPPORTED_NETWORKS = [
  'bitcoin', 'ethereum', 'bsc', 'polygon', 'avalanche', 'tron',
  'arbitrum', 'optimism', 'fantom', 'solana'
] as const;

export const FIAT_CURRENCIES = [
  'USD', 'EUR', 'RUB', 'UAH', 'BYN', 'KZT', 'UZS', 'GEL', 'TRY'
] as const;

export const CRYPTO_CURRENCIES = [
  'BTC', 'ETH', 'USDT', 'USDC', 'LTC', 'BCH', 'XRP', 'ADA', 'DOT',
  'LINK', 'BNB', 'SOL', 'MATIC', 'AVAX', 'TRX', 'DOGE', 'SHIB'
] as const;

export const PAYMENT_STATUSES = {
  CHECK: 'check',
  CONFIRM_CHECK: 'confirm_check',
  PAID: 'paid',
  PAID_OVER: 'paid_over',
  FAIL: 'fail',
  WRONG_AMOUNT: 'wrong_amount',
  CANCEL: 'cancel',
  SYSTEM_FAIL: 'system_fail',
  REFUND_PROCESS: 'refund_process',
  REFUND_FAIL: 'refund_fail',
  REFUND_PAID: 'refund_paid'
} as const;

export const FINAL_PAYMENT_STATUSES = [
  PAYMENT_STATUSES.PAID,
  PAYMENT_STATUSES.PAID_OVER,
  PAYMENT_STATUSES.FAIL,
  PAYMENT_STATUSES.CANCEL,
  PAYMENT_STATUSES.SYSTEM_FAIL,
  PAYMENT_STATUSES.REFUND_PAID
] as const;

export const SUCCESS_PAYMENT_STATUSES = [
  PAYMENT_STATUSES.PAID,
  PAYMENT_STATUSES.PAID_OVER
] as const;

export const FAILED_PAYMENT_STATUSES = [
  PAYMENT_STATUSES.FAIL,
  PAYMENT_STATUSES.CANCEL,
  PAYMENT_STATUSES.SYSTEM_FAIL
] as const;

export const DEFAULT_PAYMENT_LIFETIME = 3600; // 1 hour in seconds
export const MIN_PAYMENT_LIFETIME = 300; // 5 minutes
export const MAX_PAYMENT_LIFETIME = 43200; // 12 hours

export const WEBHOOK_IP_WHITELIST = ['91.227.144.54'];

export const COURSE_SOURCES = [
  'Binance',
  'BinanceP2P', 
  'Exmo',
  'Kucoin'
] as const;
