import AwnserEntity from './AwnserEntity'

export default interface QuestionEntity {
  id: string
  idformulario: string
  titulo: string
  codigo: number
  orientacaoresposta: string
  ordem: number
  obrigatoria: boolean
  subpergunta: string
  createdat: string
  tipopergunta: string
  respostas: AwnserEntity[]
}
