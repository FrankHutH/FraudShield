import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const read = (p) => readFileSync(new URL("../" + p, import.meta.url), "utf8");
test("62 situações no JSON, com classificações válidas", () => {
  const dados = JSON.parse(read("data/situacoes.json"));
  assert.equal(dados.length, 62);
  assert.ok(
    dados.every(
      (x) => x.texto && ["golpe", "seguro"].includes(x.respostaCorreta),
    ),
  );
});
test("55 mensagens no JSON, com sinais localizáveis", () => {
  const dados = JSON.parse(read("data/mensagens.json"));
  assert.equal(dados.length, 55);
  const normalizar = (s) =>
    s.toLocaleLowerCase("pt-BR").replace(/[.,!?;:]/g, "");
  for (const x of dados) {
    assert.ok(x.texto && Array.isArray(x.sinaisSuspeitos));
    const palavras = x.texto.split(" ").map(normalizar);
    for (const sinal of x.sinaisSuspeitos)
      assert.ok(palavras.includes(normalizar(sinal)), sinal);
  }
});
test("APIs importam JSONs de fonte única", () => {
  for (const n of ["situacoes", "mensagens"]) {
    const rota = read("app/api/" + n + "/route.js");
    assert.ok(rota.includes("data/" + n + ".json"));
    assert.ok(rota.includes("Response.json(" + n + ")"));
  }
});
