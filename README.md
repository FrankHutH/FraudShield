# FraudShield

Aplicação educativa para aprender a identificar golpes digitais. **Somente o Projeto 2 permanece:** Next.js 15 + React 19, com dois jogos e três APIs que servem dados de arquivos JSON.

## Iniciar

É necessário Node.js 20.9+.

```bash
cd "Projeto 2"
npm install
npm run dev
```

Acesse http://localhost:3000.

## Testar

```bash
cd "Projeto 2"
npm test
npm run build
npm run test:smoke
```

## Como os jogos usam JSON

- `data/situacoes.json` → `GET /api/situacoes` → `fetch()` no React → Fase 1.
- `data/mensagens.json` → `GET /api/mensagens` → `fetch()` no React → Fase 2.
- `data/golpes.json` → `GET /api/golpes` → `fetch()` no React → exemplos de golpes.

Não há `public/js`, scripts injetados, arquivos HTML independentes ou questões duplicadas em JS. Os arquivos `.jsx` são componentes React; `.js` dos endpoints e `.mjs` de configuração, regras e testes são código necessário do projeto Next.js. Os arquivos `.css` restantes são **apenas estilos da aplicação Next.js**, sem páginas HTML legadas.

**Documentação e relatório do check-in final:** [Projeto 2/README.md](Projeto%202/README.md) e [CheckIn3-Relatorio.md](Projeto%202/CheckIn3-Relatorio.md).

## Publicação

O `amplify.yml` publica o projeto `Projeto 2` como Next.js SSR no AWS Amplify. Configurar o appRoot como `Projeto 2`.

**Uso de IA:** ChatGPT foi utilizado como apoio na implementação, migração, testes e documentação.
