"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { QrCode, ExternalLink, Heart, Gift } from "lucide-react";
import Image from "next/image";
import Script from "next/script";

interface DonationFormProps {
  dict: any;
}

export function DonationForm({ dict }: DonationFormProps) {
  const handleDonationClick = (witch: number) => {
    // Replace with your actual donation URL

    if (witch === 1)
      return window.open(
        "https://www.donationalerts.com/r/panteleymon",
        "_blank"
      );
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
              buy-button-id="buy_btn_1RtNBVA1kyX8OSOiAi39jNuG"
              publishable-key="pk_test_51RtLg2A1kyX8OSOieBzyPTc2ZjZpYBlwah0KsZKSTBDOv91j8s5EdGZNCGholmTrOFkoCmiXaP9nfDn5j7xJSUwt00M58mcjJX"
            />
          </CardContent>
        </Card>
      </div>
      <div>
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <QrCode className="h-5 w-5" />
              {dict.donation.qr3.title}
            </CardTitle>
            <CardDescription className="text-center">
              {dict.donation.qr3.description}
              <br />
              {dict.donation.qr3.viza_card}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            HU 75117820072122048500000000 SWIFT/BIC UZHOUZ22
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
