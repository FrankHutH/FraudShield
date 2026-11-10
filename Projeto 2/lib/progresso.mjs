import { PONTOS_POR_ACERTO } from "./jogos.mjs";

const chave = (jogo, campo) => "quiz" + jogo + campo;

export function lerProgresso(storage) {
  const vazio = { 1: { pontos: 0, recorde: 0, concluido: false }, 2: { pontos: 0, recorde: 0, concluido: false } };
  try {
    for (const jogo of [1, 2]) {
      vazio[jogo] = {
        pontos: Number(storage.getItem(chave(jogo, "Pontos"))) || 0,
        recorde: Number(storage.getItem(chave(jogo, "Recorde"))) || 0,
        concluido: storage.getItem(chave(jogo, "Concluido")) === "sim"
      };
    }
  } catch {
    // O jogo segue funcionando mesmo se o navegador bloquear o armazenamento.
  }
  return vazio;
}

export function adicionarAcerto(storage, jogo) {
  try {
    storage.setItem(chave(jogo, "Pontos"), (Number(storage.getItem(chave(jogo, "Pontos"))) || 0) + PONTOS_POR_ACERTO);
  } catch {}
}

export function concluirRodada(storage, jogo, pontosRodada) {
  try {
    storage.setItem(chave(jogo, "Concluido"), "sim");
    const recorde = Number(storage.getItem(chave(jogo, "Recorde"))) || 0;
    if (pontosRodada > recorde) {
      storage.setItem(chave(jogo, "Recorde"), pontosRodada);
      return true;
    }
  } catch {}
  return false;
}

export function zerarProgresso(storage) {
  try {
    for (const jogo of [1, 2]) {
      for (const campo of ["Pontos", "Recorde", "Concluido"]) {
        storage.removeItem(chave(jogo, campo));
      }
    }
  } catch {}
}
