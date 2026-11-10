# Check-in 3 — Relatório técnico do FraudShield

**Projeto 2 | Next.js 15, React 19, API JSON e rotas dinâmicas**

## 1. Como o JSON é consumido?

Os conteúdos ficam em três arquivos JSON dentro da pasta `data/`:

| Arquivo | Uso |
|---|---|
| `data/situacoes.json` | 62 situações de "Golpe ou seguro?" (Fase 1) |
| `data/mensagens.json` | 55 mensagens de "Encontre os sinais" (Fase 2) |
| `data/golpes.json` | Exemplos de golpes e orientações na página /golpes |

**Fluxo dos jogos:**

`JSON → Route Handler do Next.js → resposta HTTP GET → fetch() em useEffect() → useState() do React → lógica do jogo → interface`

O navegador não lê arquivos da pasta `data/` diretamente. Ao abrir o jogo, `CarregadorJogo.jsx` usa `fetch()` para consultar a API. O React guarda a lista em `useState()`. Somente depois de receber uma lista válida, o componente disponibiliza os dados aos scripts do jogo, preservados da versão anterior.

Durante a requisição há uma mensagem de carregamento. Se houver erro HTTP, JSON inválido ou falha de conexão, o usuário vê uma mensagem de erro e um botão "Tentar novamente". A Fase 2 inicia com "Verificar" desabilitado até os dados estarem prontos.

## 2. Como a API foi implementada?

Foi utilizada a pasta `app/api/` do Next.js, sem bibliotecas de terceiros e sem banco de dados.

| Endpoint | Arquivo | Resposta |
|---|---|---|
| `GET /api/situacoes` | `app/api/situacoes/route.js` | Lista de situações |
| `GET /api/mensagens` | `app/api/mensagens/route.js` | Lista de mensagens |
| `GET /api/golpes` | `app/api/golpes/route.js` | Lista de golpes |

Cada rota importa seu JSON no servidor e responde usando `Response.json(dados)`, que envia status 200 e o cabeçalho `Content-Type: application/json`. Os arquivos JSON são fixos, incorporados ao build; não existe edição em tempo real nem API POST.

## 3. Componentes de servidor e cliente

| Componente | Ambiente | Responsabilidade |
|---|---|---|
| `RootLayout`, `Header`, `Footer`, `Card` | Servidor | Estrutura comum, layout e cartões |
| `Navbar`, `ThemeToggle` | Cliente | Navegação ativa e tema |
| `ListaGolpesAPI` | Cliente | Consulta `/api/golpes`, mostra cartões |
| `CarregadorJogo` | Cliente | Consulta as APIs dos jogos com `fetch`, `useEffect` e `useState` |
| `LegacyScripts` | Cliente | Carrega a lógica existente depois que o React recebeu os dados |
| `app/api/*/route.js` | Servidor | Responde a consultas HTTP GET |
| `app/golpes/[id]/page.jsx` | Servidor | Mostra um golpe por ID, ou página 404 |

A lógica de interação e pontuação de `public/js/quiz1.js` e `quiz2.js` foi mantida. Os bancos antigos `public/js/dados/situacoes.js` e `mensagens.js` foram eliminados para evitar dados duplicados.

## 4. Como os componentes estão conectados?

`RootLayout → Header + Página + Footer`

`Header → Navbar + ThemeToggle`

`/quiz1 → CarregadorJogo → GET /api/situacoes → data/situacoes.json`

`/quiz2 → CarregadorJogo → GET /api/mensagens → data/mensagens.json`

`CarregadorJogo → LegacyScripts → public/js/quiz1.js ou quiz2.js`

`/golpes → ListaGolpesAPI → GET /api/golpes → data/golpes.json`

O React controla os estados de carregamento, sucesso e erro. Os scripts dos jogos geram cartões, verificam respostas e salvam pontos no `localStorage` somente após o carregamento.

## 5. Rotas existentes

Páginas fixas: `/`, `/sobre`, `/golpes`, `/dicas`, `/quiz`, `/quiz1`, `/quiz2`, `/contato`.

Rota dinâmica: `/golpes/[id]`, por exemplo `/golpes/1`. O ID é usado para localizar o item em `data/golpes.json`; IDs inexistentes retornam 404.

Rotas API: `/api/situacoes`, `/api/mensagens`, `/api/golpes`.

## 6. Responsabilidades e persistência

- **Back-end:** importa os JSONs e devolve respostas HTTP por rotas GET.
- **React:** busca os dados, guarda o estado e apresenta carregamento ou erro.
- **JavaScript dos jogos:** sorteia itens carregados, avalia as respostas e atualiza o placar.
- **Persistência:** `localStorage` armazena pontuação, recordes e conclusão das fases no próprio navegador.

Não há banco de dados, cadastro de usuários nem endpoints para gravar novas questões. Isso não é necessário para demonstrar a API JSON fixa do check-in.

## 7. Testes automatizados e demonstração

Na pasta `Projeto 2`, execute:

```bash
npm install
npm test
npm run build
npm run test:smoke
```

`npm test` verifica estrutura, formatos dos JSONs, consistência dos sinais, ligação dos componentes React e preservação da pontuação. `test:smoke` inicia um servidor real de produção, consulta as três APIs via HTTP, compara seus retornos com os JSONs, acessa as páginas e verifica a rota dinâmica e a resposta 404.

Para apresentar: abra `/api/situacoes`, `/api/mensagens` e `/api/golpes`, depois navegue para `/quiz1`, `/quiz2` e `/golpes`. A consulta dos jogos ocorre no carregamento da página, sem dados duplicados no JavaScript.

**Apoio de IA:** o ChatGPT foi utilizado para auxiliar na migração e documentação. A implementação e suas decisões devem ser compreendidas e explicadas durante a apresentação.
