export const BRANDS=['OPPO','vivo','Samsung','Redmi','Acer','Apple','Laptop','Appliances'] as const;
export const RANGES=['₹0 - ₹14,999','₹15,000 - ₹24,999','₹25,000 - ₹39,999','₹40,000 - ₹54,999','₹55,000 and above'] as const;
const map:Record<string,string>={'₹0 - ₹14,999':'Sipper Bottle','₹15,000 - ₹24,999':'Tiffin Box + Sipper Bottle','₹25,000 - ₹39,999':'Backpack + Chopper + Tiffin Box','₹40,000 - ₹54,999':'Bluetooth Speaker + Electric Kettle + Backpack + Sipper Bottle','₹55,000 and above':'Tumbler + Sipper Bottle + Chopper + Sling Bag + Bluetooth Speaker'};
export const ENTRY_LEVEL_GIFTS=['Sipper Bottle','Tiffin Box'] as const;
export function prizeFor(brand:string,range:string){return brand==='Apple'?'Backpack + Chopper + Tiffin Box':brand==='Laptop'?'Backpack + Keyboard + Mouse + Laptop Speaker':map[range]}
export function keyFor(brand:string,range:string){if(brand==='Apple'||brand==='Laptop')return brand;return 'PRICE_'+RANGES.indexOf(range as typeof RANGES[number])}
