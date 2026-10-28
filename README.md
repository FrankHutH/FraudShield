# FraudShield

Projeto educacional de prevenção a golpes digitais, voltado principalmente a pessoas idosas.

## Versões

- **[Projeto 1](Projeto%201/README.md)** — versão original em HTML, CSS e JavaScript, mantida sem alterações.
- **[Projeto 2](Projeto%202/README.md)** — migração para React/Next.js com componentes de interface reutilizáveis e oito páginas.

## Diagrama dos componentes — Projeto 2

O diagrama abaixo mostra **quais componentes renderizam ou utilizam outros componentes** na aplicação Next.js. As setas representam essas relações, conforme os arquivos reais da pasta `Projeto 2/`.

```mermaid
flowchart TB
    ROOT["app/layout.jsx<br/>RootLayout"]
    HEADER["Header.jsx<br/>Cabeçalho comum"]
    ROUTES["8 páginas Next.js<br/>/, /sobre, /golpes, /dicas<br/>/quiz, /quiz1, /quiz2, /contato"]
    FOOTER["Footer.jsx<br/>Rodapé comum"]
    NAV["Navbar.jsx<br/>Navegação e rota ativa"]
    THEME["ThemeToggle.jsx<br/>Tema claro/escuro"]
    CARD["Card.jsx<br/>Cartões reutilizáveis"]
    LEGACY["LegacyScripts.jsx<br/>Integração JavaScript existente"]
    JS["public/js/<br/>Jogos, progresso e contato"]
    ROOT -->|"renderiza"| HEADER
    ROOT -->|"{children}"| ROUTES
    ROOT -->|"renderiza"| FOOTER
    HEADER --> NAV
    HEADER --> THEME
    ROUTES -->|"Início, Sobre, Golpes, Dicas, Jogos"| CARD
    ROUTES -->|"Jogos e Contato"| LEGACY
    LEGACY -->|"carrega scripts"| JS
    classDef raiz fill:#173c63,color:#fff,stroke:#173c63,stroke-width:2px
    classDef estrutura fill:#e8f2ff,color:#1a3853,stroke:#386b9b
    classDef paginas fill:#e8faf2,color:#14573f,stroke:#2c8a6d
    classDef componentes fill:#f0efff,color:#312d66,stroke:#726db3
    classDef legado fill:#f4f6f8,color:#435466,stroke:#95a3af
    class ROOT raiz
    class HEADER,FOOTER estrutura
    class ROUTES paginas
    class NAV,THEME,CARD,LEGACY componentes
    class JS legado
```

**Como ler:** `app/layout.jsx` renderiza `Header`, o conteúdo da rota (`children`) e `Footer`. `Header` utiliza `Navbar` e `ThemeToggle`. As páginas Início, Sobre, Golpes, Dicas e Jogos reutilizam `Card`. As rotas Jogos e Contato utilizam `LegacyScripts` para carregar os scripts originais de `public/js/`.

**Código-fonte:** [componentes React](Projeto%202/components/) · [layout do Next.js](Projeto%202/app/layout.jsx) · [diagrama editável](Projeto%202/docs/diagrama-componentes.mmd).

## Rodar o Projeto 2

Pré-requisito: Node.js 20.9 ou superior.

```bash
cd "Projeto 2"
npm install
npm run dev
```

Acesse http://localhost:3000. Veja o tutorial e a declaração de uso de IA no README do Projeto 2.
