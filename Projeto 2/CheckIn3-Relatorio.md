# Relatório do Check-in 3 — FraudShield

**Projeto único: Next.js 15 + React 19.**

## Dados e APIs

| Dados | Quantidade | Endpoint GET | Interface React |
|---|---:|---|---|
| `data/situacoes.json` | 62 | `/api/situacoes` | Fase 1, `JogoSituacoes` |
| `data/mensagens.json` | 55 | `/api/mensagens` | Fase 2, `JogoMensagens` |
| `data/golpes.json` | 3 | `/api/golpes` | `ListaGolpesAPI` |

Os `route.js` do Next.js importam o arquivo JSON correspondente e respondem com `Response.json(dados)`, status 200 e tipo `application/json`. O React realiza a consulta com `fetch` dentro de `useEffect`, guarda a lista em `useState`, mostra loading/erro/retry e renderiza o jogo após receber os dados. Não utiliza arquivos JS de perguntas nem scripts inseridos no DOM.

## Componentes e regras

- `RootLayout`: renderiza o cabeçalho, rota atual e rodapé comuns.
- `CarregadorJogo`: consulta as APIs, valida o array e gerencia carregamento e falha.
- `JogoSituacoes`: classifica quatro situações por rodada (botões ou arrastar).
- `JogoMensagens`: seleciona e corrige palavras suspeitas em quatro mensagens por rodada, incluindo mensagens sem sinais.
- `lib/jogos.mjs`: sorteio, acerto/erro e normalização das palavras.
- `lib/progresso.mjs` e `PlacarJogos`: pontuação, recordes e conclusão salvos localmente; cada acerto completo vale 10 pontos.
- `ListaGolpesAPI`: consulta `/api/golpes` e liga à rota dinâmica `/golpes/[id]`; IDs inválidos retornam 404.
- `FormContato`: formulário local que copia mensagem, sem envio.

**Fluxo:** `JSON → API Next.js → HTTP GET → fetch/useEffect → useState React → jogo React`.

## Testar e demonstrar

```bash
cd "Projeto 2"
npm install
npm test
npm run build
npm run test:smoke
npm run dev
```

Abra `/api/situacoes`, `/api/mensagens`, `/api/golpes` e depois `/quiz1`, `/quiz2`, `/golpes` e `/golpes/1`. Os testes verificam o formato, a integridade dos JSONs, regras, pontuação, rotas e respostas HTTP reais. Interações visuais em navegador não estão integralmente cobertas por esses testes.

## Escopo

Não há banco de dados, POST, autenticação ou edição online das perguntas. Os arquivos JSON são importados durante o build; para alterar o conteúdo em produção é necessário fazer novo build e deploy.

A estrutura legada do Projeto 1 e os scripts `public/js` foram removidos. A aplicação utiliza somente Next.js/React para as páginas e interações; CSS é usado apenas para aparência. A implementação e a documentação tiveram apoio de IA (ChatGPT/OpenAI).
