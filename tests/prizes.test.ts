import { expect, it } from 'vitest';
import { ACCESSORY_GIFTS, AC_PRIZES, BRANDS, ENTRY_LEVEL_GIFTS, INVERTER_PRIZES, LED_PRIZES, MOBILE_BRANDS, MOBILE_PRIZES, REFRIGERATOR_PRIZES, WASHING_MACHINE_PRIZES, prizeFor } from '../lib/prizes';

it('applies all requested overrides', () => {
  expect(BRANDS).not.toContain('Appliances');
  expect(BRANDS).not.toContain('Home Theater');
  expect(['LED', 'Refrigerator', 'Washing Machine', 'AC', 'Inverter'].every((brand) => BRANDS.includes(brand as typeof BRANDS[number]))).toBe(true);
  expect(BRANDS).toContain('Others');
  expect(MOBILE_BRANDS).toEqual(['OPPO', 'vivo', 'Samsung', 'Redmi']);
  expect(ENTRY_LEVEL_GIFTS).toEqual(['Sipper Bottle']);
  expect(ACCESSORY_GIFTS).toEqual(['Sling Bag', '2 Ltr Sipper', 'Bottle Set', 'Gift Set']);
  expect(LED_PRIZES['₹0 - ₹19,999']).toBe('Sling Bag + Gift Set Combo');
  expect(REFRIGERATOR_PRIZES['₹60,000 and above']).toContain('Mobicare Flask');
  expect(WASHING_MACHINE_PRIZES).toEqual(REFRIGERATOR_PRIZES);
  expect(INVERTER_PRIZES['₹0 - ₹19,999']).toBe('Sling Bag');
  expect(AC_PRIZES['₹30,000 - ₹44,999']).toBe('Sling Bag + 2 Ltr Sipper + Earbuds');
  expect(prizeFor('LED', '₹0 - ₹19,999')).toBe('Sling Bag + Gift Set Combo');
  expect(prizeFor('Refrigerator', '₹60,000 and above')).toContain('Mobicare Flask');
  expect(prizeFor('Washing Machine', '₹45,000 - ₹59,999')).toContain('Earbuds');
  expect(prizeFor('Inverter', '₹20,000 - ₹29,999')).toBe('Sling Bag + Bottle Set Combo');
  expect(prizeFor('AC', '₹30,000 - ₹44,999')).toContain('Earbuds');
  expect(MOBILE_PRIZES['₹60,000 and above']).toContain('ANC Earbuds');
  expect(prizeFor('OPPO', '₹0 - ₹19,999')).toBe('Earbuds + Sling Bag');
  expect(prizeFor('vivo', '₹20,000 - ₹29,999')).toContain('2 Years Warranty');
  expect(prizeFor('Samsung', '₹45,000 - ₹59,999')).toContain('Noise Smart Watch');
  expect(prizeFor('Redmi', '₹60,000 and above')).toContain('Kettle');
  expect(prizeFor('Apple', '₹60,000 and above')).toBe('Backpack + Chopper');
  expect(prizeFor('Laptop', '₹0 - ₹19,999')).toContain('Keyboard');
});
