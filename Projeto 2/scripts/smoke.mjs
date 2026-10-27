// Murilo Lobato - RA: 10752958

import { spawn } from "node:child_process";
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

const server = spawn(process.execPath, ["scripts/serve-static.mjs", "3125"], {
  cwd: process.cwd(),
  env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" },
  stdio: ["ignore", "pipe", "pipe"]
});

let output = "";
server.stdout.on("data", (chunk) => { output += chunk.toString(); });
server.stderr.on("data", (chunk) => { output += chunk.toString(); });

try {
  let ready = false;

  for (let attempt = 0; attempt < 40; attempt++) {
    if (server.exitCode !== null) throw new Error("Servidor estático encerrou inesperadamente.");
    try {
      const response = await fetch(host + "/");
      if (response.ok) {
        ready = true;
        break;
      }
    } catch {}
    await pause(500);
  }

  if (!ready) throw new Error("Servidor da exportação estática não iniciou.");

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

  for (const asset of ["/img/logo.png", "/img/favicon.png", "/js/quiz1.js", "/js/quiz2.js"]) {
    const response = await fetch(host + asset);
    if (!response.ok) throw new Error("Recurso indisponível: " + asset);
    console.log("OK " + asset);
  }

  console.log("Oito rotas e recursos estáticos verificados.");
} catch (error) {
  console.error(error);
  console.error(output);
  process.exitCode = 1;
} finally {
  server.kill("SIGTERM");
}
