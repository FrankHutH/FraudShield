# Relatório Técnico — FraudShield
**Arquitetura, componentes, rotas e implementação da API**

## 1. Como o JSON será consumido?

Fluxo de execução:

`Arquivo JSON → API Next.js → HTTP GET → fetch() → useState() → Interface React`

- **Servidor:** lê os dados do arquivo JSON e os disponibiliza por um endpoint.
- **Front-end:** utiliza `fetch()` dentro de `useEffect()` para solicitar os dados.
- **React:** armazena o retorno em `useState()` e atualiza a interface.
- **Tratamento de erros:** verifica o status HTTP e apresenta mensagens de carregamento ou falha.

A API retornará `Content-Type: application/json`, com status HTTP adequados.

## 2. Como a API será implementada?

A implementação seguirá a arquitetura de Route Handlers do Next.js.

| Arquivo | Responsabilidade |
|---|---|
| `data/situacoes.json` | Dados das situações dos jogos |
| `data/mensagens.json` | Mensagens e sinais suspeitos |
| `app/api/situacoes/route.js` | Endpoint `GET /api/situacoes` |
| `app/api/mensagens/route.js` | Endpoint `GET /api/mensagens` |
| `components/` | Componentes que consomem a API e exibem os dados |

O JSON ficará centralizado no servidor, separado dos componentes visuais.

## 3. Quais componentes executam no servidor e no cliente?

| Componente | Ambiente | Função |
|---|---|---|
| `RootLayout` | Servidor | Estrutura compartilhada |
| `Header` | Servidor | Cabeçalho |
| `Footer` | Servidor | Rodapé |
| `Card` | Servidor | Cartões reutilizáveis |
| `Navbar` | Cliente | Navegação e rota ativa |
| `ThemeToggle` | Cliente | Alternância de tema |
| `LegacyScripts` | Cliente | Integração com JavaScript legado |
| `Quiz1` e `Quiz2` (migração planejada) | Cliente | Consumo da API, interação e pontuação |
| `route.js` | Servidor | Processamento das requisições da API |

Os componentes cliente podem ter HTML pré-renderizado no servidor, mas seus eventos e efeitos executam no navegador.

## 4. Como os componentes estão conectados?

`RootLayout → Header → Navbar / ThemeToggle`

`RootLayout → Páginas → Card`

`RootLayout → Footer`

**Após a implementação da API:**

`Página do jogo → Componente React → fetch() → API Next.js → JSON`

A resposta retorna ao componente, que atualiza o estado e renderiza o conteúdo.

## 5. Quais rotas existem?

| Rota | Finalidade |
|---|---|
| `/` | Início |
| `/sobre` | Sobre |
| `/golpes` | Tipos de golpes |
| `/dicas` | Prevenção |
| `/quiz` | Seleção dos jogos |
| `/quiz1` | Golpe ou Seguro |
| `/quiz2` | Encontre os Sinais |
| `/contato` | Contato |

**Novas rotas planejadas da API:** `/api/situacoes` e `/api/mensagens`.

As oito rotas de páginas são caminhos fixos. Rotas dinâmicas parametrizadas ainda não foram implementadas.

## 6. Como serão divididas as responsabilidades?

**Back-end (Next.js):** disponibilizar dados JSON, processar requisições HTTP, definir respostas e tratar erros de servidor.

**Front-end (React):** executar `fetch()`, controlar estados com `useState()`, carregar dados com `useEffect()`, tratar erros na interface e permitir a interação com os jogos.

**Persistência:** a pontuação continuará no `localStorage`. Não será necessário banco de dados para o requisito de API com JSON fixo.

