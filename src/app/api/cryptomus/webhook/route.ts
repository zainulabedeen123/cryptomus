import { NextRequest, NextResponse } from 'next/server';
import { WebhookPayload } from '@/lib/cryptomus/types';
import { verifyWebhookSignature } from '@/lib/cryptomus/utils';
import { WEBHOOK_IP_WHITELIST, SUCCESS_PAYMENT_STATUSES, FAILED_PAYMENT_STATUSES } from '@/lib/cryptomus/constants';

export async function POST(request: NextRequest) {
  try {
    // Get client IP for security check
    const clientIP = request.headers.get('x-forwarded-for') || 
                    request.headers.get('x-real-ip') || 
                    'unknown';

    // Verify IP whitelist (optional - remove if not needed)
    // if (!WEBHOOK_IP_WHITELIST.includes(clientIP)) {
    //   console.warn(`Webhook request from unauthorized IP: ${clientIP}`);
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const webhookData: WebhookPayload = await request.json();
    
    // Verify webhook signature
    const apiKey = process.env.CRYPTOMUS_API_KEY!;
    if (!verifyWebhookSignature(webhookData, apiKey)) {
      console.error('Invalid webhook signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    console.log('Received valid webhook:', {
      type: webhookData.type,
      uuid: webhookData.uuid,
      order_id: webhookData.order_id,
      status: webhookData.status,
      amount: webhookData.amount,
      payment_amount: webhookData.payment_amount,
      currency: webhookData.currency,
      payer_currency: webhookData.payer_currency,
      network: webhookData.network,
      txid: webhookData.txid,
      is_final: webhookData.is_final
    });

    // Process the webhook based on payment status
    await processWebhook(webhookData);

    // Return success response
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

async function processWebhook(webhookData: WebhookPayload) {
  const { status, order_id, uuid, payment_amount, currency, is_final } = webhookData;

  // Log the payment status change
  console.log(`Payment ${order_id} (${uuid}) status changed to: ${status}`);

  if (SUCCESS_PAYMENT_STATUSES.includes(status as any)) {
    // Payment successful
    console.log(`✅ Payment successful: ${order_id}`);
    console.log(`Amount: ${payment_amount} ${currency}`);
    
    // Here you would typically:
    // 1. Update your database with payment confirmation
    // 2. Send confirmation email to customer
    // 3. Fulfill the order/service
    // 4. Update inventory if applicable
    
    await handleSuccessfulPayment(webhookData);
    
  } else if (FAILED_PAYMENT_STATUSES.includes(status as any)) {
    // Payment failed
    console.log(`❌ Payment failed: ${order_id} - Status: ${status}`);
    
    // Here you would typically:
    // 1. Update database with failure status
    // 2. Send failure notification
    // 3. Release any reserved inventory
    
    await handleFailedPayment(webhookData);
    
  } else if (status === 'wrong_amount') {
    // Wrong amount paid
    console.log(`⚠️ Wrong amount paid for: ${order_id}`);
    console.log(`Expected: ${webhookData.amount}, Received: ${payment_amount}`);
    
    await handleWrongAmountPayment(webhookData);
    
  } else {
    // Other status (pending, confirming, etc.)
    console.log(`ℹ️ Payment status update: ${order_id} - ${status}`);
    
    await handlePaymentStatusUpdate(webhookData);
  }

  // If payment is final, perform final cleanup
  if (is_final) {
    console.log(`🏁 Payment finalized: ${order_id}`);
    await handleFinalizedPayment(webhookData);
  }
}

async function handleSuccessfulPayment(webhookData: WebhookPayload) {
  // Implement your success logic here
  // Example: Update database, send emails, fulfill orders
  
  console.log('Processing successful payment...');
  
  // Example database update (replace with your actual database logic)
  // await updatePaymentStatus(webhookData.order_id, 'completed');
  // await fulfillOrder(webhookData.order_id);
  // await sendConfirmationEmail(webhookData);
}

async function handleFailedPayment(webhookData: WebhookPayload) {
  // Implement your failure logic here
  
  console.log('Processing failed payment...');
  
  // Example: Update database, send failure notification
  // await updatePaymentStatus(webhookData.order_id, 'failed');
  // await sendFailureNotification(webhookData);
}

async function handleWrongAmountPayment(webhookData: WebhookPayload) {
  // Handle cases where customer paid wrong amount
  
  console.log('Processing wrong amount payment...');
  
  // You might want to:
  // 1. Check if amount is close enough to accept
  // 2. Offer partial refund
  // 3. Request additional payment
}

async function handlePaymentStatusUpdate(webhookData: WebhookPayload) {
  // Handle intermediate status updates
  
  console.log('Processing payment status update...');
  
  // Update your database with current status
  // await updatePaymentStatus(webhookData.order_id, webhookData.status);
}

async function handleFinalizedPayment(webhookData: WebhookPayload) {
  // Final cleanup when payment is complete
  
  console.log('Processing finalized payment...');
  
  // Perform any final cleanup tasks
  // await finalizeOrder(webhookData.order_id);
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
