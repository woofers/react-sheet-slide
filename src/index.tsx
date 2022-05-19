
export type Number = {
  op: string
  value: number
}

export type Variable = {
  symbol: string
  sign: '+' | '-'
}

type Result = Variable & Number & { result: 'ok' | 'bad' }

const merge = (x: Number, y: Variable): Result => {
  return { ...x, ...y, result: __isDev__ ? 'bad' : 'ok' }
}

export default merge
