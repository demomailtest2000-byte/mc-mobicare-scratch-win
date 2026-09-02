import {PrismaClient}from'@prisma/client';const g=globalThis as unknown as {p?:PrismaClient};export const prisma=g.p??new PrismaClient();if(process.env.NODE_ENV!=='production')g.p=prisma;
