import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";

const arquivo = (nome) => new URL("../" + nome, import.meta.url);
const ler = (nome) => readFileSync(arquivo(nome), "utf8");

test("o projeto antigo não reaparece e os jogos são React", () => {
  assert.equal(existsSync(new URL("../../Projeto 1", import.meta.url)), false);
  assert.equal(existsSync(arquivo("public/js")), false);
  assert.equal(existsSync(arquivo("components/LegacyScripts.jsx")), false);
  for (const arquivoJogo of ["JogoSituacoes.jsx", "JogoMensagens.jsx"]) {
    const codigo = ler("components/" + arquivoJogo);
    assert.match(codigo, /"use client"/);
    assert.match(codigo, /useState/);
    assert.doesNotMatch(codigo, /document\.getElementById|window\.fraudshield/);
  }
});

test("somente os JSONs originais são usados pelas três APIs", () => {
  for (const nome of ["situacoes", "mensagens", "golpes"]) {
    const api = ler("app/api/" + nome + "/route.js");
    assert.match(api, new RegExp("data/" + nome + "\\.json"));
    assert.match(api, /Response\.json\(/);
    const dados = JSON.parse(ler("data/" + nome + ".json"));
    assert.ok(Array.isArray(dados) && dados.length > 0);
  }
});

test("o carregador React faz fetch e passa os dados aos jogos", () => {
  const carregador = ler("components/CarregadorJogo.jsx");
  assert.match(carregador, /fetch\(url/);
  assert.match(carregador, /useEffect/);
  assert.match(carregador, /useState/);
  assert.match(carregador, /<JogoSituacoes dados=\{dados\}/);
  assert.match(carregador, /<JogoMensagens dados=\{dados\}/);
  assert.match(ler("app/quiz1/page.jsx"), /url="\/api\/situacoes"/);
  assert.match(ler("app/quiz2/page.jsx"), /url="\/api\/mensagens"/);
});

test("páginas CSS não repetem resets nem estilos globais", () => {
  const global = ler("styles/globals.css");
  assert.match(global, /:root/);
  assert.match(global, /\.introducao\s*\{/);
  const nomes = ["contato", "dicas", "golpes", "quiz", "quiz1", "quiz2", "sobre"];
  for (const nome of nomes) {
    const pagina = ler("styles/pages/" + nome + ".css");
    assert.doesNotMatch(pagina, /@import|:root|\.cabecalho-principal\s*,\s*\.rodape-principal/);
    assert.doesNotMatch(pagina, /(^|\n)body\s*\{/);
  }
});

test("relatório descreve o projeto React atual, sem dependências legadas", () => {
  const relatorio = ler("CheckIn3-Relatorio.md");
  assert.match(relatorio, /JSON.*API|API.*JSON/s);
  assert.match(relatorio, /JogoSituacoes/);
  assert.match(relatorio, /JogoMensagens/);
  assert.doesNotMatch(relatorio, /LegacyScripts|public\/js\/quiz/);
});
