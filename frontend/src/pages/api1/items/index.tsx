import { prisma } from '../../../backend/prisma/utils/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { Tag } from '../../../types/types'
import { ArrowUpIcon } from '@heroicons/react/outline'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST':
      handlePost(req, res)
      break
    case 'GET':
      handleGet(req, res)
      break
    default:
      res.status(501).json({ error: 'Method Not Allowed' })
  }
}

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const items = await prisma.item.findMany()
    res.json({ data: items })
  } catch (e) {
    res.status(400).json({ error: (e as Error).message })
  }
}

interface PostProps {
  name: string
  tags?: number[]
}

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  let { name, tags }: PostProps = req.body
  console.log(typeof name)

  const argumentsValid = true

  validatePostArguments(res, argumentsValid, name, tags)

  if (!argumentsValid) return

  try {
    const data = await prisma.item.create({
      data: {
        name,
        tags: {
          connect: (tags as number[]).map((tag) => ({ id: tag })),
        },
      },
    })
    console.log('success')

    res.json({})
  } catch (e) {
    res.status(409).json({ error: (e as Error).message })
  }
}

const validatePostArguments = (res: NextApiResponse, argumentsValid: boolean, name: any, tags: any) => {
  if (!(typeof name == 'string')) {
    res.status(400).json({ error: 'name argument not of correct type: string' })
    argumentsValid = false
  }

  if (tags && !isNumberArray(tags)) {
    res.status(400).json({ error: 'tags argument not of type: number array' })
    argumentsValid = false
  }
}

const isNumberArray = (arr: any): boolean => {
  if (!Array.isArray(arr)) return false
  arr.forEach((item) => {
    if (!(typeof item == 'number')) return false
  })
  return true
}

export default handler
