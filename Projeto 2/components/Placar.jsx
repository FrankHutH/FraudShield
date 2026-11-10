"use client";
import { useEffect, useState } from "react";
import { ler } from "./pontuacao";
export default function Placar() {
  const [estado, setEstado] = useState({ pontos:0, conclusoes:[false,false] });
  useEffect(() => {
    function carregar() { setEstado({ pontos:ler(1,"Pontos")+ler(2,"Pontos"), conclusoes:[1,2].map(n=>localStorage.getItem("quiz"+n+"Concluido")==="sim") }); }
    carregar();
    window.addEventListener("storage", carregar);
    window.addEventListener("fraudshield:placar", carregar);
    return () => { window.removeEventListener("storage",carregar); window.removeEventListener("fraudshield:placar", carregar); };
  },[]);
  const progresso = estado.conclusoes.filter(Boolean).length * 50;
  function zerar() {
    for (const jogo of [1,2]) for (const campo of ["Pontos","Recorde","Concluido"]) localStorage.removeItem("quiz"+jogo+campo);
    window.dispatchEvent(new Event("fraudshield:placar"));
  }
  return <section className="painel placar-geral" aria-labelledby="titulo-placar"><h2 id="titulo-placar">Seu placar</h2>
    <p className="pontuacao-total">{estado.pontos} pontos</p>
    <progress value={progresso} max="100" aria-label="Progresso do treinamento">{progresso}%</progress>
    <p>Progresso: {progresso}%</p>
    <ul className="status-jogos">{estado.conclusoes.map((c,i)=><li key={i}>Fase {i+1} — {c?"concluída":"não concluída"}</li>)}</ul>
    <p><small>Cada acerto vale 10 pontos. O placar fica salvo só neste navegador.</small></p>
    <button type="button" className="botao secundario" onClick={zerar}>Zerar placar</button>
  </section>;
}
