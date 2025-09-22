// Cryptomus API Types

export interface CryptomusConfig {
  apiKey: string;
  merchantUuid: string;
  baseUrl: string;
}

export interface CreateInvoiceRequest {
  amount: string;
  currency: string;
  order_id: string;
  network?: string;
  url_return?: string;
  url_success?: string;
  url_callback?: string;
  is_payment_multiple?: boolean;
  lifetime?: number;
  to_currency?: string;
  subtract?: number;
  accuracy_payment_percent?: number;
  additional_data?: string;
  currencies?: Currency[];
  except_currencies?: Currency[];
  course_source?: 'Binance' | 'BinanceP2P' | 'Exmo' | 'Kucoin';
  from_referral_code?: string;
  discount_percent?: number;
  is_refresh?: boolean;
}

export interface Currency {
  currency: string;
  network?: string;
}

export interface CreateInvoiceResponse {
  state: number;
  result?: Invoice;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface Invoice {
  uuid: string;
  order_id: string;
  amount: string;
  payment_amount: string | null;
  payer_amount: string | null;
  discount_percent: number | null;
  discount: string;
  payer_currency: string | null;
  currency: string;
  merchant_amount: string | null;
  network: string | null;
  address: string | null;
  from: string | null;
  txid: string | null;
  payment_status: PaymentStatus;
  url: string;
  expired_at: number;
  status: PaymentStatus;
  is_final: boolean;
  additional_data: string | null;
  created_at: string;
  updated_at: string;
}

export enum PaymentStatus {
  CHECK = 'check',
  CONFIRM_CHECK = 'confirm_check',
  PAID = 'paid',
  PAID_OVER = 'paid_over',
  FAIL = 'fail',
  WRONG_AMOUNT = 'wrong_amount',
  CANCEL = 'cancel',
  SYSTEM_FAIL = 'system_fail',
  REFUND_PROCESS = 'refund_process',
  REFUND_FAIL = 'refund_fail',
  REFUND_PAID = 'refund_paid'
}

export interface WebhookPayload {
  type: 'payment' | 'wallet';
  uuid: string;
  order_id: string;
  amount: string;
  payment_amount: string;
  payment_amount_usd: string;
  merchant_amount: string;
  commission: string;
  is_final: boolean;
  status: PaymentStatus;
  from: string;
  wallet_address_uuid: string | null;
  network: string;
  currency: string;
  payer_currency: string;
  additional_data: string | null;
  convert?: {
    to_currency: string;
    commission: string | null;
    rate: string;
    amount: string;
  };
  txid?: string;
  sign: string;
}

export interface PaymentFormData {
  amount: number;
  currency: string;
  description?: string;
  customerEmail?: string;
}

export interface CryptomusError {
  state: number;
  message: string;
  errors?: Record<string, string[]>;
}
