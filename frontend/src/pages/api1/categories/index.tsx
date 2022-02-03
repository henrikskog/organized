import { prisma } from '../../../backend/prisma/utils/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST':
      handlePost(req, res)
      break
    case 'GET':
      handleGet(req, res)
      break
    default:
      res.status(405).json({ error: 'Method Not Allowed' })
  }
}

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const categories = await prisma.category.findMany()
    res.json({ data: categories })
  } catch (e) {
    res.status(400).json({ error: (e as Error).message })
  }
}

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name } = req.body

  try {
    const response = await prisma.category.create({ data: { name } })
    res.json({ data: response })
  } catch (e) {
    res.status(400).json({ error: (e as Error).message })
  }
  res.send('null')
}

export default handler
