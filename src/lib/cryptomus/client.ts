import {
  CryptomusConfig,
  CreateInvoiceRequest,
  CreateInvoiceResponse,
  Invoice,
  CryptomusError
} from './types';
import { generateSignature, generateEmptySignature } from './utils';
import { CRYPTOMUS_ENDPOINTS } from './constants';
import { createMockInvoice, isSimulationMode } from './simulation';

export class CryptomusClient {
  private config: CryptomusConfig;

  constructor(config: CryptomusConfig) {
    this.config = config;
  }

  /**
   * Make authenticated request to Cryptomus API
   */
  private async makeRequest<T>(
    endpoint: string,
    method: 'GET' | 'POST' = 'POST',
    data?: any
  ): Promise<T> {
    const url = `${this.config.baseUrl}${endpoint}`;
    
    // Generate signature
    const signature = data
      ? generateSignature(data, this.config.apiKey)
      : generateEmptySignature(this.config.apiKey);



    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'merchant': this.config.merchantUuid,
      'sign': signature,
    };

    const requestOptions: RequestInit = {
      method,
      headers,
    };

    if (data && method === 'POST') {
      requestOptions.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(url, requestOptions);
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      // Check if API returned an error
      if (responseData.state !== 0) {
        const error: CryptomusError = {
          state: responseData.state,
          message: responseData.message || 'Unknown error',
          errors: responseData.errors
        };
        throw error;
      }

      return responseData;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Unknown error occurred');
    }
  }

  /**
   * Create a new payment invoice
   */
  async createInvoice(request: CreateInvoiceRequest): Promise<Invoice> {
    // Use simulation mode if enabled
    if (isSimulationMode()) {
      console.log('🎭 SIMULATION MODE: Creating mock invoice');
      return createMockInvoice(request);
    }

    const response = await this.makeRequest<CreateInvoiceResponse>(
      CRYPTOMUS_ENDPOINTS.CREATE_PAYMENT,
      'POST',
      request
    );

    if (!response.result) {
      throw new Error('No invoice data in response');
    }

    return response.result;
  }

  /**
   * Get payment information by UUID or order_id
   */
  async getPaymentInfo(uuid?: string, orderId?: string): Promise<Invoice> {
    if (!uuid && !orderId) {
      throw new Error('Either uuid or orderId must be provided');
    }

    const data: any = {};
    if (uuid) data.uuid = uuid;
    if (orderId) data.order_id = orderId;

    const response = await this.makeRequest<CreateInvoiceResponse>(
      CRYPTOMUS_ENDPOINTS.PAYMENT_INFO,
      'POST',
      data
    );

    if (!response.result) {
      throw new Error('No payment data in response');
    }

    return response.result;
  }

  /**
   * Get list of available payment services
   */
  async getPaymentServices(): Promise<any> {
    const response = await this.makeRequest<any>(
      CRYPTOMUS_ENDPOINTS.PAYMENT_SERVICES,
      'POST',
      {}
    );

    return response.result;
  }

  /**
   * Get payment history
   */
  async getPaymentHistory(params?: {
    dateFrom?: string;
    dateTo?: string;
    cursor?: string;
  }): Promise<any> {
    const response = await this.makeRequest<any>(
      CRYPTOMUS_ENDPOINTS.PAYMENT_HISTORY,
      'POST',
      params || {}
    );

    return response.result;
  }

  /**
   * Resend webhook for a payment
   */
  async resendWebhook(uuid?: string, orderId?: string): Promise<any> {
    if (!uuid && !orderId) {
      throw new Error('Either uuid or orderId must be provided');
    }

    const data: any = {};
    if (uuid) data.uuid = uuid;
    if (orderId) data.order_id = orderId;

    const response = await this.makeRequest<any>(
      CRYPTOMUS_ENDPOINTS.RESEND_WEBHOOK,
      'POST',
      data
    );

    return response.result;
  }

  /**
   * Test webhook functionality
   */
  async testWebhook(uuid?: string, orderId?: string): Promise<any> {
    const data: any = {};
    if (uuid) data.uuid = uuid;
    if (orderId) data.order_id = orderId;

    const response = await this.makeRequest<any>(
      CRYPTOMUS_ENDPOINTS.TEST_WEBHOOK,
      'POST',
      data
    );

    return response.result;
  }
}

// Create singleton instance
let cryptomusClient: CryptomusClient | null = null;

export function getCryptomusClient(): CryptomusClient {
  if (!cryptomusClient) {
    // Check if simulation mode is enabled
    if (isSimulationMode()) {
      console.log('🎭 SIMULATION MODE: Using mock configuration');
      const config: CryptomusConfig = {
        apiKey: 'simulation-api-key',
        merchantUuid: 'simulation-merchant-uuid',
        baseUrl: 'https://api.cryptomus.com',
      };
      cryptomusClient = new CryptomusClient(config);
    } else {
      const config: CryptomusConfig = {
        apiKey: process.env.CRYPTOMUS_API_KEY!,
        merchantUuid: process.env.CRYPTOMUS_MERCHANT_UUID!,
        baseUrl: process.env.CRYPTOMUS_API_BASE_URL || 'https://api.cryptomus.com',
      };

      // Detailed validation with specific error messages for production mode
      if (!config.apiKey || config.apiKey === 'your-payment-api-key-here') {
        throw new Error('CRYPTOMUS_API_KEY is not set or still using placeholder value. Please get your Payment API Key from Cryptomus dashboard → Settings → API');
      }

      if (!config.merchantUuid || config.merchantUuid === 'your-merchant-id-here' || config.merchantUuid === 'your-merchant-uuid-here') {
        throw new Error('CRYPTOMUS_MERCHANT_UUID is not set or still using placeholder value. Please get your Merchant ID from Cryptomus dashboard → Settings → API');
      }

      cryptomusClient = new CryptomusClient(config);
    }
  }

  return cryptomusClient;
}
