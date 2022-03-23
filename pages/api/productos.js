import { PrismaClient } from "@prisma/client";


export default async function handler(req, res) {
 
  const prisma = new PrismaClient()

  const productos = await prisma.categoria.findMany()

  res.status(200).json(productos);
}
