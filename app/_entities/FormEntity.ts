import QuestionEntity from './QuestionEntity'

export default interface FormEntity {
  id: string
  titulo: string
  descricao: string
  ordem: number
  perguntas: QuestionEntity[]
  createdat: string
}
