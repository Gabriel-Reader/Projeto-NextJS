# Trabalho Final - Migração para Next.js: Portal de Monitoria Acadêmica

## 1. Descrição do Projeto e Migração
Este projeto consiste em uma atividade acadêmica de migração de uma aplicação web desenvolvida originalmente em HTML, CSS e JavaScript puro (Vanilla JS) para o framework **Next.js**.

No sistema, alunos podem registrar dúvidas sobre matérias específicas (Cálculo, Algoritmos, etc.) e acompanhar o status da solicitação.

**Integrantes do Grupo:**
* Gabriel Pinheiro
* Renan Hurtado

  *Links dos deploys realizados:**
  * Versão Vanilla JS: https://projeto-next-js-kohl.vercel.app/
  * Versão NextJS: https://projeto-next-js-kappa.vercel.app/

---

## 2. Estratégia de Renderização (Páginas e Justificativas)

Para atender aos requisitos de performance e demonstrar diferentes estratégias de renderização do Next.js, o projeto foi arquitetado da seguinte forma:

### Página 1: Login (`/`)
* **Tipo de Renderização:** **SSG (Static Site Generation) + CSR (Client-Side Rendering)**
* **Justificativa Técnica:**
  Utilizamos **SSG** para gerar o HTML estático da interface de login durante o *build*, garantindo entrega imediata do conteúdo e máxima performance inicial. O **CSR** atua de forma complementar (*Hydration*) para assumir a interatividade do formulário, validando as credenciais no navegador do usuário sem depender de processamento no servidor para a renderização inicial.

### Página 2: Portal do Aluno (`/portal`)
* **Tipo de Renderização:** **ISR (Incremental Static Regeneration)**
* **Justificativa Técnica:**
  A escolha do **ISR** foi estratégica para equilibrar alta performance com facilidade de atualização. Ao pré-renderizar o HTML (similar ao SSG), garantimos um carregamento inicial extremamente rápido. A configuração de revalidação a cada 60 segundos mantém os dados atualizados sem a necessidade de realizar *rebuilds* completos da aplicação, promovendo escalabilidade ao servir páginas em cache enquanto novas versões são regeneradas em *background*.
---

## 3. Análise Comparativa Lighthouse (Antes vs. Depois)

Realizamos auditorias de performance utilizando o Google Lighthouse (modo Desktop) tanto na versão original (Vanilla JS) quanto na nova versão migrada para Next.js. Abaixo, detalhamos os resultados e o impacto das estratégias de renderização escolhidas.

### Tabela 1: Página de Login (Home)
*Estratégia: HTML Puro vs. Next.js (SSG + CSR)*

| Métrica | Versão Original (HTML) | Versão Next.js (SSG+CSR) | Variação |
| :--- | :---: | :---: | :---: |
| **Performance** | 94 | **98** | +4 pontos |
| **Acessibilidade** | 96 | **98** | +2 pontos |
| **Boas Práticas** | 100 | 100 | = |
| **SEO** | 100 | 100 | = |

### Tabela 2: Página do Portal (Central de Dúvidas)
*Estratégia: HTML Puro vs. Next.js (ISR)*

| Métrica | Versão Original (HTML) | Versão Next.js (ISR) | Variação |
| :--- | :---: | :---: | :---: |
| **Performance** | 94 | **98** | +4 pontos |
| **Acessibilidade** | 87 | **92** | +5 pontos |
| **Boas Práticas** | 100 | 100 | = |
| **SEO** | 100 | 100 | = |

### Análise Técnica dos Resultados:

1.  **Redução Drástica no FCP (First Contentful Paint):**
    * No **Login**, o First Contentful Paint caiu de **1.8s** para **1.0s**. Isso valida a escolha do **SSG**, pois o HTML já chega pronto do servidor, eliminando o tempo que o navegador gastava montando a árvore do DOM no JavaScript puro.
    * No **Portal**, a melhoria foi ainda mais expressiva, caindo de **1.5s** para **0.9s**. A estratégia de **ISR** provou ser eficiente ao entregar a estrutura ("shell") da página instantaneamente via cache, antes mesmo de buscar os dados do aluno.

2.  **Otimização do TBT (Total Blocking Time):**
    * Observamos uma redução no tempo de bloqueio da thread principal (de ~280ms para ~160ms no Portal). Mesmo adicionando a biblioteca React (que naturalmente aumenta o peso do JS), o mecanismo do Next.js garantiu que apenas o código necessário para aquela rota fosse carregado e processado, resultando em uma interatividade mais fluida.

3.  **Acessibilidade:**
    * Houve um ganho notável na página do Portal (de 87 para 92). A migração para componentes React (Next.js) forçou uma melhor estruturação semântica do código e o uso do componente `<Link>` e `<Image>` do framework ajudou a corrigir automaticamente problemas de atributos faltantes que existiam na versão manual.

**Conclusão da Análise:**
A migração elevou a nota de Performance para o patamar de **98/100** em ambas as páginas. Isso demonstra que o uso de pré-renderização (SSG/ISR) supera a abordagem tradicional de carregar todo o site via requisição simples, oferecendo uma experiência percebida muito mais rápida para o usuário final.

---

## 4. Reflexão: Frontend Desacoplado
Este projeto ilustra uma abordagem de frontend moderno e desacoplado. Ao migrar para Next.js, separamos a interface (UI) da lógica de dados de forma modular.

Diferente do projeto monolítico original onde HTML e JS estavam fortemente amarrados, a nova estrutura baseada em componentes React permite que a interface seja reutilizada e testada isoladamente. Embora ainda utilizemos `localStorage`, a aplicação está pronta para ser conectada a uma API externa (Backend) sem necessidade de reescrever a camada visual, bastando alterar os hooks de consumo de dados. Isso demonstra a flexibilidade e escalabilidade da arquitetura baseada em componentes.

---
