import { bundleMDX } from 'mdx-bundler'
import { cwd } from 'data/local'
import App from 'components/app'
import { form } from './form'

const getData = async () => {
  const { code, frontmatter } = await bundleMDX({
    file: cwd('CONTENT.mdx'),
    cwd: cwd(),
    globals: {
      form: {
        varName: 'form',
        namedExports: [
          'Switch',
          'RadioGroup',
          'Radio',
          'Fieldset',
          'Legend',
          'LiveCodeSample',
          'SheetThemeMode',
          'DetentsSelector'
        ],
        defaultExport: false
      }
    }
  })
  return { code, frontmatter }
}

const Data = async () => {
  const { code } = await getData()
  return <App code={code} />
}

export default Data
