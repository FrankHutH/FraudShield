// Murilo Lobato - RA: 10752958

import { spawn } from "node:child_process";
import { readFileSync } from "node:fs";
import { setTimeout as pause } from "node:timers/promises";

const host = "http://127.0.0.1:3125";
const routes = [
  ["/", "Golpe não bate na porta", 4],
  ["/sobre", "Por que isso existe", 3],
  ["/golpes", "Como o golpe chega", 4],
  ["/dicas", "Seis hábitos", 6],
  ["/quiz", "Escolha um jogo", 2],
  ["/quiz1", "Golpe ou seguro?", 0],
  ["/quiz2", "Encontre os sinais", 0],
  ["/contato", "Fale com a gente", 0]
];

const server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "-p", "3125", "-H", "127.0.0.1"], {
  cwd: process.cwd(),
  env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" },
  stdio: ["ignore", "pipe", "pipe"]
});

let output = "";
server.stdout.on("data", (chunk) => { output += chunk.toString(); });
server.stderr.on("data", (chunk) => { output += chunk.toString(); });

try {
  let ready = false;

  for (let attempt = 0; attempt < 90; attempt++) {
    if (server.exitCode !== null) throw new Error("Servidor Next.js encerrou inesperadamente.");
    try {
      const response = await fetch(host + "/");
      if (response.ok) {
        ready = true;
        break;
      }
    } catch {}
    await pause(500);
  }

  if (!ready) throw new Error("Servidor Next.js de produção não iniciou.");

  for (const [route, title, cards] of routes) {
    const response = await fetch(host + route);
    if (!response.ok) throw new Error(route + " respondeu " + response.status);
    const html = await response.text();

    if (!html.includes(title)) throw new Error("Conteúdo ausente em " + route);
    for (const className of ["cabecalho-principal", "menu-navegacao", "rodape-principal"]) {
      const matches = html.match(new RegExp('class="' + className + '"', "g")) || [];
      if (matches.length !== 1) throw new Error(className + " duplicado/ausente em " + route);
    }

    const activeLinks = (html.match(/aria-current="page"/g) || []).length;
    if (activeLinks > 1) throw new Error("Menu com múltiplos links ativos em " + route);
    if (!html.includes('href="/quiz"')) throw new Error("Navegação ausente em " + route);

    const cardCount = (html.match(/<li class="cartao">/g) || []).length;
    if (cardCount !== cards) throw new Error("Cartões incorretos em " + route + ": " + cardCount);
    console.log("OK " + route);
  }

  for (const asset of ["/img/logo.png", "/img/favicon.png"]) {
    const response = await fetch(host + asset);
    if (!response.ok) throw new Error("Recurso indisponível: " + asset);
    console.log("OK " + asset);
  }


  // Não deve existir nenhum script JavaScript legado público.
  for (const asset of ["/js/quiz1.js", "/js/quiz2.js", "/js/progresso.js"]) {
    const response = await fetch(host + asset);
    if (response.status !== 404) throw new Error("Script legado ainda publicado: " + asset);
    console.log("OK ausência " + asset);
  }


  const apiResponse = await fetch(host + "/api/golpes");
  if (!apiResponse.ok) throw new Error("API respondeu " + apiResponse.status);
  if (!(apiResponse.headers.get("content-type") || "").includes("application/json")) {
    throw new Error("API não retornou JSON");
  }
  const golpes = await apiResponse.json();
  if (golpes.length < 2 || !golpes.every((golpe) => golpe.id && golpe.orientacao)) {
    throw new Error("JSON de golpes inválido");
  }
  console.log("OK /api/golpes");

  for (const golpe of golpes) {
    const response = await fetch(host + "/golpes/" + golpe.id);
    if (!response.ok) throw new Error("Detalhe " + golpe.id + " respondeu " + response.status);
    const html = await response.text();
    if (!html.includes(golpe.titulo) || !html.includes(golpe.orientacao)) {
      throw new Error("Detalhe incompleto para " + golpe.id);
    }
    console.log("OK /golpes/" + golpe.id);
  }
  // Testes HTTP reais das duas APIs usadas pelos jogos.
  for (const nome of ["situacoes", "mensagens"]) {
    const resposta = await fetch(host + "/api/" + nome);
    if (resposta.status !== 200) throw new Error("API " + nome + " respondeu " + resposta.status);
    if (!(resposta.headers.get("content-type") || "").includes("application/json")) {
      throw new Error("API " + nome + " não retornou JSON");
    }
    const recebido = await resposta.json();
    const esperado = JSON.parse(readFileSync(new URL("../data/" + nome + ".json", import.meta.url), "utf8"));
    if (JSON.stringify(recebido) !== JSON.stringify(esperado)) {
      throw new Error("API " + nome + " retornou dados diferentes do JSON");
    }
    console.log("OK /api/" + nome + " (" + recebido.length + " registros)");
  }

  const inexistente = await fetch(host + "/golpes/999999");
  if (inexistente.status !== 404) throw new Error("ID inexistente não retornou 404");

  console.log("Oito rotas, API JSON, rotas dinâmicas e recursos estáticos verificados.");
} catch (error) {
  console.error(error);
  console.error(output);
  process.exitCode = 1;
} finally {
  server.kill("SIGTERM");
}
