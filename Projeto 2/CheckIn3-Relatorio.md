# Check-in 3 — Relatório técnico do FraudShield

## 1. Tecnologias
O FraudShield usa **Next.js 15** e **React 19**. Tem oito páginas, dois jogos e três APIs GET. Os dados ficam em arquivos JSON. Não usa banco de dados.

## 2. Consumo do JSON
Os dados estão em:
- `data/situacoes.json`: 62 situações da Fase 1.
- `data/mensagens.json`: 55 mensagens da Fase 2.
- `data/golpes.json`: exemplos da página Golpes.

**Fluxo:** JSON → API Next.js → `fetch()` → `useState()` → componente React → tela.

Ao abrir um jogo, `CarregadorJogo.jsx` chama a API em `useEffect()`, valida a resposta e guarda os dados em `useState()`. Enquanto carrega, mostra uma mensagem. Se houver erro, oferece **Tentar novamente**. Os jogos não carregam arquivos JavaScript antigos.

## 3. APIs
| Método e rota | Fonte |
|---|---|
| `GET /api/situacoes` | `data/situacoes.json` |
| `GET /api/mensagens` | `data/mensagens.json` |
| `GET /api/golpes` | `data/golpes.json` |

Os arquivos `app/api/*/route.js` importam os JSONs e retornam `Response.json()`. Os dados são fixos e entram no build. Não há POST nem cadastro.

## 4. Componentes
- **`RootLayout`, `Header` e `Footer`:** estrutura das páginas.
- **`Navbar` e `ThemeToggle`:** menu e tema.
- **`ListaGolpesAPI`:** busca e mostra os golpes.
- **`CarregadorJogo`:** busca as perguntas pela API.
- **`JogoSituacoes`:** Fase 1, classificar golpe ou seguro.
- **`JogoMensagens`:** Fase 2, marcar sinais suspeitos.
- **`Placar`:** pontos e progresso.
- **`ContatoForm`:** prepara uma mensagem para copiar.

**Ligações principais:**
```text
RootLayout → Header + página + Footer
/quiz1 → CarregadorJogo → /api/situacoes → situacoes.json
                     → JogoSituacoes
/quiz2 → CarregadorJogo → /api/mensagens → mensagens.json
                     → JogoMensagens
/golpes → ListaGolpesAPI → /api/golpes → golpes.json
/quiz → Placar
```

## 5. Rotas
Páginas: `/`, `/sobre`, `/golpes`, `/dicas`, `/quiz`, `/quiz1`, `/quiz2` e `/contato`.

A rota dinâmica `/golpes/[id]` mostra um golpe pelo ID do JSON. Se o ID não existir, retorna **404**.

## 6. Pontuação
Cada acerto vale **10 pontos**. Os jogos guardam pontos, recordes e fases concluídas no `localStorage` do navegador. O placar permite zerar esses dados.

## 7. Testes
Na pasta `Projeto 2`:
```bash
npm install
npm test
npm run build
npm run test:smoke
```

Os testes verificam os JSONs, as APIs, as páginas e as rotas. A versão enviada à `main` passou na execução automatizada do GitHub Actions.

## 8. Demonstração
Abra `/api/situacoes` e `/api/mensagens` para mostrar o JSON retornado. Depois abra `/quiz1` e `/quiz2`: os componentes React usam essas respostas para montar os jogos. Em `/golpes`, mostre os exemplos e abra uma rota `/golpes/[id]`.

**Apoio de IA:** o ChatGPT auxiliou na implementação e na documentação.
