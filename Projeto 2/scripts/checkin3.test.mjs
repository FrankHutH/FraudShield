import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
const read = p => readFileSync(new URL("../"+p, import.meta.url),"utf8");
test("somente Next React e dados JSON, sem scripts legados",()=>{
  assert.ok(!existsSync(new URL("../../Projeto 1",import.meta.url)));
  assert.ok(!existsSync(new URL("../public/js",import.meta.url)));
  assert.ok(!existsSync(new URL("../components/LegacyScripts.jsx",import.meta.url)));
  for (const path of ["app/quiz1/page.jsx","app/quiz2/page.jsx","components/JogoSituacoes.jsx","components/JogoMensagens.jsx"]) {
    assert.doesNotMatch(read(path), /LegacyScripts|\/js\/quiz/);
  }
});
test("as duas fases recebem a API e renderizam componentes React",()=>{
  assert.match(read("app/quiz1/page.jsx"), /url="\/api\/situacoes"/);
  assert.match(read("app/quiz2/page.jsx"), /url="\/api\/mensagens"/);
  assert.match(read("components/CarregadorJogo.jsx"), /fetch\(url/);
  assert.match(read("components/CarregadorJogo.jsx"), /<JogoSituacoes dados=\{dados\}/);
});
