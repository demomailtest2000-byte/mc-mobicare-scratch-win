import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const p = new PrismaClient();
const rules = [
  ['PRICE_0', '₹0 – ₹19,999', 'Sipper Bottle'],
  ['PRICE_1', '₹20,000 – ₹29,999', 'Buds'],
  ['PRICE_2', '₹30,000 – ₹44,999', 'Backpack + Chopper'],
  ['PRICE_3', '₹45,000 – ₹59,999', 'Bluetooth Speaker + Backpack + Sipper Bottle'],
  ['PRICE_4', '₹60,000 and above', 'Tumbler + Sipper Bottle + Chopper + Sling Bag + Bluetooth Speaker'],
  ['MOBILE_PRICE_0', 'OPPO/vivo/Samsung/Redmi ₹0 – ₹19,999', 'Earbuds + Sling Bag'],
  ['MOBILE_PRICE_1', 'OPPO/vivo/Samsung/Redmi ₹20,000 – ₹29,999', '2 Years Warranty + Sling Bag + Earbuds + Cable Protector + 360° Mobile Stand'],
  ['MOBILE_PRICE_2', 'OPPO/vivo/Samsung/Redmi ₹30,000 – ₹44,999', '2 Years Warranty + Sling Bag + Earbuds + Cable Protector + Type-C Earphone + 360° Mobile Stand'],
  ['MOBILE_PRICE_3', 'OPPO/vivo/Samsung/Redmi ₹45,000 – ₹59,999', '2 Years Warranty + Sling Bag + Cable Protector + 360° Mobile Stand + BT Speaker + Noise Smart Watch'],
  ['MOBILE_PRICE_4', 'OPPO/vivo/Samsung/Redmi ₹60,000 and above', '2 Years Warranty + Sling Bag + ANC Earbuds + Cable Protector + Mobile Stand + Kettle + BT Speaker + Noise Smart Watch + 2 Ltr Sipper + Type-C Earphone'],
  ['LED_PRICE_0', 'LED ₹0 – ₹19,999', 'Sling Bag + Gift Set Combo'],
  ['LED_PRICE_1', 'LED ₹20,000 – ₹29,999', 'Sling Bag + Chopper + Gift Set Combo'],
  ['LED_PRICE_2', 'LED ₹30,000 – ₹44,999', 'Sling Bag + Neckband + Bottle Set + 2 Ltr Sipper + Chopper'],
  ['LED_PRICE_3', 'LED ₹45,000 – ₹59,999', 'Sling Bag + Sound Bar + 2 Ltr Sipper + Tumbler'],
  ['LED_PRICE_4', 'LED ₹60,000 and above', 'Sling Bag + Sound Bar + Mobicare Flask + Earbuds + Chopper'],
  ['REFRIGERATOR_PRICE_0', 'Refrigerator ₹0 – ₹19,999', 'Sling Bag + Bottle Set Combo'],
  ['REFRIGERATOR_PRICE_1', 'Refrigerator ₹20,000 – ₹29,999', 'Sling Bag + Chopper + Bottle Set Combo'],
  ['REFRIGERATOR_PRICE_2', 'Refrigerator ₹30,000 – ₹44,999', 'Sling Bag + Bottle Set + 2 Ltr Sipper + Chopper'],
  ['REFRIGERATOR_PRICE_3', 'Refrigerator ₹45,000 – ₹59,999', 'Sling Bag + Earbuds + 2 Ltr Sipper + Flask Bottle'],
  ['REFRIGERATOR_PRICE_4', 'Refrigerator ₹60,000 and above', 'Sling Bag + Mobicare Flask + Earbuds + 2 Ltr Sipper + Chopper'],
  ['WASHING_MACHINE_PRICE_0', 'Washing Machine ₹0 – ₹19,999', 'Sling Bag + Bottle Set Combo'],
  ['WASHING_MACHINE_PRICE_1', 'Washing Machine ₹20,000 – ₹29,999', 'Sling Bag + Chopper + Bottle Set Combo'],
  ['WASHING_MACHINE_PRICE_2', 'Washing Machine ₹30,000 – ₹44,999', 'Sling Bag + Bottle Set + 2 Ltr Sipper + Chopper'],
  ['WASHING_MACHINE_PRICE_3', 'Washing Machine ₹45,000 – ₹59,999', 'Sling Bag + Earbuds + 2 Ltr Sipper + Flask Bottle'],
  ['WASHING_MACHINE_PRICE_4', 'Washing Machine ₹60,000 and above', 'Sling Bag + Mobicare Flask + Earbuds + 2 Ltr Sipper + Chopper'],
  ['INVERTER_PRICE_0', 'Inverter ₹0 – ₹19,999', 'Sling Bag'],
  ['INVERTER_PRICE_1', 'Inverter ₹20,000 – ₹29,999', 'Sling Bag + Bottle Set Combo'],
  ['INVERTER_PRICE_2', 'Inverter ₹30,000 – ₹44,999', 'Sling Bag + Bottle Set + 2 Ltr Sipper + Chopper'],
  ['INVERTER_PRICE_3', 'Inverter ₹45,000 – ₹59,999', 'Sling Bag + Earbuds + 2 Ltr Sipper + Flask Bottle'],
  ['INVERTER_PRICE_4', 'Inverter ₹60,000 and above', 'Sling Bag + Mobicare Flask + Earbuds + 2 Ltr Sipper + Chopper'],
  ['AC_PRICE_0', 'AC ₹0 – ₹19,999', 'Sling Bag'],
  ['AC_PRICE_1', 'AC ₹20,000 – ₹29,999', 'Sling Bag + Bottle Set Combo'],
  ['AC_PRICE_2', 'AC ₹30,000 – ₹44,999', 'Sling Bag + 2 Ltr Sipper + Earbuds'],
  ['AC_PRICE_3', 'AC ₹45,000 – ₹59,999', 'Sling Bag + Earbuds + 2 Ltr Sipper + Flask Bottle'],
  ['AC_PRICE_4', 'AC ₹60,000 and above', 'Sling Bag + Mobicare Flask + Earbuds + 2 Ltr Sipper + Chopper'],
  ['Apple', 'Apple override', 'Kettle + Earbuds + Sling Bag'],
  ['Laptop', 'Laptop override', 'Backpack + Keyboard + Mouse + Laptop Speaker'],
  ['ACCESSORIES', 'Accessories random', 'Sling Bag / 2 Ltr Sipper / Bottle Set / Gift Set'],
] as const;

