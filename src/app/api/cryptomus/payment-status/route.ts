import { NextRequest, NextResponse } from 'next/server';
import { getCryptomusClient } from '@/lib/cryptomus/client';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const uuid = searchParams.get('uuid');
    const orderId = searchParams.get('order_id');

    if (!uuid && !orderId) {
      return NextResponse.json(
        { error: 'Either uuid or order_id parameter is required' },
        { status: 400 }
      );
    }

    const client = getCryptomusClient();
    const paymentInfo = await client.getPaymentInfo(uuid || undefined, orderId || undefined);

    return NextResponse.json({
      success: true,
      payment: {
        uuid: paymentInfo.uuid,
        order_id: paymentInfo.order_id,
        amount: paymentInfo.amount,
        payment_amount: paymentInfo.payment_amount,
        payer_amount: paymentInfo.payer_amount,
        currency: paymentInfo.currency,
        payer_currency: paymentInfo.payer_currency,
        merchant_amount: paymentInfo.merchant_amount,
        network: paymentInfo.network,
        address: paymentInfo.address,
        from: paymentInfo.from,
        txid: paymentInfo.txid,
        payment_status: paymentInfo.payment_status,
        status: paymentInfo.status,
        url: paymentInfo.url,
        expired_at: paymentInfo.expired_at,
        is_final: paymentInfo.is_final,
        additional_data: paymentInfo.additional_data,
        created_at: paymentInfo.created_at,
        updated_at: paymentInfo.updated_at,
      }
    });

  } catch (error) {
    console.error('Error fetching payment status:', error);
    
    // Handle Cryptomus API errors
    if (error && typeof error === 'object' && 'state' in error) {
      const cryptomusError = error as any;
      return NextResponse.json(
        { 
          error: cryptomusError.message || 'Failed to fetch payment status',
          details: cryptomusError.errors 
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
