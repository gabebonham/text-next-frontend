export default interface AwnserEntity {
  id: string
  idpergunta: string
  resposta: string
  respostaaberta: boolean
  ordem: number
  vezesrespondidas?: number
  createdat: string
}