async function main() {
  const email = process.env.SEED_ADMIN_EMAIL;
  const password = process.env.SEED_ADMIN_PASSWORD;
  if (!email || !password) throw new Error('SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD are required to create the first admin.');
  const passwordHash = await bcrypt.hash(password, 12);
  for (const [key, label, prizeText] of rules) await p.prizeRule.upsert({ where: { key }, update: { label, prizeText }, create: { key, label, prizeText } });
  for (const [key, value] of Object.entries({ campaignStatus: 'active', campaignSubtitle: 'Congratulations! You may have a special gift waiting for you.', instagramUrl: 'https://www.instagram.com/mobicare_palghar?igsi=MWZzbTM3c2dtZmcxcA==', googleReviewUrl: 'https://g.page/r/CTfV1imnMhGiEBE/review', whatsappUrl: 'https://wa.me/917666582848', youtubeUrl: 'https://www.youtube.com/@MOBICAREPALGHAR', facebookUrl: 'https://www.facebook.com/share/19V1BU5E4P/' })) await p.setting.upsert({ where: { key }, update: { value }, create: { key, value } });
  await p.shop.upsert({ where: { shopCode: 'SHOP001' }, update: {}, create: { shopName: 'MC Mobicare', shopCode: 'SHOP001' } });
  await p.admin.upsert({ where: { email }, update: { name: 'Admin', passwordHash }, create: { email, name: 'Admin', passwordHash } });
}

main().finally(() => p.$disconnect());
