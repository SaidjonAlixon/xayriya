import { getDictionary } from "./dictionaries";
import { LanguageSwitcher } from "./components/language-switcher";
import { DonationForm } from "./components/donation-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart, Users, Church, Phone, Mail, MapPin, Clock } from "lucide-react";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: "en" | "uz" | "ru" }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/15 backdrop-blur-sm z-50 text-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-end gap-2">
            <Church className="h-8 w-8 text-white" />
            <span className="text-xl font-bold">Panteleymon</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <Link
              href={`/${lang}#home`}
              className="hover:text-blue-600 transition-colors"
            >
              {dict.nav.home}
            </Link>
            <Link
              href={`/${lang}#about`}
              className="hover:text-blue-600 transition-colors"
            >
              {dict.nav.about}
            </Link>
            <Link
              href={`/${lang}#donate`}
              className="hover:text-blue-600 transition-colors"
            >
              {dict.nav.donate}
            </Link>
            <Link
              href={`/${lang}#contact`}
              className="hover:text-blue-600 transition-colors"
            >
              {dict.nav.contact}
            </Link>
          </div>
          <LanguageSwitcher currentLang={lang} />
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800 hero-slideshow"
      >
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            {dict.hero.title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            {dict.hero.subtitle}
          </p>
          <Button size="lg" className="text-lg px-8 py-4" asChild>
            <Link href={`/${lang}#donate`}>{dict.hero.cta}</Link>
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">{dict.about.title}</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              {dict.about.description}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center shadow-xl">
              <CardHeader>
                <Heart className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>{dict.about.values.faith}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {dict.about.values.faithDesc}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center shadow-xl">
              <CardHeader>
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>{dict.about.values.service}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {dict.about.values.serviceDesc}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center shadow-xl">
              <CardHeader>
                <Church className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>{dict.about.values.love}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {dict.about.values.loveDesc}
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* Image Gallery */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="aspect-video rounded-lg overflow-hidden">
              <img
                src="/4.png"
                alt="Additional image"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-video rounded-lg overflow-hidden">
              <img
                src="/2.png"
                alt="Church choir"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-video rounded-lg overflow-hidden">
              <img
                src="/3.png"
                alt="Community outreach"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Donation Section */}
      <section id="donate" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-6">{dict.donation.title}</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {dict.donation.description}
              </p>
            </div>
            <DonationForm dict={dict} />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">
              {dict.contact.title}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    {dict.contact.addressTitle}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{dict.footer.address}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    {dict.contact.phoneTitle}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{dict.footer.phone}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    {dict.contact.emailTitle}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{dict.footer.email}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    {dict.contact.serviceTimesTitle}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{dict.footer.hours}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Church className="h-8 w-8" />
            <span className="text-2xl font-bold">Panteleymon</span>
          </div>
          <p className="text-gray-400 mb-4">{dict.footer.address}</p>
          <p className="text-gray-400">
            {dict.footer.phone} | {dict.footer.email}
          </p>
        </div>
        <div className="flex items-center justify-center">
          <Link href={"https://t.me/Tilav_web"}>Developer</Link>
        </div>
      </footer>
    </div>
  );
}
