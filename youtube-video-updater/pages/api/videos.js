// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const fs = require('fs')
const filePath = process.env.FILE_PATH

export default function handler(req, res) {
  const content = readFile()

  res.status(200).json({ content })
}

export const getContent = () => {
  return readFile()
}

const readFile = () => {
  if (!fs.existsSync(filePath)) {
    return {}
  }

  return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
}