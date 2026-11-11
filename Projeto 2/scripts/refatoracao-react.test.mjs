import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const ler = (arquivo) =>
  readFileSync(new URL("../" + arquivo, import.meta.url), "utf8");

test("carregadores usam async/await e try/catch, sem cadeias de Promises", () => {
  for (const arquivo of [
    "components/CarregadorJogo.jsx",
    "components/ListaGolpesAPI.jsx",
  ]) {
    const codigo = ler(arquivo);

    assert.match(codigo, /async function carregar/);
    assert.match(codigo, /await fetch\(/);
    assert.match(codigo, /await resposta\.json\(\)/);
    assert.match(codigo, /\btry\s*\{/);
    assert.match(codigo, /\bcatch\s*\{/);
    assert.doesNotMatch(codigo, /\.then\s*\(|\.catch\s*\(/);
  }
});

test("carregadores isolam estados em funcoes de renderizacao", () => {
  const jogo = ler("components/CarregadorJogo.jsx");
  const golpes = ler("components/ListaGolpesAPI.jsx");

  assert.match(jogo, /function renderizarJogo\(\)/);
  assert.match(jogo, /if \(erro\)/);
  assert.match(jogo, /if \(!dados\)/);
  assert.match(jogo, /return renderizarJogo\(\)/);
  assert.match(jogo, /controller\.abort\(\)/);
  assert.match(jogo, /Tentar novamente/);

  assert.match(golpes, /function renderizarGolpes\(\)/);
  assert.match(golpes, /if \(carregando\)/);
  assert.match(golpes, /if \(erro\)/);
  assert.match(golpes, /if \(golpes\.length === 0\)/);
  assert.match(golpes, /\{renderizarGolpes\(\)\}/);
});

test("jogo de mensagens usa funcoes para cor e simbolo das palavras", () => {
  const codigo = ler("components/JogoMensagens.jsx");

  assert.match(codigo, /function classePalavra\(/);
  assert.match(codigo, /function simboloPalavra\(/);
  assert.match(codigo, /classePalavra\(verificada, sinal, marcada\)/);
  assert.match(codigo, /simboloPalavra\(verificada, sinal, marcada\)/);
});

test("arquivos React nao possuem caracteres invisiveis indesejados", () => {
  for (const arquivo of [
    "components/CarregadorJogo.jsx",
    "components/ListaGolpesAPI.jsx",
    "components/JogoMensagens.jsx",
  ]) {
    assert.doesNotMatch(ler(arquivo), /[\u200B-\u200F\uFEFF\u00A0]/);
  }
});
