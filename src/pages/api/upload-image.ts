import { NextApiRequest, NextApiResponse } from 'next'
import formidable from 'formidable'

import path from 'path'
import fs from 'fs'

import { promisify } from 'util'

const readdirAsync = promisify(fs.readdir)
const mkdirAsync = promisify(fs.mkdir)

export const config = {
  api: {
    bodyParser: false,
  },
}

// NOTE: This code snippet was not entirely written by me.
// It includes contributions of Documentations or sections authored by others.
const readFile = (
  req: NextApiRequest,
  saveLocally: boolean,
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  const options: formidable.Options = {}
  if (saveLocally) {
    options.uploadDir = path.join(process.cwd(), '/public/images')
    options.filename = (name, ext, path, form) => {
      return Date.now().toString() + '_' + path.originalFilename
    }
  }

  const form = formidable(options)
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err)
      resolve({ fields, files })
    })
  })
}
// --------------------------------------------------------------------------

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    await readdirAsync(path.join(process.cwd() + '/public', '/images'))
  } catch (error) {
    await mkdirAsync(path.join(process.cwd() + '/public', '/images'))
  }

  const { files } = await readFile(req, true)
  res.json(files.myfile[0].newFilename)
}
