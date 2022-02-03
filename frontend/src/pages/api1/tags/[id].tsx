import { prisma } from '../../../backend/prisma/utils/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query as { id: string }

  try {
    const tag = await prisma.tag.findFirst({ where: { categoryId: Number(id) } })
    res.json({ data: tag })
  } catch (e) {
    res.status(400).json({ error: (e as Error).message })
  }
}

export default handler
