import { randomInt } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { entry } from '@/lib/validation';
import { ACCESSORY_GIFTS, ENTRY_LEVEL_GIFTS, keyFor, prizeFor } from '@/lib/prizes';

export async function POST(req: NextRequest) {
  if (!process.env.DATABASE_URL) return NextResponse.json({ error: 'Campaign is temporarily unavailable. Please ask a store team member for assistance.' }, { status: 503 });
  try {
    const data = entry.parse(await req.json());
    const campaign = await prisma.setting.findUnique({ where: { key: 'campaignStatus' } });
    if (campaign?.value === 'disabled') return NextResponse.json({ error: 'Campaign is unavailable' }, { status: 403 });

    const usedInvoice = await prisma.participation.findUnique({ where: { invoiceNumber: data.invoiceNumber } });
    if (usedInvoice) return NextResponse.json({ error: 'This invoice number has already been used for Scratch & Win.', claimId: usedInvoice.claimId }, { status: 409 });

    const shop = data.shopCode ? await prisma.shop.findFirst({ where: { shopCode: data.shopCode, status: true } }) : null;
    if (data.shopCode && !shop) return NextResponse.json({ error: 'Invalid QR/shop' }, { status: 404 });

    let prize: string;
    if (data.brand === 'Accessories') {
      prize = ACCESSORY_GIFTS[randomInt(ACCESSORY_GIFTS.length)];
    } else if (data.brand !== 'Apple' && data.brand !== 'Laptop' && data.priceRange === '₹0 - ₹14,999') {
      prize = ENTRY_LEVEL_GIFTS[randomInt(ENTRY_LEVEL_GIFTS.length)];
    } else {
      const rule = await prisma.prizeRule.findUnique({ where: { key: keyFor(data.brand, data.priceRange) } });
      prize = rule?.active ? rule.prizeText : prizeFor(data.brand, data.priceRange);
    }

    const participation = await prisma.$transaction(async tx => {
      const customer = await tx.customer.create({ data: { name: data.name, phone: data.phone, normalizedPhone: data.phone } });
      const count = await tx.participation.count();
      return tx.participation.create({ data: { claimId: `SW-${new Date().getFullYear()}-${String(count + 1).padStart(6, '0')}`, invoiceNumber: data.invoiceNumber, customerId: customer.id, shopId: shop?.id, brand: data.brand, priceRange: data.priceRange, assignedPrize: prize } });
    });
    return NextResponse.json({ claimId: participation.claimId, prize: participation.assignedPrize }, { status: 201 });
  } catch (error: any) {
    if (error?.code === 'P2002') return NextResponse.json({ error: 'This invoice number has already been used for Scratch & Win.' }, { status: 409 });
    return NextResponse.json({ error: 'Please check your details and try again.' }, { status: 400 });
  }
}
