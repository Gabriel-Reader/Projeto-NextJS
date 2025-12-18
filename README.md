# Trabalho Final - Migração para Next.js: Portal de Monitoria Acadêmica

## 1. Descrição do Projeto e Migração
Este projeto consiste em uma atividade acadêmica de migração de uma aplicação web desenvolvida originalmente em HTML, CSS e JavaScript puro (Vanilla JS) para o framework **Next.js**.

No sistema, alunos podem registrar dúvidas sobre matérias específicas (Cálculo, Algoritmos, etc.) e acompanhar o status da solicitação.

**Integrantes do Grupo:**
* Gabriel Pinheiro
* Renan Hurtado

---

## 2. Estratégia de Renderização (Páginas e Justificativas)

Conforme os requisitos do trabalho, foram implementadas duas páginas com estratégias de renderização distintas no Next.js:

### Página 1: Login (`/`)
* **Tipo de Renderização:** **SSG (Static Site Generation)**
* **Justificativa Técnica:**
  A interface de login é estática e idêntica para qualquer usuário que acessa a aplicação. Não há dados dinâmicos a serem buscados no servidor no momento do carregamento inicial (build time). O uso de SSG garante que o HTML seja pré-gerado, resultando em um *Time to First Byte (TTFB)* extremamente baixo e melhor indexação (SEO), deixando apenas a interatividade do formulário para o cliente.

### Página 2: Central de Dúvidas (`/portal`)
* **Tipo de Renderização:** **CSR (Client-Side Rendering)**
* **Justificativa Técnica:**
  Esta página depende estritamente do acesso ao `window.localStorage` para verificar a autenticação do usuário e recuperar a lista de dúvidas salvas. Como o `localStorage` não existe no ambiente do servidor (Node.js), a renderização via servidor (SSR) quebraria a aplicação. O uso da diretiva `'use client'` e do hook `useEffect` garante que a manipulação de dados ocorra apenas no navegador do usuário, protegendo a integridade da aplicação.

---

## 3. Análise Comparativa Lighthouse (Antes vs. Depois)

Abaixo apresentamos a comparação das métricas obtidas no Google Lighthouse.

| Métrica | Projeto Original (HTML/JS) | Projeto Novo (Next.js na Vercel) | Variação |
| :--- | :---: | :---: | :---: |
| **Performance** | [00] | [00] | +/- 0% |
| **Acessibilidade** | [00] | [00] | +/- 0% |
| **Boas Práticas** | [00] | [00] | +/- 0% |
| **SEO** | [00] | [00] | +/- 0% |

### Análise dos Resultados:
(...)

---

## 4. Reflexão: Frontend Desacoplado
Este projeto ilustra uma abordagem de frontend moderno e desacoplado. Ao migrar para Next.js, separamos a interface (UI) da lógica de dados de forma modular.

Diferente do projeto monolítico original onde HTML e JS estavam fortemente amarrados, a nova estrutura baseada em componentes React permite que a interface seja reutilizada e testada isoladamente. Embora ainda utilizemos `localStorage`, a aplicação está pronta para ser conectada a uma API externa (Backend) sem necessidade de reescrever a camada visual, bastando alterar os hooks de consumo de dados. Isso demonstra a flexibilidade e escalabilidade da arquitetura baseada em componentes.

---
