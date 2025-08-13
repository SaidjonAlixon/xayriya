import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, description, currency = "UZS" } = body;

    // Octo Bank API konfiguratsiyasi - to'g'ridan-to'g'ri kod ichida
    const shopId = '41799';
    const secretKey = 'd1d87a99-5eca-409a-bf41-a68d13fb6edd';
    const apiUrl = 'https://secure.octo.uz/prepare_payment';
    const productionUrl = 'https://xayriya.vercel.app';

    // Hozirgi vaqtni olish
    const now = new Date();
    const initTime = now.toISOString().slice(0, 19).replace('T', ' ');

    // Octo Bank API ga so'rov yuborish - haqiqiy format bilan
    const paymentData = {
      octo_shop_id: parseInt(shopId),
      octo_secret: secretKey,
      shop_transaction_id: `hayriya_${Date.now()}`, // Unique transaction ID
      auto_capture: true, // Bir bosqichli to'lov
      init_time: initTime,
      test: false, // Production rejimida ishlash uchun
      user_data: {
        user_id: "Anonymous Donor",
        phone: "998000000000",
        email: "donor@hayriya.uz"
      },
      total_sum: amount,
      currency: currency, // Foydalanuvchi tanlagan valyuta
      description: description,
      basket: [
        {
          position_desc: "Xayriya to'lovi",
          count: 1,
          price: amount,
          spic: "00000000000000000", // Default SPIC
          inn: "000000", // Default INN
          package_code: "0000000", // Default package code
          nds: 0 // NDS yo'q
        }
      ],
      payment_methods: [
        {
          method: "bank_card"
        },
        {
          method: "uzcard"
        },
        {
          method: "humo"
        }
      ],
      tsp_id: 18, // Default TSP ID
      return_url: `${productionUrl}/payment/success`,
      notify_url: `${productionUrl}/api/octo-webhook`,
      language: "uz",
      ttl: 15 // 15 daqiqa
    };

    console.log('Octo Bank API request:', paymentData);

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Octo Bank API error:', response.status, errorText);
      return NextResponse.json(
        { success: false, error: `API xatosi: ${response.status} - ${errorText}` },
        { status: response.status }
      );
    }

    const result = await response.json();
    console.log('Octo Bank API response:', result);
    
    // Octo Bank API response format: { error: 0, data: { octo_pay_url: "..." } }
    if (result.error === 0 && result.data && result.data.octo_pay_url) {
      return NextResponse.json({
        success: true,
        payment_url: result.data.octo_pay_url
      });
    } else if (result.error === 0 && result.octo_pay_url) {
      // Fallback for direct response format
      return NextResponse.json({
        success: true,
        payment_url: result.octo_pay_url
      });
    } else {
      return NextResponse.json({
        success: false,
        error: result.errorMessage || result.errMessage || result.error || 'To\'lov yaratishda xatolik yuz berdi'
      });
    }

  } catch (error) {
    console.error('Octo Bank payment error:', error);
    return NextResponse.json(
      { success: false, error: 'Tizim xatosi yuz berdi' },
      { status: 500 }
    );
  }
}
