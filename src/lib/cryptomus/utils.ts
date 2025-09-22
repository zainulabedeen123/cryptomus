import { createHash } from 'crypto';

/**
 * Generate MD5 signature for Cryptomus API requests
 * @param data - Request body data
 * @param apiKey - Cryptomus API key
 * @returns MD5 hash signature
 */
export function generateSignature(data: any, apiKey: string): string {
  const jsonData = JSON.stringify(data);
  const base64Data = Buffer.from(jsonData).toString('base64');
  return createHash('md5').update(base64Data + apiKey).digest('hex');
}

/**
 * Generate signature for empty request body
 * @param apiKey - Cryptomus API key
 * @returns MD5 hash signature for empty body
 */
export function generateEmptySignature(apiKey: string): string {
  const base64Data = Buffer.from('').toString('base64');
  return createHash('md5').update(base64Data + apiKey).digest('hex');
}

/**
 * Verify webhook signature
 * @param webhookData - Webhook payload data
 * @param apiKey - Cryptomus API key
 * @returns boolean indicating if signature is valid
 */
export function verifyWebhookSignature(webhookData: any, apiKey: string): boolean {
  const { sign, ...dataWithoutSign } = webhookData;
  
  // Generate signature from data without the sign field
  const expectedSignature = generateSignature(dataWithoutSign, apiKey);
  
  return sign === expectedSignature;
}

/**
 * Generate unique order ID
 * @param prefix - Optional prefix for the order ID
 * @returns Unique order ID string
 */
export function generateOrderId(prefix: string = 'order'): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `${prefix}_${timestamp}_${random}`;
}

/**
 * Format amount to string with proper decimal places
 * @param amount - Amount as number
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted amount string
 */
export function formatAmount(amount: number, decimals: number = 2): string {
  return amount.toFixed(decimals);
}

/**
 * Validate email format
 * @param email - Email string to validate
 * @returns boolean indicating if email is valid
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Convert timestamp to readable date
 * @param timestamp - Unix timestamp
 * @returns Formatted date string
 */
export function formatTimestamp(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleString();
}

/**
 * Get payment status display text
 * @param status - Payment status
 * @returns Human-readable status text
 */
export function getPaymentStatusText(status: string): string {
  const statusMap: Record<string, string> = {
    'check': 'Pending',
    'confirm_check': 'Confirming',
    'paid': 'Paid',
    'paid_over': 'Overpaid',
    'fail': 'Failed',
    'wrong_amount': 'Wrong Amount',
    'cancel': 'Cancelled',
    'system_fail': 'System Error',
    'refund_process': 'Refunding',
    'refund_fail': 'Refund Failed',
    'refund_paid': 'Refunded'
  };
  
  return statusMap[status] || status;
}

/**
 * Get payment status color for UI
 * @param status - Payment status
 * @returns CSS color class or hex color
 */
export function getPaymentStatusColor(status: string): string {
  const colorMap: Record<string, string> = {
    'check': 'text-yellow-600',
    'confirm_check': 'text-blue-600',
    'paid': 'text-green-600',
    'paid_over': 'text-green-500',
    'fail': 'text-red-600',
    'wrong_amount': 'text-orange-600',
    'cancel': 'text-gray-600',
    'system_fail': 'text-red-700',
    'refund_process': 'text-purple-600',
    'refund_fail': 'text-red-500',
    'refund_paid': 'text-blue-500'
  };
  
  return colorMap[status] || 'text-gray-500';
}
