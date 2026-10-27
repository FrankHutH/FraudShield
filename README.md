<p align="center">
  <img src="Projeto%201/docs/logo.png" alt="Logo do FraudShield" width="160">
</p>

<h1 align="center">FraudShield</h1>


<p align="center">
  <strong>Integrante:</strong> Murilo Lobato — <strong>RA:</strong> 10752958
</p>

---

<p align="center">
  <img src="Projeto%201/docs/inicio.jpg" alt="Página inicial do FraudShield no tema claro" width="49%">
  <img src="Projeto%201/docs/jogo.jpg" alt="Jogo Golpe ou seguro? no tema escuro" width="49%">
</p>

## Ideação

Os golpes agora usam voz clonada, imagens falsas e mensagens feitas por IA, e as pessoas idosas são as mais atingidas. O FraudShield ensina a se proteger na prática, com conteúdo simples e dois jogos: identificar se uma situação é golpe e achar os sinais de alerta em mensagens suspeitas.

## Caráter extensionista

- Público real, não técnico — foco em pessoas idosas, alvo comum de golpe.
- Gratuito, roda offline/local, pode ser usado em oficina, telecentro, biblioteca.
- Ensina atitude prática (confirmar por outro canal, não repassar senha), não teoria.

## Como rodar no Next.js

Pré-requisito: Node.js 20.9 ou superior.

```bash
npm install
npm run dev
```

Abra http://localhost:3000. **Todas as oito páginas** são renderizadas por rotas Next.js:
`/`, `/sobre`, `/golpes`, `/dicas`, `/quiz`, `/quiz1`, `/quiz2` e `/contato`.

Para testar a compilação de produção:

```bash
npm run build
npm run start
```


## Os jogos

| | Jogo | Como funciona |
|---|---|---|
| **Fase 1** | Golpe ou seguro? | Toque numa situação e escolha a caixa certa (ou arraste o cartão). |
| **Fase 2** | Encontre os sinais | Toque nas palavras suspeitas de uma mensagem e clique em verificar. |

Cada acerto vale 10 pontos. O placar e o recorde ficam salvos no navegador.

## Wireframes

| Início | Sobre | Golpes |
|---|---|---|
| ![Início](Projeto%201/wireframes/index.svg) | ![Sobre](Projeto%201/wireframes/sobre.svg) | ![Golpes](Projeto%201/wireframes/golpes.svg) |

| Dicas | Quadro | Quiz |
|---|---|---|
| ![Dicas](Projeto%201/wireframes/dicas.svg) | ![Quadro](Projeto%201/wireframes/quadro.svg) | ![Quiz](Projeto%201/wireframes/quiz.svg) |

| Quiz 1 | Quiz 2 | Contato |
|---|---|---|
| ![Quiz 1](Projeto%201/wireframes/quiz1.svg) | ![Quiz 2](Projeto%201/wireframes/quiz2.svg) | ![Contato](Projeto%201/wireframes/contato.svg) |

Fixou cedo: cabeçalho + menu, hero texto/imagem, 4 cartões de destaque, rodapé simples.

## Estrutura atual e migração do Projeto 1

```
app/                 oito rotas Next.js, cada uma com page.jsx
components/          ThemeToggle.jsx e LegacyScripts.jsx
styles/globals.css   estilos gerais da página inicial
styles/pages/        CSS migrado das outras sete páginas
public/img/          logo e favicon acessíveis pelo navegador
public/js/           lógica original dos jogos (integração temporária)
Projeto 1/           cópia integral da primeira versão do projeto
  html/              oito páginas HTML originais
  css/               oito arquivos CSS originais
  js/                scripts originais
  img/               imagens originais
  wireframes/        protótipos originais
  docs/              ilustrações para o README
  README.md          tutorial original do Projeto 1
```

**Migração das oito páginas:** as antigas marcações HTML foram convertidas para JSX em `app/`; links como `quiz.html` tornaram-se `/quiz`, `class` tornou-se `className` e os atributos de formulários foram adaptados ao React. O CSS de cada página foi mantido em `styles/pages/`, além do CSS geral. Não há Tailwind ou CSS-in-JS.

