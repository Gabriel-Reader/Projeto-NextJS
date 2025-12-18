'use client'

import { useState, useEffect, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import styles from './login.module.css'

export default function LoginForm() {
  const router = useRouter()
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')
  const [darkMode, setDarkMode] = useState(false)

  const USUARIO_CORRETO = "admin"
  const SENHA_CORRETA = "Inter"

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true'
    setDarkMode(savedDarkMode)
  }, [])

  const toggleDarkMode = () => {
    const newMode = !darkMode
    setDarkMode(newMode)
    localStorage.setItem('darkMode', String(newMode))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (usuario === USUARIO_CORRETO && senha === SENHA_CORRETA) {
      localStorage.setItem('usuarioLogado', usuario)
      router.push('/portal')
    } else {
      alert('Usuário ou senha incorretos.')
      setSenha('')
    }
  }

  return (
    <div className={`${styles.container} ${darkMode ? styles.containerDark : ''} login-container`}>
      <div className={styles.wrapper}>
        <button
          id="darkmodeID"
          onClick={toggleDarkMode}
          className={`${styles.darkModeBtn} ${darkMode ? styles.darkModeBtnDark : ''}`}
        >
          Alternar Modo
        </button>

        <div className={`${styles.card} ${darkMode ? styles.cardDark : ''} cartao-login`}>
          <div className={`${styles.header} cabecalho-login`}>
            <h1 className={`${styles.title} ${darkMode ? styles.titleDark : ''}`}>
              Bem-vindo de volta
            </h1>
            <p className={`${styles.subtitle} ${darkMode ? styles.subtitleDark : ''}`}>
              Entre com suas credenciais para acessar sua conta
            </p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="usuario" className={`${styles.label} ${darkMode ? styles.labelDark : ''}`}>
                Nome de usuário
              </label>
              <input
                type="text"
                id="usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                placeholder="Digite o seu nome de usuário"
                required
                className={`${styles.input} ${darkMode ? styles.inputDark : ''}`}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="senha" className={`${styles.label} ${darkMode ? styles.labelDark : ''}`}>
                Senha
              </label>
              <input
                type="password"
                id="senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Digite sua senha"
                required
                className={`${styles.input} ${darkMode ? styles.inputDark : ''}`}
              />
            </div>

            <button
              type="submit" id="btnEntrar"
              className={`${styles.btn} ${darkMode ? styles.btnDark : ''}`}
            >
              Entrar
            </button>
          </form>

          <div className={`${styles.divider} ${darkMode ? styles.dividerDark : ''}`}>
            <span>ou</span>
          </div>

          <button
            type="button"
            className={`${styles.btn} ${styles.btnSecondary} ${darkMode ? styles.btnSecondaryDark : ''}`}
          >
            Criar conta
          </button>
        </div>
      </div>
    </div>
  )
}
