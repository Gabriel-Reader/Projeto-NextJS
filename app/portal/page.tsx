'use client'

import { useState, useEffect, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import styles from './portal.module.css'

interface Duvida {
  id: number
  materia: string
  tipo: string
  assunto: string
  turma: string
  nomeAluno: string
  descricao: string
  imagem: string | null
  data: string
}

export default function PortalPage() {
  const router = useRouter()
  const [usuario, setUsuario] = useState('')
  const [duvidas, setDuvidas] = useState<Duvida[]>([])
  const [darkMode, setDarkMode] = useState(false)
  
  const [materia, setMateria] = useState('')
  const [tipo, setTipo] = useState('')
  const [assunto, setAssunto] = useState('')
  const [turma, setTurma] = useState('')
  const [nomeAluno, setNomeAluno] = useState('')
  const [descricao, setDescricao] = useState('')

  useEffect(() => {
    const usuarioLogado = localStorage.getItem('usuarioLogado')
    if (!usuarioLogado) {
      router.push('/')
    } else {
      setUsuario(usuarioLogado)
    }
    
    const savedDarkMode = localStorage.getItem('darkMode') === 'true'
    setDarkMode(savedDarkMode)
  }, [router])

  const toggleDarkMode = () => {
    const newMode = !darkMode
    setDarkMode(newMode)
    localStorage.setItem('darkMode', String(newMode))
  }

  const handleLogout = () => {
    localStorage.removeItem('usuarioLogado')
    router.push('/')
  }

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault()
    
    const imagemInput = document.getElementById('m_imagem') as HTMLInputElement
    const file = imagemInput?.files?.[0]

    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        criarDuvida(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      criarDuvida(null)
    }
  }

  const criarDuvida = (imagemDataUrl: string | null) => {
    const novaDuvida: Duvida = {
      id: Math.floor(Math.random() * 10000),
      materia,
      tipo,
      assunto,
      turma: turma || 'N/A',
      nomeAluno: nomeAluno || 'Anônimo',
      descricao,
      imagem: imagemDataUrl,
      data: new Date().toLocaleDateString('pt-BR')
    }

    setDuvidas([novaDuvida, ...duvidas])
    
    setMateria('')
    setTipo('')
    setAssunto('')
    setTurma('')
    setNomeAluno('')
    setDescricao('')
    
    const form = document.getElementById('formMonitoria') as HTMLFormElement
    if (form) form.reset()
  }

  const removerDuvida = (id: number) => {
    if (confirm('Já resolveu esta dúvida? Deseja excluir?')) {
      setDuvidas(duvidas.filter(d => d.id !== id))
    }
  }

  return (
    <div className={`${styles.container} ${darkMode ? styles.containerDark : ''}`}>
      <button
        id="darkmodeID"
        onClick={toggleDarkMode}
        className={`${styles.darkModeBtn} ${darkMode ? styles.darkModeBtnDark : ''}`}
      >
        Alternar Modo
      </button>

      <header className={`${styles.header} header-painel`}>
        <div className={`${styles.headerInfo} info-usuario`}>
          <span className="greeting">
            Olá, <strong id="nomeUsuarioDisplay">{usuario}</strong>
          </span>
          <span className={`${styles.separator} separator`}>|</span>
          <button onClick={handleLogout} className={`${styles.logoutBtn} logout-link`}>
            Sair
          </button>
        </div>
      </header>

      <section id="sectionMorador" className={`${styles.section} section-morador`}>
        <h1 className={`${styles.mainTitle} ${darkMode ? styles.titleDark : ''}`}>Central de Dúvidas</h1>

        <div className={`${styles.card} ${darkMode ? styles.cardDark : ''} cartao-morador`}>
          <h3 className={`${styles.cardTitle} ${darkMode ? styles.titleDark : ''}`}>Nova Dúvida / Pergunta</h3>

          <form id="formMonitoria" onSubmit={handleFormSubmit} className={`${styles.form} formulario-morador`}>
            <div className={`${styles.formRow} itens-linha`}>
              <div className={`${styles.formGroup} item-formulario`}>
                <label htmlFor="m_materia" className={`${styles.label} ${darkMode ? styles.labelDark : ''}`}>
                  Disciplina / Matéria
                </label>
                <select
                  id="m_materia"
                  value={materia}
                  onChange={(e) => setMateria(e.target.value)}
                  required
                  className={`${styles.select} ${darkMode ? styles.selectDark : ''}`}
                >
                  <option value="" disabled>Escolha a matéria...</option>
                  <option value="Cálculo I">Cálculo I</option>
                  <option value="Física Geral">Física Geral</option>
                  <option value="Algoritmos">Algoritmos e Programação</option>
                  <option value="História da Arte">História da Arte</option>
                  <option value="Estatística">Estatística</option>
                </select>
              </div>

              <div className={`${styles.formGroup} item-formulario`}>
                <label htmlFor="m_tipo" className={`${styles.label} ${darkMode ? styles.labelDark : ''}`}>
                  Tipo de Ajuda
                </label>
                <select
                  id="m_tipo"
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                  required
                  className={`${styles.select} ${darkMode ? styles.selectDark : ''}`}
                >
                  <option value="" disabled>O que você precisa?</option>
                  <option value="Dúvida Teórica">Dúvida Teórica</option>
                  <option value="Exercício de Lista">Exercício de Lista</option>
                  <option value="Revisão para Prova">Revisão para Prova</option>
                  <option value="Erro no Código">Erro no Código/Trabalho</option>
                </select>
              </div>
            </div>

            <div className={`${styles.formGroup} item-formulario`}>
              <label htmlFor="m_assunto" className={`${styles.label} ${darkMode ? styles.labelDark : ''}`}>
                Assunto Específico
              </label>
              <input
                type="text"
                id="m_assunto"
                value={assunto}
                onChange={(e) => setAssunto(e.target.value)}
                placeholder="Ex: Regra da Cadeia, Leis de Newton..."
                required
                className={`${styles.input} ${darkMode ? styles.inputDark : ''}`}
              />
            </div>

            <div className={`${styles.formRow} itens-linha`}>
              <div className={`${styles.formGroup} item-formulario`}>
                <label htmlFor="m_turma" className={`${styles.label} ${darkMode ? styles.labelDark : ''}`}>
                  Sua Turma
                </label>
                <input
                  type="text"
                  id="m_turma"
                  value={turma}
                  onChange={(e) => setTurma(e.target.value)}
                  placeholder="ex: Turma A / Noturno"
                  className={`${styles.input} ${darkMode ? styles.inputDark : ''}`}
                />
              </div>

              <div className={`${styles.formGroup} item-formulario`}>
                <label htmlFor="m_nome_aluno" className={`${styles.label} ${darkMode ? styles.labelDark : ''}`}>
                  Nome do Aluno
                </label>
                <input
                  type="text"
                  id="m_nome_aluno"
                  value={nomeAluno}
                  onChange={(e) => setNomeAluno(e.target.value)}
                  placeholder="Seu nome completo"
                  required
                  className={`${styles.input} ${darkMode ? styles.inputDark : ''}`}
                />
              </div>
            </div>

            <div className={`${styles.formGroup} item-formulario`}>
              <label htmlFor="m_descricao" className={`${styles.label} ${darkMode ? styles.labelDark : ''} form-label`}>
                Detalhes da Dúvida
              </label>
              <textarea
                id="m_descricao"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                rows={3}
                placeholder="Descreva sua dúvida ou cole o enunciado da questão aqui..."
                required
                className={`${styles.textarea} ${darkMode ? styles.textareaDark : ''} form-textarea`}
              />
            </div>

            <div className={`${styles.formGroup} div-imagem`}>
              <label htmlFor="m_imagem" className={`${styles.label} ${darkMode ? styles.labelDark : ''}`}>
                Foto do exercício/caderno (Opcional)
              </label>
              <input
                type="file"
                id="m_imagem"
                name="m_imagem"
                accept="image/*"
                className={`${styles.fileInput} btn-imagem`}
              />
            </div>

            <button type="submit" id="m_enviarPedido" className={`${styles.submitBtn} btn btn-enviarPedido`}>
              Enviar Pergunta
            </button>
          </form>
        </div>

        <div className={`${styles.questionsContainer} container-pedidos`}>
          <h3 className={`${styles.questionsTitle} ${darkMode ? styles.titleDark : ''} cabecalho-meusPedidos`}>Minhas Perguntas</h3>

          <div id="listaPedidos" className={`${styles.questionsList} cartao-pedidos`}>
            {duvidas.length === 0 ? (
              <div className={`${styles.questionCard} ${darkMode ? styles.questionCardDark : ''} cartao-pedido`}>
                <button className={`${styles.deleteBtn} btn-excluir`}>X</button>
                
                <div className={`${styles.tag} pedido-tag-categoria`}>Cálculo I</div>
                
                <p className={`${styles.questionText} pedido-descricao`}>
                  <strong>Derivadas Parciais</strong><br />
                  Não estou conseguindo aplicar a regra da cadeia no exercício 4 da lista 2.
                </p>
                
                <h4 className={`${styles.infoTitle} ${darkMode ? styles.infoTitleDark : ''} pedido-local-titulo`}>Dados do Aluno</h4>
                <p className={`${styles.infoText} ${darkMode ? styles.infoTextDark : ''} pedido-local-detalhe`}>Aluno: Gabriel • Turma: A</p>

                <h4 className={`${styles.infoTitle} ${darkMode ? styles.infoTitleDark : ''} pedido-local-titulo`}>Tipo de Solicitação</h4>
                <p className={`${styles.infoText} ${darkMode ? styles.infoTextDark : ''} pedido-local-detalhe`}>Exercício de Lista</p>
                
                <hr className={`${styles.divider} pedido-divisor`} />
                
                <div className={`${styles.footer} pedido-rodape`}>
                  <div className={`${styles.statusContainer} pedido-status-container`}>
                    <span className={`${styles.statusTag} pedido-tag-status status-aberto`}>Aguardando Monitor</span>
                    <span className={`${styles.date} pedido-data`}>Postado em: 17/12/2025</span>
                  </div>
                  <span className={`${styles.questionId} pedido-id`}>ID: 001</span>
                </div>

                <hr className={`${styles.divider} pedido-divisor`} />

                <div className="pedido-comentarios">
                  <p className={`${styles.answerTitle} comentario-titulo`}>Resposta do Monitor:</p>
                  <div className={`${styles.answerBox} ${darkMode ? styles.answerBoxDark : ''} comentario-conteudo`}>
                    <p>Ainda não respondido.</p>
                  </div>
                </div>
              </div>
            ) : (
              duvidas.map((duvida) => (
                <div key={duvida.id} className={`${styles.questionCard} ${darkMode ? styles.questionCardDark : ''} cartao-pedido`}>
                  <button onClick={() => removerDuvida(duvida.id)} className={`${styles.deleteBtn} btn-excluir`}>
                    X
                  </button>
                  
                  <div className={`${styles.tag} pedido-tag-categoria`}>{duvida.materia}</div>
                  
                  <p className={`${styles.questionText} pedido-descricao`}>
                    <strong>{duvida.assunto}</strong><br />
                    {duvida.descricao}
                  </p>

                  {duvida.imagem && (
                    <div className={`${styles.imageContainer} pedido-imagem-container`}>
                      <img
                        src={duvida.imagem}
                        alt="Foto da dúvida"
                        className={`${styles.questionImage} pedido-imagem`}
                      />
                    </div>
                  )}
                  
                  <h4 className={`${styles.infoTitle} ${darkMode ? styles.infoTitleDark : ''} pedido-local-titulo`}>Dados do Aluno</h4>
                  <p className={`${styles.infoText} ${darkMode ? styles.infoTextDark : ''} pedido-local-detalhe`}>
                    Aluno: {duvida.nomeAluno} • Turma: {duvida.turma}
                  </p>

                  <h4 className={`${styles.infoTitle} ${darkMode ? styles.infoTitleDark : ''} pedido-local-titulo`}>Tipo de Solicitação</h4>
                  <p className={`${styles.infoText} ${darkMode ? styles.infoTextDark : ''} pedido-local-detalhe`}>{duvida.tipo}</p>
                  
                  <hr className={`${styles.divider} pedido-divisor`} />
                  
                  <div className={`${styles.footer} pedido-rodape`}>
                    <div className={`${styles.statusContainer} pedido-status-container`}>
                      <span className={`${styles.statusTag} pedido-tag-status status-aberto`}>Aguardando Monitor</span>
                      <span className={`${styles.date} pedido-data`}>Postado em: {duvida.data}</span>
                    </div>
                    <span className={`${styles.questionId} pedido-id`}>ID: {duvida.id}</span>
                  </div>

                  <hr className={`${styles.divider} pedido-divisor`} />

                  <div className="pedido-comentarios">
                    <p className={`${styles.answerTitle} comentario-titulo`}>Resposta do Monitor:</p>
                    <div className={`${styles.answerBox} ${darkMode ? styles.answerBoxDark : ''} comentario-conteudo`}>
                      <p>Ainda não respondido.</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
