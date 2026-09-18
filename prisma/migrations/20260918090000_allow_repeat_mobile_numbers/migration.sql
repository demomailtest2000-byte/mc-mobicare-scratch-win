-- An invoice is the sole participation key. Customers may use different invoices with the same mobile number.
DROP INDEX IF EXISTS "Customer_normalizedPhone_key";
CREATE INDEX IF NOT EXISTS "Customer_normalizedPhone_idx" ON "Customer"("normalizedPhone");
