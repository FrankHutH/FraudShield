import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve, join } from "node:path";
import { fileURLToPath } from "node:url";

const project = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repository = resolve(project, "..");
const read = (file) => readFileSync(join(project, file), "utf8");

test("Aplicação usa somente Next.js 15 e React 19 em produção", () => {
  const pkg = JSON.parse(read("package.json"));
  assert.equal(pkg.dependencies.next, "15.5.28");
  assert.match(pkg.dependencies.react, /^19\./);
  assert.match(pkg.dependencies["react-dom"], /^19\./);
  assert.equal(pkg.scripts.build, "next build");
  assert.equal(pkg.scripts.start, "next start");
});

test("Next.js SSR permite as três rotas de API JSON", () => {
  assert.doesNotMatch(read("next.config.mjs"), /output\s*:\s*["']export["']/);
  for (const nome of ["situacoes", "mensagens", "golpes"]) {
    assert.ok(existsSync(join(project, "app/api", nome, "route.js")));
    assert.ok(existsSync(join(project, "data", nome + ".json")));
  }
});

test("Amplify compila o Projeto 2 com SSR e executa testes", () => {
  const yaml = readFileSync(join(repository, "amplify.yml"), "utf8");
  assert.match(yaml, /appRoot:\s*['"]?Projeto 2/);
  assert.match(yaml, /baseDirectory:\s*\.next/);
  assert.match(yaml, /npm run build/);
  assert.match(yaml, /npm run test:smoke/);
});

test("As oito páginas e imagens existem, mas os arquivos legados foram removidos", () => {
  for (const rota of ["", "sobre", "golpes", "dicas", "quiz", "quiz1", "quiz2", "contato"]) {
    assert.ok(existsSync(join(project, "app", rota, "page.jsx")), rota || "home");
  }
  for (const imagem of ["logo.png", "favicon.png"]) {
    assert.ok(existsSync(join(project, "public/img", imagem)));
  }
  assert.equal(existsSync(join(project, "public/js")), false);
  assert.equal(existsSync(join(repository, "Projeto 1")), false);
});

test("Testes HTTP usam o servidor real Next.js", () => {
  const smoke = read("scripts/smoke.mjs");
  assert.match(smoke, /next\/dist\/bin\/next/);
  assert.ok(smoke.includes('["situacoes", "mensagens"]'));
  assert.ok(smoke.includes('fetch(host + "/api/" + nome)'));
});
