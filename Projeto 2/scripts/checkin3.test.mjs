// Murilo Lobato - RA: 10752958

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { dirname, resolve, join } from "node:path";
import { fileURLToPath } from "node:url";

const project = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repository = resolve(project, "..");
const read = (file) => readFileSync(join(project, file), "utf8");

test("Next.js 15 usa versão corrigida e React 19", () => {
  const pkg = JSON.parse(read("package.json"));
  assert.equal(pkg.dependencies.next, "15.5.28");
  assert.match(pkg.dependencies.react, /^19\./);
  assert.match(pkg.dependencies["react-dom"], /^19\./);
  assert.equal(pkg.scripts.build, "next build");
  assert.equal(pkg.scripts.start, "next start");
});

test("SSR permanece habilitado para API futura", () => {
  const config = read("next.config.mjs");
  assert.doesNotMatch(config, /output\s*:\s*["']export["']/);
  assert.match(config, /trailingSlash\s*:\s*true/);
});

test("Amplify publica .next do monorepo e executa testes", () => {
  const yaml = readFileSync(join(repository, "amplify.yml"), "utf8");
  assert.match(yaml, /appRoot:\s*['"]?Projeto 2/);
  assert.match(yaml, /baseDirectory:\s*\.next/);
  assert.match(yaml, /npm run build/);
  assert.match(yaml, /npm run test:smoke/);
  assert.doesNotMatch(yaml, /baseDirectory:\s*out/);
});

test("oito páginas e recursos legados foram preservados", () => {
  for (const segment of ["", "sobre", "golpes", "dicas", "quiz", "quiz1", "quiz2", "contato"]) {
    assert.ok(existsSync(join(project, "app", segment, "page.jsx")), segment || "home");
  }
  for (const asset of ["img/logo.png", "img/favicon.png", "js/quiz1.js", "js/quiz2.js"]) {
    assert.ok(existsSync(join(project, "public", asset)), asset);
  }
  assert.ok(existsSync(join(repository, "Projeto 1", "README.md")));
});

test("teste de produção usa servidor Next.js, não servidor estático", () => {
  const smoke = read("scripts/smoke.mjs");
  assert.match(smoke, /next\/dist\/bin\/next/);
  assert.doesNotMatch(smoke, /spawn\([^\n]+serve-static/);
});
