import LoginForm from './LoginForm'
import styles from './login.module.css'

// Esta página usa SSG (Static Site Generation) + Hidratação
// O HTML é gerado em build time e servido estaticamente
// Após o carregamento, o React hidrata o componente adicionando interatividade
// Ideal para páginas públicas com formulários que não dependem de dados externos
export default function LoginPage() {
  return (
    <div className={styles.pageWrapper}>
      <LoginForm />
    </div>
  )
}


