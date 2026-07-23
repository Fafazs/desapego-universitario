# 🎓 Desapego Universitário

> Marketplace acadêmico em formato de Progressive Web App (PWA) para facilitar a doação, troca e venda de materiais universitários entre estudantes da UNIFOR.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)

---

## 📑 Índice

- [1. Introdução](#1-introdução)
- [2. Visão Geral do Produto / Serviço](#2-visão-geral-do-produto--serviço)
  - [Objetivo](#21-objetivo)
  - [Justificativa](#22-justificativa)
  - [Sistemas Relacionados e Escopo Negativo](#23-sistemas-relacionados-e-escopo-negativo)
  - [Premissas e Restrições](#24-premissas-e-restrições)
  - [Stakeholders e Objetivos](#25-stakeholders-e-objetivos)
  - [Sistemas Semelhantes no Mercado](#26-sistemas-semelhantes-no-mercado)
- [3. Requisitos Funcionais](#3-requisitos-funcionais)
- [4. Requisitos Não Funcionais](#4-requisitos-não-funcionais)
- [5. Engenharia de Software (Fluxogramas)](#5-engenharia-de-software-fluxogramas)
- [6. Modelagem do Banco de Dados](#6-modelagem-do-banco-de-dados)
- [7. Conclusão](#7-conclusão)
- [8. Diário de Bordo da IA](#8-diário-de-bordo-da-ia)

---

## 1. Introdução

O presente documento visa formalizar a especificação de requisitos para o projeto **"Desapego Universitário"**, uma plataforma digital (Progressive Web App - PWA) que busca solucionar a desconexão e o desperdício de materiais acadêmicos na Universidade de Fortaleza (UNIFOR). O problema central a ser resolvido é a dependência de grupos genéricos em redes sociais, que sofrem com poluição visual e falta de segurança, dificultando o repasse sustentável e organizado de itens entre alunos veteranos e ingressantes.

---

## 2. Visão Geral do Produto / Serviço

O projeto consiste em um marketplace de nicho focado em economia circular, desenvolvido para facilitar a doação, troca e venda de materiais de utilidade universitária. O sistema atua como uma vitrine de conexões e intenções, otimizando o encontro entre quem possui materiais ociosos e quem necessita deles.

### 2.1 Objetivo
Desenvolver e implementar uma plataforma digital exclusiva e segmentada para o campus, que permita aos estudantes cadastrar anúncios rapidamente e aos visitantes filtrar itens por categorias acadêmicas específicas, facilitando o contato direto entre as partes para a negociação presencial no campus.

### 2.2 Justificativa
A implementação do projeto é justificada pela necessidade de promover a sustentabilidade, o senso de comunidade e o apoio mútuo entre os alunos.
* ♻️ **Economia Circular:** Redução drástica do desperdício de materiais em bom estado (livros, calculadoras, jalecos).
* 🤝 **Inclusão Acadêmica:** Diminuição das barreiras financeiras para calouros ao facilitar o acesso a materiais mais baratos ou gratuitos (doações).
* 🎯 **Organização e Foco:** Eliminação da poluição visual encontrada em classificados amplos, focando exclusivamente nas necessidades reais do estudante universitário.

### 2.3 Sistemas Relacionados e Escopo Negativo

O produto atuará como um facilitador ("matchmaker") e precisará interagir com ferramentas externas de comunicação para a finalização das negociações.

#### Sistemas Relacionados
* **WhatsApp / Navegador:** O sistema gerará links dinâmicos (`wa.me`) integrando-se nativamente com o aplicativo de mensagens do usuário para que o acordo final seja realizado fora da plataforma.

#### 🚫 Escopo Negativo (O que o projeto NÃO fará)
* **Sistema Financeiro:** Não haverá carrinho de compras, cálculo de frete, pagamento via Pix/Cartão, ou emissão de nota fiscal.
* **Chat Interno:** O sistema não gerenciará troca de mensagens em tempo real (WebSockets) entre os usuários.
* **Upload de Arquivos:** Para manter custo e complexidade zero (conforme edital), o sistema não processará upload ou hospedagem local de imagens, aceitando apenas URLs públicas.
* **Rede Social / App Nativo:** Não haverá feed de postagens, curtidas, comentários e o sistema não será publicado em lojas de aplicativos (App Store/Play Store).

### 2.4 Premissas e Restrições

**Premissas**
* **Arquitetura PWA:** Os usuários acessarão a plataforma via navegadores modernos compatíveis com padrões PWA, permitindo instalação na tela inicial.
* **Hospedagem de Imagens Externa:** É premissa que o usuário saiba ou utilize geradores de link público de imagens para o cadastro dos produtos.

**Restrições**
* **Autenticação e Segurança:** O acesso para criação e gerenciamento de anúncios exigirá registro e login obrigatórios, com proteção rigorosa via criptografia de senhas (hashing) e verificação via Token JWT.
* **Comunicação Estrita:** A API RESTful (Backend) deverá se comunicar com o Frontend estritamente via formato JSON.

### 2.5 Stakeholders e Objetivos

* **Cliente Principal (Laboratório Vortex / Avaliadores do Edital):** O objetivo é aferir a capacidade técnica na construção de uma arquitetura Fullstack robusta, respeitando o prazo e o escopo estabelecidos no desafio técnico.
* **Visitante (Não Autenticado):** Busca visualizar a vitrine de produtos, utilizar filtros de categorias e entrar em contato com anunciantes.
* **Usuário Autenticado (Aluno):** Busca anunciar materiais, gerenciar seu próprio acervo e ser contatado por interessados de forma rápida.

### 2.6 Sistemas Semelhantes no Mercado
Compartilha dinâmicas de conexão com **OLX** e **Facebook Marketplace**, porém diferencia-se por ser estritamente voltado à comunidade acadêmica (nichado) e não exigir taxas, impulsionamentos financeiros ou possuir publicidade de terceiros.

---

## 3. Requisitos Funcionais

*O que o sistema permite que o usuário faça.*

| ID | Descrição | Prioridade |
|:---|:---|:---|
| **RF001** | **Cadastro de Usuário:** O sistema deve permitir o registro exigindo Nome, E-mail, Senha e Número de WhatsApp. | Essencial |
| **RF002** | **Autenticação (Login):** O sistema deve validar credenciais e retornar um token de sessão. | Essencial |
| **RF003** | **Criação de Anúncio:** Usuários autenticados devem cadastrar itens com Título, Descrição, Categoria, Preço numérico e URL da Imagem. | Essencial |
| **RF004** | **Regra de Doação:** Se o preço for 0 (zero), o frontend exibirá a tag "DOAÇÃO" em vez do valor. | Importante |
| **RF005** | **Vitrine Pública:** O sistema deve listar todos os anúncios ativos com acesso livre. | Essencial |
| **RF006** | **Filtro de Categorias:** O sistema deve filtrar a vitrine (Ex: "Sobrevivência", "Exatas & Tech", "Práticas" e "Apenas Doação"). | Essencial |
| **RF007** | **Gestão do Próprio Acervo:** O usuário autenticado deve visualizar uma lista exclusiva de seus próprios anúncios. | Essencial |
| **RF008** | **Exclusão de Anúncio:** Apenas o dono do anúncio pode realizar a deleção do registro. | Importante |
| **RF009** | **Redirecionamento de Contato:** O sistema deve gerar um link para o WhatsApp com mensagem pré-preenchida ao clicar em "Tenho Interesse". | Essencial |
| **RF010** | **Estatísticas da Landing Page:** Exibir dados simulados ou estáticos de impacto circular na versão desktop. | Desejável |

---

## 4. Requisitos Não Funcionais

*Como o sistema funciona sob o capô (Arquitetura e Segurança).*

| Categoria | ID | Descrição |
|:---|:---|:---|
| **Usabilidade** | **RNF-US01** | **Responsividade:** A UI deve ser responsiva, operando em layout desktop (Landing Page) e formato "app nativo" no mobile. |
| **Usabilidade** | **RNF-US02** | **Conformidade PWA:** A aplicação deve possuir arquivo `manifest.json` válido e permitir instalação no dispositivo. |
| **Confiabilidade** | **RNF-CO01** | **Comportamento Offline:** O frontend deve conter um Service Worker para cache estático, permitindo visualização básica sem internet. |
| **Confiabilidade** | **RNF-CO02** | **Persistência:** Os dados devem ser armazenados de forma confiável em um banco de dados relacional PostgreSQL. |
| **Desempenho/Arq.** | **RNF-DE01** | **Backend RESTful:** A API desenvolvida em Node.js deve processar e retornar dados estritamente em formato JSON. |
| **Desempenho/Arq.** | **RNF-DE02** | **Frontend Reativo:** O frontend deve ser construído utilizando React com TypeScript e estilização modular (CSS Modules). |
| **Segurança** | **RNF-SE01** | **Criptografia de Senhas:** Todas as senhas devem ser convertidas em Hash (ex: bcrypt) antes de serem salvas. |
| **Segurança** | **RNF-SE02** | **Proteção de Rotas:** Endpoints privados devem exigir um Token JWT (JSON Web Token) válido no cabeçalho (*Header*) da requisição. |

---

## 5. Engenharia de Software (Fluxogramas)

Mapeamento arquitetural das interações do sistema.

### 5.1 Fluxo do Visitante (Visualização e Filtro)

<p align="center">
  <img src="./docs/engenharia/fluxo-visitante.png" alt="Fluxo do Visitante" width="900">
</p>

1. O Visitante acessa a Landing Page.
2. O Frontend dispara uma requisição `GET /api/ads`.
3. O Backend consulta o banco (`SELECT * FROM ads`) e retorna um JSON com status 200.
4. O Frontend renderiza os anúncios em cards.
5. O Visitante clica em um filtro (ex: "Livros").
6. O Frontend atualiza o estado e dispara `GET /api/ads?category=Livros`.
7. O Backend adiciona a cláusula `WHERE` e devolve os dados atualizados para nova renderização.

### 5.2 Fluxo de Autenticação (Login via Zustand)

<p align="center">
  <img src="./docs/engenharia/fluxo-login.png" alt="Fluxo de Login" width="900">
</p>

1. O Visitante preenche E-mail e Senha e envia o formulário.
2. O Backend recebe o JSON (`POST /api/auth/login`) e busca o usuário no banco.
3. Decisão: A senha bate com o Hash? Se Não, retorna 401. Se Sim, gera Token JWT e retorna 200 OK.
4. O Frontend (via Zustand) recebe o JWT e os dados, salvando-os automaticamente no `localStorage`.
5. O usuário é redirecionado para a área restrita do PWA.

### 5.3 Fluxo de Registro (Call To Action e Criação de Conta)

<p align="center">
  <img src="./docs/engenharia/fluxo-registro.png" alt="Fluxo de Registro" width="900">
</p>

1. O Visitante é impactado pelo botão "Criar Conta" na Landing Page e clica.
2. O Frontend intercepta e altera a rota para a página de Registro.
3. O Visitante preenche os dados (Nome, E-mail, Senha e WhatsApp) e submete.
4. O Backend aplica criptografia na senha e executa `INSERT INTO users`.
5. Com sucesso (201 Created), o Frontend exibe feedback positivo e redireciona automaticamente o novo aluno para a tela de Login.

### 5.4 Fluxo de Criação de Anúncio

<p align="center">
  <img src="./docs/engenharia/fluxo-anuncio.png" alt="Fluxo de Criação de Anúncio" width="900">
</p>

1. O usuário logado clica em "Novo Anúncio" e o Frontend renderiza o formulário.
2. O usuário preenche os campos do item e salva.
3. O Frontend anexa o JWT (capturado do estado global) no cabeçalho e dispara o `POST`.
4. O Backend valida o token, extrai o ID do usuário e insere o anúncio associado a ele no banco.
5. O Frontend recebe o ID gerado, redirecionando automaticamente para a rota de detalhes daquele anúncio recém-criado.

### 5.5 Fluxo de Interesse (Contatar Anunciante)

<p align="center">
  <img src="./docs/engenharia/fluxo-interesse.png" alt="Fluxo de Interesse" width="900">
</p>

1. Um interessado visualiza os detalhes de um anúncio que gostou.
2. Clica no botão "Tenho Interesse (WhatsApp)".
3. O Frontend captura o número do vendedor e o título do anúncio do estado atual.
4. O Frontend formata uma mensagem padronizada (`encodeURIComponent`) e constrói a URL `wa.me`.
5. O navegador abre o aplicativo WhatsApp para negociação direta, saindo do escopo da aplicação.

---

## 6. Modelagem do Banco de Dados

Aplicando o princípio de **YAGNI** (*You Aren't Gonna Need It*) para focar estritamente no escopo e no prazo do edital, o banco de dados PostgreSQL foi arquitetado com duas tabelas essenciais sob relação `1:N`.

### Tabela 1: `users` (Usuários)

| Coluna | Tipo de Dado | Restrições | Descrição |
|:---|:---|:---|:---|
| **`id`** | `UUID` | **Primary Key** | Identificador único do usuário. |
| **`name`** | `VARCHAR` | Not Null | Nome completo ou apelido. |
| **`email`** | `VARCHAR` | Not Null, Unique | E-mail para login. |
| **`password_hash`** | `VARCHAR` | Not Null | Senha encriptada. |
| **`whatsapp`** | `VARCHAR` | Not Null | Número para contato. (Armazenado aqui dada a relação 1:1) |
| **`created_at`** | `TIMESTAMP` | Default: `NOW()` | Data de criação da conta. |

### Tabela 2: `ads` (Anúncios / Desapegos)

| Coluna | Tipo de Dado | Restrições | Descrição |
|:---|:---|:---|:---|
| **`id`** | `UUID` | **Primary Key** | Identificador único do anúncio. |
| **`title`** | `VARCHAR` | Not Null | Título do item (Ex: Livro de Cálculo). |
| **`description`** | `TEXT` | Not Null | Estado e detalhes do item. |
| **`category`** | `VARCHAR` | Not Null | Utilizado para sistema de filtros. |
| **`price`** | `DECIMAL(10,2)` | Not Null | Valor monetário (0.00 = Doação). |
| **`image_url`** | `VARCHAR` | Not Null | Link público da imagem. |
| **`user_id`** | `UUID` | **Foreign Key** | Relaciona o anúncio ao criador (1:N). |
| **`created_at`** | `TIMESTAMP` | Default: `NOW()` | Ordenação cronológica na vitrine. |

---

## 7. Conclusão

A etapa de Engenharia de Software e Modelagem garante que o desenvolvimento do "Desapego Universitário" inicie com bases extremamente sólidas. O escopo restrito elimina *overengineering* (como chats internos ou uploads complexos), permitindo o foco total na entrega de uma API limpa com Node.js/PostgreSQL e um Frontend moderno, reativo e roteado utilizando React, Zustand para estado local e padrões PWA de altíssima performance.

---

## 8. 🤖 Diário de Bordo da IA

**Etapa #1: Engenharia de Requisitos, Modelagem e Arquitetura**
* **Objetivo:** Interpretar o edital e converter os requisitos brutos em uma documentação de software padronizada, validando fluxos, regras de negócio e modelagem de dados antes de escrever qualquer código.
* **Como a IA foi utilizada:**
  * **Compreensão de Escopo e Negócio:** A IA atuou como parceira crítica de projeto para definir os limites do sistema. Debatemos o impacto de implementar um sistema próprio de chat, concluindo que o uso de links dinâmicos para o WhatsApp seria a solução técnica mais inteligente frente ao prazo do edital.
  * **Melhoria da Visualização (Engenharia de Software):** Como o desenho de UMLs exige precisão, a IA ajudou a mapear minuciosamente os diagramas de atividade. Ela estruturou a lógica de "raias" (responsabilidades) detalhando o momento exato em que a ação sai do Usuário, passa pelo Frontend (e pelo *Router* do React), é validada pelo Backend via JWT e atinge o Banco de Dados. Isso eliminou "pontos cegos" na navegação.
  * **Arquitetura e Banco de Dados (Evitando Superengenharia):** A IA foi fundamental para revisar as Formas Normais do banco de dados relacional. Discutimos a viabilidade técnica de isolar o número de telefone em uma terceira tabela; através da IA, validamos a adoção do princípio YAGNI (*You Aren't Gonna Need It*), mantendo o `whatsapp` na tabela de usuários devido ao contexto restrito (1:1), poupando tempo de consultas (`JOINs`) no banco e simplificando a lógica da API RESTful.
