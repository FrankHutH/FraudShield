# FraudShield — Projeto 2 (Next.js + React)
Única implementação mantida. Node.js 20.9 ou superior.
```bash
cd "Projeto 2"
npm install
npm test
npm run build
npm run test:smoke
npm run dev
```
Abra http://localhost:3000.

## Arquitetura
- `app/`: rotas Next.js, incluindo as oito páginas e `/api/golpes`, `/api/situacoes`, `/api/mensagens`.
- `data/`: arquivos JSON que são a fonte única de dados. Não há bancos duplicados em JavaScript.
- `components/`: interface e jogos React (`JogoSituacoes`, `JogoMensagens`, `Placar`, `ContatoForm`).
- `styles/`: CSS utilizado pelos componentes Next.js. Não existe site HTML/CSS/JS independente.
- `public/img/`: imagens compartilhadas.

## Como os jogos consomem JSON
`data/situacoes.json` e `data/mensagens.json` são importados pelas rotas GET de `app/api/`.
O componente React `CarregadorJogo` usa `fetch("/api/situacoes")` ou `fetch("/api/mensagens")` em `useEffect`, valida o array, armazena em `useState` e passa os dados para o componente do jogo.
Os jogos criam suas rodadas com esses dados e guardam pontos e conclusão no `localStorage`. Nenhum script em `public/js` é carregado.

## Nota
Os arquivos `.jsx` contêm JavaScript de React, e `route.js` é o nome esperado pelo Next.js para rotas de API. CSS em `styles/` é somente a apresentação do Next.js, não uma segunda implementação.
