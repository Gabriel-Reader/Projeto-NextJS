# Trabalho Final - Migração para Next.js: Portal de Monitoria Acadêmica

## 1. Descrição do Projeto e Migração
Este projeto consiste em uma atividade acadêmica de migração de uma aplicação web desenvolvida originalmente em HTML, CSS e JavaScript puro (Vanilla JS) para o framework **Next.js**.

No sistema, alunos podem registrar dúvidas sobre matérias específicas (Cálculo, Algoritmos, etc.) e acompanhar o status da solicitação.

**Integrantes do Grupo:**
* Gabriel Pinheiro
* Renan Hurtado

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

Abaixo apresentamos a comparação das métricas obtidas no Google Lighthouse para cada uma das páginas principais.

### Tabela 1: Página de Login (Home)
*Estratégia: HTML Puro vs. Next.js (SSG)*

| Métrica | Versão Original (HTML) | Versão Next.js (SSG) | Variação |
| :--- | :---: | :---: | :---: |
| **Performance** | [00] | [00] | +/- 0% |
| **Acessibilidade** | [00] | [00] | +/- 0% |
| **Boas Práticas** | [00] | [00] | +/- 0% |
| **SEO** | [00] | [00] | +/- 0% |

### Tabela 2: Página do Portal (Central de Dúvidas)
*Estratégia: HTML Puro vs. Next.js (CSR)*

| Métrica | Versão Original (HTML) | Versão Next.js (CSR) | Variação |
| :--- | :---: | :---: | :---: |
| **Performance** | [00] | [00] | +/- 0% |
| **Acessibilidade** | [00] | [00] | +/- 0% |
| **Boas Práticas** | [00] | [00] | +/- 0% |
| **SEO** | [00] | [00] | +/- 0% |

---

## 4. Reflexão: Frontend Desacoplado
Este projeto ilustra uma abordagem de frontend moderno e desacoplado. Ao migrar para Next.js, separamos a interface (UI) da lógica de dados de forma modular.

Diferente do projeto monolítico original onde HTML e JS estavam fortemente amarrados, a nova estrutura baseada em componentes React permite que a interface seja reutilizada e testada isoladamente. Embora ainda utilizemos `localStorage`, a aplicação está pronta para ser conectada a uma API externa (Backend) sem necessidade de reescrever a camada visual, bastando alterar os hooks de consumo de dados. Isso demonstra a flexibilidade e escalabilidade da arquitetura baseada em componentes.

---
