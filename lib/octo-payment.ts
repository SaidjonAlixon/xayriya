// Octo Bank Payment Integration
export interface OctoPaymentRequest {
  amount: number;
  currency: string;
  description: string;
  return_url: string;
  cancel_url: string;
  shop_id: string;
}

export interface OctoPaymentResponse {
  success: boolean;
  payment_url?: string;
  error?: string;
}

export class OctoPaymentService {
  private shopId: string;
  private secretKey: string;
  private apiUrl: string;

  constructor() {
    // Octo Bank API konfiguratsiyasi - to'g'ridan-to'g'ri kod ichida
    this.shopId = '41799';
    this.secretKey = 'd1d87a99-5eca-409a-bf41-a68d13fb6edd';
    this.apiUrl = 'https://secure.octo.uz/prepare_payment';
  }

  async createPayment(amount: number, description: string, currency: string = "UZS"): Promise<OctoPaymentResponse> {
    try {
      // Local API route orqali so'rov yuborish (CORS muammosini hal qilish uchun)
      const response = await fetch('/api/octo-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount,
          description: description,
          currency: currency
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success && result.payment_url) {
        return {
          success: true,
          payment_url: result.payment_url
        };
      } else {
        return {
          success: false,
          error: result.error || 'To\'lov yaratishda xatolik yuz berdi'
        };
      }
    } catch (error) {
      console.error('Octo Bank payment error:', error);
      return {
        success: false,
        error: 'Tizim xatosi yuz berdi'
      };
    }
  }

  // Test rejimida ishlash uchun
  async createTestPayment(amount: number, description: string, currency: string = "UZS"): Promise<OctoPaymentResponse> {
    // Test rejimida haqiqiy API ga so'rov yubormasdan, test URL qaytaradi
    const testPaymentUrl = `https://secure.octo.uz/test-payment?amount=${amount}&currency=${currency}&description=${encodeURIComponent(description)}`;
    
    return {
      success: true,
      payment_url: testPaymentUrl
    };
  }
}

// Singleton instance
export const octoPaymentService = new OctoPaymentService();
