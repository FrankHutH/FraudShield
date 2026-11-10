import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (arquivo) =>
  readFileSync(new URL("../" + arquivo, import.meta.url), "utf8");

test("JSON contém exemplos completos com identificadores únicos", () => {
  const golpes = JSON.parse(read("data/golpes.json"));
  assert.ok(golpes.length >= 2);
  assert.equal(new Set(golpes.map((golpe) => golpe.id)).size, golpes.length);
  for (const golpe of golpes) {
    for (const campo of ["id", "titulo", "tipo", "exemplo", "orientacao"]) {
      assert.ok(golpe[campo], campo);
    }
  }
});

test("API retorna o JSON local por GET", () => {
  const api = read("app/api/golpes/route.js");
  assert.match(api, /export async function GET/);
  assert.match(api, /Response\.json\(golpes\)/);
  assert.match(api, /data\/golpes\.json/);
});

test("React consome API com fetch, useEffect e useState", () => {
  const componente = read("components/ListaGolpesAPI.jsx");
  assert.match(componente, /"use client"/);
  assert.match(componente, /fetch\("\/api\/golpes"\)/);
  assert.match(componente, /useEffect/);
  assert.match(componente, /useState/);
  assert.match(componente, /setGolpes\(dados\)/);
  assert.match(read("app/golpes/page.jsx"), /<ListaGolpesAPI\s*\/>/);
});

test("rota dinâmica usa id e mostra orientação", () => {
  const pagina = read("app/golpes/[id]/page.jsx");
  assert.match(pagina, /generateStaticParams/);
  assert.match(pagina, /params/);
  assert.match(pagina, /notFound\(\)/);
  assert.match(pagina, /golpe\.orientacao/);
});
