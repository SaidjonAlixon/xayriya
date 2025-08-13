"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { QrCode, ExternalLink, Heart, Gift, CreditCard, Loader2 } from "lucide-react";
import Image from "next/image";
import Script from "next/script";
import { useState } from "react";
import { octoPaymentService } from "@/lib/octo-payment";

interface DonationFormProps {
  dict: any;
}

export function DonationForm({ dict }: DonationFormProps) {
  const [amount, setAmount] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleDonationClick = (witch: number) => {
    // Replace with your actual donation URL

    if (witch === 1)
      return window.open(
        "https://www.donationalerts.com/r/panteleymon",
        "_blank"
      );
  };

  const handleOctoPayment = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      setError("Iltimos, to'g'ri summa kiriting");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Haqiqiy Octo Bank API bilan ishlash
      const paymentResult = await octoPaymentService.createPayment(
        parseFloat(amount),
        "Xayriya to'lovi - Храм Пантелеймона"
      );

      console.log('Payment result:', paymentResult);

      if (paymentResult.success && paymentResult.payment_url) {
        // To'lov muvaffaqiyatli yaratildi
        console.log('Opening payment URL:', paymentResult.payment_url);
        window.open(paymentResult.payment_url, "_blank");
      } else {
        // Xatolik yuz berdi
        const errorMessage = paymentResult.error || "To'lov yaratishda xatolik yuz berdi";
        console.error('Payment error:', errorMessage);
        setError(errorMessage);
      }
    } catch (error) {
      console.error("Payment error:", error);
      setError("Tizim xatosi yuz berdi. Iltimos, qaytadan urinib ko'ring.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div>
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Image
                width={25}
                height={25}
                src={"/donationalerts.png"}
                alt="qr code"
              />
              {dict.donation.qr1.title}
            </CardTitle>
            <CardDescription className="text-center">
              {dict.donation.qr1.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="w-48 h-48 bg-gray-100 border-gray-300 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <Image
                  width={200}
                  height={200}
                  src={"/1234.jpg"}
                  className="w-full h-full"
                  alt="qr code "
                />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4 text-center">
              {dict.donation.qr1.instruction}
            </p>
            <Button
              onClick={() => handleDonationClick(1)}
              variant="outline"
              size="sm"
              className="mt-4 gap-2 bg-transparent"
            >
              {dict.donation.buttons.openPage}
              <ExternalLink className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
      <div>
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-1">
              <Gift className="h-5 w-5" />
              Stripe To'lov
            </CardTitle>
            <CardDescription className="text-center">
              Xavfsiz va tez to'lov uchun Stripe orqali xayriya qiling
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <Script
              async
              src="https://js.stripe.com/v3/buy-button.js"
            />
            <stripe-buy-button
              buy-button-id="buy_btn_1RtO2FArFhxQwA1HtG74a0QP"
              publishable-key="pk_live_51RtLfsArFhxQwA1HnCjBzDNuB4oz5IQ7EAyd1eriNisbuu3EYIfOIzPoaVDmiynJVRb8ar2lpz2TtvI6AScxRyCa00EFDBXIzn"
            />
          </CardContent>
        </Card>
      </div>
      <div>
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-blue-600" />
              Octo Bank To'lov
            </CardTitle>
            <CardDescription className="text-center">
              Xavfsiz va tez to'lov uchun Octo Bank orqali xayriya qiling
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="w-full space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-sm font-medium">
                  To'lov summasini kiriting (UZS)
                </Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="100000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full"
                  min="1000"
                  step="1000"
                />
              </div>
              
              {error && (
                <div className="text-red-500 text-sm text-center">
                  {error}
                </div>
              )}

              <div className="w-48 h-48 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-lg flex items-center justify-center mx-auto">
                <div className="text-center">
                  <div className="text-4xl mb-2">🏦</div>
                  <div className="text-blue-600 font-semibold text-sm">Octo Bank</div>
                  <div className="text-blue-500 text-xs">To'lov tizimi</div>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground text-center">
                Octo Bank orqali xavfsiz to'lov qilish uchun tugmani bosing
              </p>
              
              <Button
                onClick={handleOctoPayment}
                disabled={isLoading || !amount}
                className="w-full gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                size="lg"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <CreditCard className="h-4 w-4" />
                )}
                {isLoading ? "Yuklanmoqda..." : "To'lash"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