**Interatividade durante a migração:** o alternador de tema usa um pequeno componente cliente; os jogos e o formulário ainda carregam a lógica JavaScript original em ordem pelo `LegacyScripts`. Isso mantém o comportamento do Projeto 1 até a migração da lógica para componentes e hooks React. A rota de API e as rotas dinâmicas ainda não foram implementadas.

**Arquivos originais:** toda a versão anterior está preservada em `Projeto 1/`. A pasta pode ser aberta diretamente para estudar ou comparar com as páginas em Next.js.

**Uso de IA:** o ChatGPT (OpenAI) ajudou a converter as oito páginas HTML para JSX, adaptar os CSS e os caminhos de navegação, preservar os scripts durante a migração e organizar o projeto anterior no diretório `Projeto 1/`. A autoria intelectual e o domínio do código devem ser assumidos pelo integrante na apresentação.


## Tutorial do código

**Next.js e JSX** — toda navegação passa pelas oito rotas do diretório `app/`. O layout raiz carrega `styles/globals.css`; cada página adicional importa seu próprio CSS. `LegacyScripts` carrega os scripts dependentes em sequência depois da renderização.

**HTML original** — sem `<div>`; layout feito com `flex`/`grid` direto em tags semânticas (`section`, `ul`, `article`); `details`/`summary` nos golpes expansíveis; `progress` na barra do quiz.

**CSS** — cada página tem o seu arquivo, com o visual comum (cores, cabeçalho, botões, cartões) e só as partes que ela usa: as regras dos jogos ficam só em `quiz1.css` e `quiz2.css`, por exemplo. As cores saem da logo (azul-marinho + ciano) e ficam em `:root` e `:root[data-tema="escuro"]`; o resto usa `var(--cor)`.

**Visual 8-bit** — fonte pixelada "Press Start 2P" nos títulos, botões e placares (carregada do Google Fonts; sem internet cai para monoespaçada), contornos de 4px com cantos "comidos" feitos com `box-shadow` (variável `--caixa`), botões que afundam no clique, grade quadriculada no fundo, cursor piscando nos títulos e barra de progresso em blocos. A logo de 48px é ampliada com `image-rendering: pixelated`. O texto corrido continua em fonte comum de 18px, pensando na leitura do público idoso; as animações param com `prefers-reduced-motion`.

**`tema.js`** — lê tema salvo (ou preferência do sistema), aplica em `data-tema`, salva no clique do botão.

**`progresso.js`** — só lida com números no `localStorage`: pontos, recorde, conclusão, e `sortearRodada()` embaralha e corta a lista de situações/mensagens.

**`feedback.js`** — `criarElemento()`, `mostrarResultado()` (escreve em `role="status"`) e `destacarResultado()` (move o foco), usados pelos dois jogos.

**`js/dados/*.js`** — só listas de objetos (texto + resposta/sinais). Adicionar conteúdo = adicionar um item na lista, nada mais.

**`quiz1.js`** — cartões sorteados de `bancoSituacoes`; cada um é arrastável e também um `<button>` (acessível por teclado); `classificar()` roda no clique ou no `drop`; some pontos e marca conclusão ao fim da rodada.

**`quiz2.js`** — mensagem quebrada em palavras clicáveis; `normalizar()` tira acento/maiúscula/pontuação pra comparar; `verificar()` marca cada palavra como certa (✓), errada (✕) ou perdida (!).

**`quiz.js`** — só lê o que `progresso.js` salvou e atualiza a barra; reage a `pageshow` e ao evento `storage` (sincroniza entre abas).

**`contato.js`** — não envia nada; monta o texto e copia com `navigator.clipboard`, com fallback de seleção manual se a API falhar.

## Acessibilidade

`aria-pressed`, `aria-current`, `aria-label`, `role="status"`; foco movido após cada resultado; jogável por mouse, toque, teclado e arrastar; progresso salvo local, sem servidor.

## Aprendizados

- Tirar o `<div>` força pensar em significado antes de estilo.
- Acessibilidade é extremamente importante.
- Separar dados (`js/dados/`) da lógica facilita crescer o conteúdo, além de deixar mais organizado.
- Dois jogos diferentes puderam reaproveitar `progresso.js`/`feedback.js` sem framework.
