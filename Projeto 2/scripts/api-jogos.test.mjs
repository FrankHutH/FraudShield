import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";

const caminho = (arquivo) => new URL("../" + arquivo, import.meta.url);
const ler = (arquivo) => readFileSync(caminho(arquivo), "utf8");
const json = (arquivo) => JSON.parse(ler(arquivo));

test("Fase 1: 62 situações válidas estão no JSON", () => {
  const situacoes = json("data/situacoes.json");
  assert.equal(situacoes.length, 62);
  assert.equal(new Set(situacoes.map((item) => item.texto)).size, situacoes.length);
  for (const item of situacoes) {
    assert.ok(typeof item.texto === "string" && item.texto.length > 0);
    assert.ok(["golpe", "seguro"].includes(item.respostaCorreta));
  }
  assert.ok(situacoes.some((item) => item.respostaCorreta === "golpe"));
  assert.ok(situacoes.some((item) => item.respostaCorreta === "seguro"));
});

test("Fase 2: 55 mensagens mantêm os sinais que o jogo pode encontrar", () => {
  const mensagens = json("data/mensagens.json");
  const normalizar = (palavra) => palavra.toLocaleLowerCase("pt-BR").replace(/[.,!?;:]/g, "");

  assert.equal(mensagens.length, 55);
  assert.equal(new Set(mensagens.map((item) => item.texto)).size, mensagens.length);

  for (const item of mensagens) {
    assert.ok(typeof item.texto === "string" && item.texto.length > 0);
    assert.ok(Array.isArray(item.sinaisSuspeitos));
    const palavras = item.texto.split(" ").map(normalizar);
    for (const sinal of item.sinaisSuspeitos) {
      assert.ok(palavras.includes(normalizar(sinal)), "Sinal não encontrado: " + sinal);
    }
  }
  assert.ok(mensagens.some((item) => item.sinaisSuspeitos.length === 0));
  assert.ok(mensagens.some((item) => item.sinaisSuspeitos.length > 0));
});

test("As duas APIs GET expõem os respectivos arquivos JSON", () => {
  for (const nome of ["situacoes", "mensagens"]) {
    const rota = ler("app/api/" + nome + "/route.js");
    assert.match(rota, new RegExp('import ' + nome + ' from ".{0,20}data/' + nome + '\\.json"'));
    assert.match(rota, /export async function GET\(\)/);
    assert.match(rota, new RegExp("Response\\.json\\(" + nome + "\\)"));
  }
});

test("React busca as APIs, guarda os dados e trata erro/retry", () => {
  const carregador = ler("components/CarregadorJogo.jsx");
  assert.match(carregador, /"use client"/);
  assert.match(carregador, /useEffect/);
  assert.match(carregador, /useState/);
  assert.match(carregador, /fetch\(url/);
  assert.match(carregador, /resposta\.ok/);
  assert.match(carregador, /resposta\.json\(\)/);
  assert.match(carregador, /setDados\(lista\)/);
  assert.match(carregador, /role="alert"/);
  assert.match(carregador, /Tentar novamente/);
  assert.match(carregador, /<LegacyScripts/);

  const fase1 = ler("app/quiz1/page.jsx");
  const fase2 = ler("app/quiz2/page.jsx");
  assert.match(fase1, /url="\/api\/situacoes"/);
  assert.match(fase1, /nomeBanco="fraudshieldSituacoes"/);
  assert.match(fase2, /url="\/api\/mensagens"/);
  assert.match(fase2, /nomeBanco="fraudshieldMensagens"/);
});

test("Os jogos recebem os dados do React, sem bancos duplicados em JS", () => {
  assert.match(ler("components/LegacyScripts.jsx"), /window\[nomeBanco\] = dados/);
  assert.match(ler("public/js/quiz1.js"), /const bancoSituacoes = window\.fraudshieldSituacoes/);
  assert.match(ler("public/js/quiz2.js"), /const bancoMensagens = window\.fraudshieldMensagens/);
  assert.ok(!existsSync(caminho("public/js/dados/situacoes.js")));
  assert.ok(!existsSync(caminho("public/js/dados/mensagens.js")));
});

test("Pontuação, conclusão e recorde permanecem nos jogos", () => {
  for (const jogo of [1, 2]) {
    const script = ler("public/js/quiz" + jogo + ".js");
    assert.match(script, /sortearRodada\(/);
    assert.match(script, /adicionarPontos\(/);
    assert.match(script, /salvarConclusao\(/);
    assert.match(script, /registrarRecorde\(/);
  }
});
