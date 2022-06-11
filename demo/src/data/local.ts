import fs from 'fs-extra'
import { parse, join } from 'path'

const getTypeGlob = (type: string) => new RegExp(`.${type}?$`, '')

const getPathGlob = (path: string) => {
  const re = path
    .split('/')
    .map(folder => `${folder}\\/`)
    .join('')
  return new RegExp(`^${re}`, '')
}

export const getFile = (path: string, file: string, type: string) => {
  const filePath = join(`./${path}`, `${file}.${type}`)
  const { ext, name } = parse(filePath)
  if (ext.startsWith(`.${type}`)) {
    try {
      const content = fs.readFileSync(filePath, 'utf8')
      const post = {
        content,
        date: '',
        post: filePath
          .replace(getPathGlob(path), '')
          .replace(getTypeGlob(type), '')
      }
      return post
    } catch (e) {
      // fall-through
    }
  }
  return { content: '' }
}

export const getFiles = (path: string, type: string) => {
  const names = getFileNames(path, getTypeGlob(type))
  return names.map(file => getFile(path, file, type))
}

export const getFileNames = (path: string, glob: RegExp | string) => {
  const files = fs.readdirSync(`./${path}`)
  if (!glob) return files
  return files.map(name => name.replace(glob, ''))
}

export const getMarkdownFile = (path: string, name: string) => getFile(path, name, 'md')

export const getMarkdownFiles = (path: string) => getFiles(path, 'md')

export const getMarkdownFileNames = (path: string) =>
  getFileNames(path, getTypeGlob('md'))
