-- Preserve prior entries while enforcing unique invoice numbers for every new entry.
ALTER TABLE "Participation" ADD COLUMN "invoiceNumber" TEXT;
UPDATE "Participation" SET "invoiceNumber" = 'LEGACY-' || "id" WHERE "invoiceNumber" IS NULL;
ALTER TABLE "Participation" ALTER COLUMN "invoiceNumber" SET NOT NULL;
CREATE UNIQUE INDEX "Participation_invoiceNumber_key" ON "Participation"("invoiceNumber");
