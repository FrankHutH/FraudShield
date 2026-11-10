export const PONTOS_POR_ACERTO = 10;
export function ler(jogo, campo) {
  if (typeof window === "undefined") return 0;
  return Number(localStorage.getItem("quiz" + jogo + campo)) || 0;
}
export function registrar(jogo, acertos, pontosRodada, concluido) {
  if (typeof window === "undefined") return;
  localStorage.setItem("quiz" + jogo + "Pontos", String(ler(jogo, "Pontos") + acertos * PONTOS_POR_ACERTO));
  localStorage.setItem("quiz" + jogo + "Recorde", String(Math.max(ler(jogo, "Recorde"), pontosRodada)));
  if (concluido) localStorage.setItem("quiz" + jogo + "Concluido", "sim");
  window.dispatchEvent(new Event("fraudshield:placar"));
}
export function sortear(lista) { return [...lista].sort(() => Math.random() - 0.5).slice(0, 4); }
