# Octo Bank To'lov Tizimi O'rnatish

## Environment Fayl Yaratish

### Development (.env)
Loyiha papkasida `.env` fayl yarating va quyidagi ma'lumotlarni kiriting:

```env
# Octo Bank API Configuration
NEXT_PUBLIC_OCTO_SHOP_ID=41799
OCTO_SECRET=d1d87a99-5eca-409a-bf41-a68d13fb6edd
NEXT_PUBLIC_OCTO_API_URL=https://secure.octo.uz/prepare_payment

# Development URLs
NEXTAUTH_URL=http://localhost:3000
```

### Production (.env.production)
Server uchun `.env.production` fayl yarating:

```env
# Octo Bank API Configuration
NEXT_PUBLIC_OCTO_SHOP_ID=41799
OCTO_SECRET=d1d87a99-5eca-409a-bf41-a68d13fb6edd
NEXT_PUBLIC_OCTO_API_URL=https://secure.octo.uz/prepare_payment

# Production URLs
NEXTAUTH_URL=https://hayriya.uz
VERCEL_URL=https://hayriya.uz
```

## O'zgaruvchilar

- `NEXT_PUBLIC_OCTO_SHOP_ID` - Octo Bank dan olingan shop ID (41799)
- `OCTO_SECRET` - Octo Bank dan olingan secret key
- `NEXT_PUBLIC_OCTO_API_URL` - Octo Bank API manzili (https://secure.octo.uz/prepare_payment)
- `NEXTAUTH_URL` - Production domain manzili
- `VERCEL_URL` - Vercel deployment URL (avtomatik)

## Xavfsizlik

- `OCTO_SECRET` o'zgaruvchisi faqat server tomonida ishlatiladi
- `NEXT_PUBLIC_` prefiksli o'zgaruvchilar client tomonida ham mavjud
- Secret key'ni hech qachon client kodida ko'rsatmang

## API Route

✅ **CORS muammosi hal qilindi** - `/api/octo-payment` route orqali
✅ **Server-side API calls** - Octo Bank API ga to'g'ridan-to'g'ri so'rov yuboriladi
✅ **Xavfsizlik** - Secret key faqat server tomonida ishlatiladi
✅ **Haqiqiy API format** - Octo Bank spetsifikatsiyasiga mos

## Hozirgi Holat

✅ **Production rejimida ishlaydi** - `test: false` parametri bilan
✅ **API route tayyor** - `/api/octo-payment` endpoint
✅ **CORS muammosi yo'q** - "Failed to fetch" xatosi hal qilindi
✅ **Production URL lar** - Environment variable lar bilan

## Serverga Qo'yish

### 1. Git ga push qilish
```bash
git add .
git commit -m "Octo Bank payment system integration completed"
git push origin main
```

### 2. Environment Variables
Server hosting platformasida (Vercel, Netlify, etc.) environment variables ni o'rnating:
- `NEXT_PUBLIC_OCTO_SHOP_ID`
- `OCTO_SECRET`
- `NEXT_PUBLIC_OCTO_API_URL`
- `NEXTAUTH_URL`

### 3. Build va Deploy
```bash
npm run build
npm run start
```

## Octo Bank API Spetsifikatsiyasi

**Endpoint**: `https://secure.octo.uz/prepare_payment`
**Method**: POST
**Content-Type**: application/json

**Asosiy parametrlar**:
- `octo_shop_id`: Shop ID
- `octo_secret`: Secret key
- `shop_transaction_id`: Unique transaction ID
- `auto_capture`: true (bir bosqichli to'lov)
- `test`: false (production rejimida)
- `total_sum`: To'lov summasini
- `currency`: "UZS"
- `description`: To'lov tavsifi
- `payment_methods`: ["bank_card", "uzcard", "humo"]

## API Endpoint

- **Local API**: `/api/octo-payment` (CORS muammosini hal qiladi)
- **External API**: `https://secure.octo.uz/prepare_payment` (Octo Bank)

## Xatoliklar

Agar xatolik yuz bersa, console da xatolik ma'lumotlari ko'rsatiladi.
