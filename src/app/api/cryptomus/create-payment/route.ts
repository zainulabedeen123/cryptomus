import { NextRequest, NextResponse } from 'next/server';
import { getCryptomusClient } from '@/lib/cryptomus/client';
import { CreateInvoiceRequest, PaymentFormData } from '@/lib/cryptomus/types';
import { generateOrderId, formatAmount } from '@/lib/cryptomus/utils';

export async function POST(request: NextRequest) {
  try {
    const body: PaymentFormData = await request.json();
    
    // Validate required fields
    if (!body.amount || !body.currency) {
      return NextResponse.json(
        { error: 'Amount and currency are required' },
        { status: 400 }
      );
    }

    if (body.amount <= 0) {
      return NextResponse.json(
        { error: 'Amount must be greater than 0' },
        { status: 400 }
      );
    }

    const client = getCryptomusClient();
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    
    // Prepare invoice request
    const invoiceRequest: CreateInvoiceRequest = {
      amount: formatAmount(parseFloat(body.amount)),
      currency: body.currency,
      order_id: generateOrderId(),
      url_return: `${baseUrl}/payment`,
      url_success: `${baseUrl}/payment-success`,
      url_callback: `${baseUrl}/api/cryptomus/webhook`,
      is_payment_multiple: true,
      lifetime: 3600, // 1 hour
      additional_data: body.description || null,
    };

    // Create invoice
    const invoice = await client.createInvoice(invoiceRequest);

    return NextResponse.json({
      success: true,
      invoice: {
        uuid: invoice.uuid,
        order_id: invoice.order_id,
        amount: invoice.amount,
        currency: invoice.currency,
        payment_url: invoice.url,
        address: invoice.address,
        network: invoice.network,
        payer_currency: invoice.payer_currency,
        payer_amount: invoice.payer_amount,
        payment_status: invoice.payment_status,
        expired_at: invoice.expired_at,
        created_at: invoice.created_at,
      }
    });

  } catch (error) {
    console.error('Error creating payment:', error);

    // Handle configuration errors
    if (error instanceof Error && error.message.includes('CRYPTOMUS_MERCHANT_UUID')) {
      return NextResponse.json(
        {
          error: 'Configuration Error: Merchant UUID not set',
          details: 'Please update CRYPTOMUS_MERCHANT_UUID in your .env.local file with your actual merchant UUID from Cryptomus dashboard → Settings → API'
        },
        { status: 500 }
      );
    }

    if (error instanceof Error && error.message.includes('CRYPTOMUS_API_KEY')) {
      return NextResponse.json(
        {
          error: 'Configuration Error: API Key not set',
          details: 'Please set CRYPTOMUS_API_KEY in your .env.local file'
        },
        { status: 500 }
      );
    }

    // Handle HTTP errors (like 401 Unauthorized)
    if (error instanceof Error && error.message.includes('HTTP 401')) {
      return NextResponse.json(
        {
          error: 'Authentication Failed',
          details: 'Invalid API credentials. Please check your CRYPTOMUS_API_KEY and CRYPTOMUS_MERCHANT_UUID in .env.local'
        },
        { status: 401 }
      );
    }

    // Handle Cryptomus API errors
    if (error && typeof error === 'object' && 'state' in error) {
      const cryptomusError = error as any;
      return NextResponse.json(
        {
          error: cryptomusError.message || 'Payment creation failed',
          details: cryptomusError.errors
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
