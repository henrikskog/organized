import { prisma } from '../../../../backend/prisma/utils/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query as { id: string }

  try {
    const tags = await prisma.tag.findMany({ where: { categoryId: Number(id) } })
    res.json({ data: tags })
  } catch (e) {
    res.status(400).json({ error: (e as Error).message })
  }
}

export default handler
