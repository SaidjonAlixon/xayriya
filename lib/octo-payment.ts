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
    // Bu qiymatlarni .env faylida saqlashingiz kerak
    this.shopId = process.env.NEXT_PUBLIC_OCTO_SHOP_ID || 'your_octo_shop_id';
    this.secretKey = process.env.OCTO_SECRET || 'your_octo_secret';
    this.apiUrl = process.env.NEXT_PUBLIC_OCTO_API_URL || 'https://secure.octo.uz/prepare_payment';
  }

  async createPayment(amount: number, description: string): Promise<OctoPaymentResponse> {
    try {
      // Local API route orqali so'rov yuborish (CORS muammosini hal qilish uchun)
      const response = await fetch('/api/octo-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount,
          description: description
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
  async createTestPayment(amount: number, description: string): Promise<OctoPaymentResponse> {
    // Test rejimida haqiqiy API ga so'rov yubormasdan, test URL qaytaradi
    const testPaymentUrl = `https://secure.octo.uz/test-payment?amount=${amount}&description=${encodeURIComponent(description)}`;
    
    return {
      success: true,
      payment_url: testPaymentUrl
    };
  }
}

// Singleton instance
export const octoPaymentService = new OctoPaymentService();
