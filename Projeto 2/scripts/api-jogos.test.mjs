import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const ler = (caminho) => readFileSync(new URL("../" + caminho, import.meta.url), "utf8");

test("JSON dos jogos preserva as 62 situações e 55 mensagens", () => {
  const situacoes = JSON.parse(ler("data/situacoes.json"));
  const mensagens = JSON.parse(ler("data/mensagens.json"));
  assert.equal(situacoes.length, 62);
  assert.equal(mensagens.length, 55);
  assert.ok(situacoes.every((s) => typeof s.texto === "string" && ["golpe", "seguro"].includes(s.respostaCorreta)));
  assert.ok(mensagens.every((m) => typeof m.texto === "string" && Array.isArray(m.sinaisSuspeitos)));
});

test("as duas APIs GET retornam seus JSONs", () => {
  for (const nome of ["situacoes", "mensagens"]) {
    const api = ler("app/api/" + nome + "/route.js");
    assert.match(api, /export async function GET/);
    assert.ok(api.includes("data/" + nome + ".json"));
    assert.ok(api.includes("Response.json(" + nome + ")"));
  }
});

test("React carrega dados por fetch, useEffect e useState antes dos jogos", () => {
  const componente = ler("components/DadosJogoAPI.jsx");
  for (const termo of ["useEffect", "useState", "fetch(endpoint)", "resposta.ok", "window[banco]", "LegacyScripts", 'role="alert"']) {
    assert.ok(componente.includes(termo), termo);
  }
  for (const [pagina, endpoint, banco] of [
    ["quiz1", "/api/situacoes", "bancoSituacoes"],
    ["quiz2", "/api/mensagens", "bancoMensagens"]
  ]) {
    const page = ler("app/" + pagina + "/page.jsx");
    const js = ler("public/js/" + pagina + ".js");
    assert.ok(page.includes('endpoint="' + endpoint + '"'));
    assert.ok(page.includes('banco="' + banco + '"'));
    assert.ok(js.includes("window." + banco));
    assert.ok(!page.includes("/js/dados/" + (pagina === "quiz1" ? "situacoes" : "mensagens") + ".js"));
  }
});
