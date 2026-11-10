"use client";

import { useEffect, useState } from "react";
import { lerProgresso, zerarProgresso } from "../lib/progresso.mjs";

export default function PlacarJogos() {
  const [progresso, setProgresso] = useState(null);

  useEffect(() => {
    const atualizar = () => setProgresso(lerProgresso(window.localStorage));
    atualizar();
    window.addEventListener("pageshow", atualizar);
    window.addEventListener("storage", atualizar);
    return () => {
      window.removeEventListener("pageshow", atualizar);
      window.removeEventListener("storage", atualizar);
    };
  }, []);

  const fase1 = progresso?.[1] ?? { pontos: 0, recorde: 0, concluido: false };
  const fase2 = progresso?.[2] ?? { pontos: 0, recorde: 0, concluido: false };
  const porcentagem = (fase1.concluido ? 50 : 0) + (fase2.concluido ? 50 : 0);

  function zerar() {
    if (!window.confirm("Zerar o placar dos dois jogos?")) return;
    zerarProgresso(window.localStorage);
    setProgresso(lerProgresso(window.localStorage));
  }

  return (
    <section className="painel placar-geral" aria-labelledby="titulo-placar">
      <h2 id="titulo-placar">Seu placar</h2>
      <p className="pontuacao-total">{fase1.pontos + fase2.pontos} pontos</p>
      <progress value={porcentagem} max="100" aria-label="Progresso do treinamento">{porcentagem}%</progress>
      <p>Progresso: {porcentagem}%</p>
      <ul className="status-jogos">
        {[fase1, fase2].map((fase, indice) => (
          <li key={indice}>
            Fase {indice + 1} — {fase.concluido ? "concluída ✓" : "não concluída"} · {fase.pontos} pontos · recorde de rodada: {fase.recorde}
          </li>
        ))}
      </ul>
      <p><small>Cada acerto vale 10 pontos. O placar fica salvo só neste navegador.</small></p>
      <button className="botao secundario" type="button" onClick={zerar}>Zerar placar</button>
    </section>
  );
}
