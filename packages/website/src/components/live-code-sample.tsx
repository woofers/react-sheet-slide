'use client'
import { useFormikContext } from 'formik'
import makeCodeSample from 'utils/code'
import CodeBlock from './code-block'
import type { FormProps } from 'types/global'

const LiveCodeSample: React.FC<{}> = () => {
  const { values } = useFormikContext<FormProps>()
  return <CodeBlock lang="language-jsx">{makeCodeSample(values)}</CodeBlock>
}

export default LiveCodeSample
