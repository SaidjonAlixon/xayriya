# Octo Bank To'lov Tizimi O'rnatish

## 🎯 Hozirgi Holat

✅ **Barcha konfiguratsiya kod ichida** - Environment fayl kerak emas
✅ **Production rejimida ishlaydi** - `test: false` parametri bilan
✅ **API route tayyor** - `/api/octo-payment` endpoint
✅ **CORS muammosi yo'q** - "Failed to fetch" xatosi hal qilindi
✅ **Production URL lar** - To'g'ridan-to'g'ri kod ichida
✅ **Valyuta tanlash** - UZS, USD, EURO orasida tanlash mumkin

## 🔧 Konfiguratsiya

Barcha Octo Bank API kalitlari va URL lar to'g'ridan-to'g'ri kod ichida:

```typescript
// app/api/octo-payment/route.ts
const shopId = '41799';
const secretKey = 'd1d87a99-5eca-409a-bf41-a68d13fb6edd';
const apiUrl = 'https://secure.octo.uz/prepare_payment';
const productionUrl = 'https://xayriya.vercel.app';
```

```typescript
// lib/octo-payment.ts
this.shopId = '41799';
this.secretKey = 'd1d87a99-5eca-409a-bf41-a68d13fb6edd';
this.apiUrl = 'https://secure.octo.uz/prepare_payment';
```

## 💱 Valyuta Tanlash

Foydalanuvchilar quyidagi valyutalarda to'lov qilishlari mumkin:

- **UZS** - O'zbek so'mi (so'm)
- **USD** - Amerika dollari ($)
- **EURO** - Yevro (€)

### Valyuta tanlash interfeysi:
- Summa kiritish maydoni
- Valyuta tanlash dropdown
- Valyuta nomi va belgisi ko'rsatiladi

## 🚀 Serverga Qo'yish

### 1. Git ga push qilish
```bash
git add .
git commit -m "Currency selection feature added - UZS, USD, EURO support"
git push origin main
```

### 2. Vercel da (avtomatik):
- Git push qilingandan keyin Vercel avtomatik deploy qiladi
- Environment variables o'rnatish shart emas

### 3. Boshqa hosting da:
```bash
git pull origin main
npm install
npm run build
npm run start
```

## API Route

✅ **CORS muammosi hal qilindi** - `/api/octo-payment` route orqali
✅ **Server-side API calls** - Octo Bank API ga to'g'ridan-to'g'ri so'rov yuboriladi
✅ **Xavfsizlik** - Secret key faqat server tomonida ishlatiladi
✅ **Haqiqiy API format** - Octo Bank spetsifikatsiyasiga mos
✅ **Valyuta qo'llab-quvvatlash** - UZS, USD, EURO

## Octo Bank API Spetsifikatsiyasi

**Endpoint**: `https://secure.octo.uz/prepare_payment`
**Method**: POST
**Content-Type**: application/json

**Asosiy parametrlar**:
- `octo_shop_id`: 41799
- `octo_secret`: d1d87a99-5eca-409a-bf41-a68d13fb6edd
- `shop_transaction_id`: Unique transaction ID
- `auto_capture`: true (bir bosqichli to'lov)
- `test`: false (production rejimida)
- `total_sum`: To'lov summasini
- `currency`: Foydalanuvchi tanlagan valyuta (UZS, USD, EURO)
- `description`: To'lov tavsifi
- `payment_methods`: ["bank_card", "uzcard", "humo"]

## API Endpoint

- **Local API**: `/api/octo-payment` (CORS muammosini hal qiladi)
- **External API**: `https://secure.octo.uz/prepare_payment` (Octo Bank)

## Xatoliklar

Agar xatolik yuz bersa, console da xatolik ma'lumotlari ko'rsatiladi.

## 🔒 Xavfsizlik

- Secret key faqat server tomonida ishlatiladi
- Client kodida secret key ko'rsatilmaydi
- API so'rovlari server-side route orqali amalga oshiriladi
- Valyuta tanlash client tomonida amalga oshiriladi
