import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { avaliarMensagem, classificarSituacao, normalizar, sortearRodada } from "../lib/jogos.mjs";
import { adicionarAcerto, concluirRodada, lerProgresso, zerarProgresso } from "../lib/progresso.mjs";

const arquivo = (nome) => new URL("../" + nome, import.meta.url);
const ler = (nome) => readFileSync(arquivo(nome), "utf8");
const json = (nome) => JSON.parse(ler("data/" + nome + ".json"));

test("JSON da Fase 1 contém 62 situações corretas e sem duplicatas", () => {
  const situacoes = json("situacoes");
  assert.equal(situacoes.length, 62);
  assert.equal(new Set(situacoes.map((item) => item.texto)).size, 62);
  assert.ok(situacoes.some((item) => item.respostaCorreta === "golpe"));
  assert.ok(situacoes.some((item) => item.respostaCorreta === "seguro"));
  for (const item of situacoes) {
    assert.ok(item.texto?.trim());
    assert.ok(["golpe", "seguro"].includes(item.respostaCorreta));
  }
});

test("JSON da Fase 2 contém 55 mensagens e todos os sinais presentes no texto", () => {
  const mensagens = json("mensagens");
  assert.equal(mensagens.length, 55);
  assert.equal(new Set(mensagens.map((item) => item.texto)).size, 55);
  assert.ok(mensagens.some((item) => item.sinaisSuspeitos.length === 0));
  assert.ok(mensagens.some((item) => item.sinaisSuspeitos.length > 0));

  for (const item of mensagens) {
    assert.ok(item.texto?.trim());
    assert.ok(Array.isArray(item.sinaisSuspeitos));
    const palavras = item.texto.split(" ").map(normalizar);
    for (const sinal of item.sinaisSuspeitos) {
      assert.ok(palavras.includes(normalizar(sinal)), "Sinal ausente: " + sinal);
    }
  }
});

test("Next.js expõe as três fontes JSON por handlers GET", () => {
  for (const nome of ["situacoes", "mensagens", "golpes"]) {
    const rota = ler("app/api/" + nome + "/route.js");
    assert.ok(rota.includes("data/" + nome + ".json"));
    assert.ok(rota.includes("export async function GET"));
    assert.ok(rota.includes("Response.json(" + nome + ")"));
  }
});

test("React recebe as perguntas por fetch, useEffect e useState", () => {
  const carregador = ler("components/CarregadorJogo.jsx");
  assert.ok(carregador.includes('"use client"'));
  assert.ok(carregador.includes('fetch("/api/" + tipo'));
  assert.ok(carregador.includes("useEffect"));
  assert.ok(carregador.includes("useState"));
  assert.ok(carregador.includes("resposta.json()"));
  assert.ok(carregador.includes("Tentar novamente"));
  assert.ok(carregador.includes("<JogoSituacoes"));
  assert.ok(carregador.includes("<JogoMensagens"));
  assert.ok(ler("app/quiz1/page.jsx").includes('tipo="situacoes"'));
  assert.ok(ler("app/quiz2/page.jsx").includes('tipo="mensagens"'));
});

test("Sem scripts legados, sem bancos JS e sem Projeto 1", () => {
  assert.equal(existsSync(arquivo("public/js")), false);
  assert.equal(existsSync(arquivo("components/LegacyScripts.jsx")), false);
  assert.equal(existsSync(new URL("../../Projeto 1", import.meta.url)), false);
  for (const jogo of ["JogoSituacoes", "JogoMensagens"]) {
    const codigo = ler("components/" + jogo + ".jsx");
    assert.ok(codigo.includes('"use client"'));
    assert.ok(codigo.includes("useState"));
    assert.ok(!codigo.includes("document.getElementById"));
    assert.ok(!codigo.includes("window.fraudshield"));
  }
});

test("Fase 1: sorteio usa cópia dos dados e classificação confere JSON", () => {
  const situacoes = json("situacoes");
  const original = situacoes.map((item) => item.texto);
  const rodada = sortearRodada(situacoes, 4, () => 0.5);
  assert.equal(rodada.length, 4);
  assert.equal(new Set(rodada).size, 4);
  assert.deepEqual(situacoes.map((item) => item.texto), original);
  for (const situacao of rodada) {
    assert.equal(classificarSituacao(situacao, situacao.respostaCorreta), true);
    assert.equal(classificarSituacao(situacao, situacao.respostaCorreta === "golpe" ? "seguro" : "golpe"), false);
  }
});

test("Fase 2: acerto completo, seleção errada, sinais perdidos e mensagem segura", () => {
  const mensagens = json("mensagens");
  const suspeita = mensagens.find((item) => item.sinaisSuspeitos.length > 0);
  const indices = suspeita.texto.split(" ").flatMap((palavra, indice) =>
    suspeita.sinaisSuspeitos.map(normalizar).includes(normalizar(palavra)) ? [indice] : []);
  const certo = avaliarMensagem(suspeita, indices);
  assert.equal(certo.acertou, true);
  assert.equal(certo.encontrados, certo.possiveis);
  assert.equal(certo.incorretos, 0);
  assert.equal(avaliarMensagem(suspeita, []).acertou, false);
  const segura = mensagens.find((item) => item.sinaisSuspeitos.length === 0);
  assert.equal(avaliarMensagem(segura, []).acertou, true);
  assert.equal(avaliarMensagem(segura, [0]).acertou, false);
});

test("Placar salva acertos, recordes, conclusão e limpa todas as chaves", () => {
  const conteudo = new Map();
  const storage = {
    getItem: (chave) => conteudo.get(chave) ?? null,
    setItem: (chave, valor) => conteudo.set(chave, String(valor)),
    removeItem: (chave) => conteudo.delete(chave)
  };
  adicionarAcerto(storage, 1);
  adicionarAcerto(storage, 1);
  adicionarAcerto(storage, 2);
  assert.equal(concluirRodada(storage, 1, 20), true);
  assert.equal(concluirRodada(storage, 1, 10), false);
  assert.equal(lerProgresso(storage)[1].pontos, 20);
  assert.equal(lerProgresso(storage)[1].recorde, 20);
  assert.equal(lerProgresso(storage)[1].concluido, true);
  assert.equal(lerProgresso(storage)[2].pontos, 10);
  zerarProgresso(storage);
  assert.equal(conteudo.size, 0);
  assert.equal(lerProgresso(storage)[1].concluido, false);
});
