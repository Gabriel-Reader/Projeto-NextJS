import PortalContent from './PortalContent'

// ═══════════════════════════════════════════════════════════════════
// ESTRATÉGIA DE RENDERIZAÇÃO: ISR (Incremental Static Regeneration)
// ═══════════════════════════════════════════════════════════════════
// 
// JUSTIFICATIVA TÉCNICA:
// Esta página usa ISR porque:
// 1. PERFORMANCE: O HTML é pré-renderizado (como SSG), garantindo carregamento rápido
// 2. ATUALIZAÇÃO: Revalida a cada 60s, mantendo dados atualizados sem rebuild completo
// 3. ESCALABILIDADE: Serve páginas em cache enquanto regenera em background
// 4. UX: Usuários sempre veem conteúdo (mesmo que ligeiramente desatualizado)
//
// IDEAL PARA: Páginas com dados que mudam periodicamente mas não em tempo real
// (ex: lista de dúvidas, estatísticas, conteúdo editorial)
//
export const revalidate = 60 // Revalida a cada 60 segundos

async function getInitialData() {
  // Simula busca de dados de uma API externa
  // Em produção, isso seria: fetch('https://api.example.com/data')
  
  // Aguarda pequeno delay para simular requisição
  await new Promise(resolve => setTimeout(resolve, 100))
  
  return {
    timestamp: new Date().toISOString(),
    buildTime: new Date().toLocaleString('pt-BR', { 
      timeZone: 'America/Sao_Paulo',
      dateStyle: 'short',
      timeStyle: 'medium'
    }),
    materias: ['Cálculo I', 'Física Geral', 'Algoritmos e Programação', 'História da Arte', 'Estatística'],
    tiposAjuda: ['Dúvida Teórica', 'Exercício de Lista', 'Revisão para Prova', 'Erro no Código/Trabalho'],
    totalDuvidas: Math.floor(Math.random() * 50) + 10 // Simula dado dinâmico
  }
}

export default async function PortalPage() {
  const initialData = await getInitialData()
  
  return <PortalContent initialData={initialData} />
}



