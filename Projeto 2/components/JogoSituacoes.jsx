"use client";
import { useState } from "react";
import { ler, registrar, sortear } from "./pontuacao";
export default function JogoSituacoes({ dados }) {
  const [rodada, setRodada] = useState(() => sortear(dados).map(item => ({ ...item, marcada: null })));
  const [selecionado, setSelecionado] = useState(-1);
  const [numero, setNumero] = useState(1);
  const [sessao, setSessao] = useState(0);
  const [rodadaPontos, setRodadaPontos] = useState(0);
  const [resultado, setResultado] = useState("");
  const [encerrado, setEncerrado] = useState(false);
  const respondidas = rodada.filter(item => item.marcada).length;
  const concluida = respondidas === rodada.length;
  function classificar(tipo, indice = selecionado) {
    if (indice < 0 || rodada[indice]?.marcada || encerrado) return;
    const certo = rodada[indice].respostaCorreta === tipo;
    const nova = rodada.map((item, i) => i === indice ? { ...item, marcada: tipo } : item);
    const novosPontos = rodadaPontos + (certo ? 10 : 0);
    setRodada(nova);
    setRodadaPontos(novosPontos);
    if (certo) setSessao(p => p + 10);
    registrar(1, certo ? 1 : 0, novosPontos, nova.every(item => item.marcada));
    setResultado(certo ? "✓ Você acertou!" : "✕ Você errou. Resposta correta: " + rodada[indice].respostaCorreta + ".");
    setSelecionado(-1);
  }
  function proxima() {
    setRodada(sortear(dados).map(item => ({ ...item, marcada: null })));
    setSelecionado(-1);
    setNumero(n => n + 1);
    setRodadaPontos(0);
    setResultado("");
    setEncerrado(false);
  }
  return <><section className="placar-jogo" aria-label="Placar">
    <p role="status">Rodada {numero} · {respondidas} de {rodada.length} situações classificadas</p>
    <p className="placar">Pontos nesta sessão: {sessao} · Total acumulado: {ler(1,"Pontos")} · Recorde: {ler(1,"Recorde")}</p>
  </section>
  <section aria-labelledby="situacoes"><h2 id="situacoes">Situações</h2><ul className="cartoes">
    {rodada.map((item, i) => !item.marcada && <li className={"cartao-situacao " + (selecionado === i ? "cartao-selecionado" : "")} key={i} draggable onDragStart={e => e.dataTransfer.setData("text/plain", String(i))}>
      <button type="button" className="selecionar-cartao" aria-pressed={selecionado === i} onClick={() => setSelecionado(selecionado === i ? -1 : i)}>{item.texto}</button>
    </li>)}
  </ul></section>
  <section className="cartoes categorias" aria-label="Caixas de resposta">
    {["golpe","seguro"].map(tipo => <article key={tipo} className={"categoria "+tipo} onDragOver={e => e.preventDefault()} onDrop={e => { e.preventDefault(); const indice = Number(e.dataTransfer.getData("text/plain")); if (Number.isInteger(indice)) classificar(tipo, indice); }}>
      <h2>{tipo === "golpe" ? "✕ Golpe" : "✓ Seguro"}</h2>
      <p>{tipo === "golpe" ? "Tem algo errado aqui." : "Isso protege você."}</p>
      <button type="button" className="botao secundario" disabled={selecionado < 0 || encerrado} onClick={() => classificar(tipo)}>É {tipo}</button>
      <ul className="lista-classificados">{rodada.map((item,i) => item.marcada === tipo && <li className={"cartao-situacao " + (item.marcada === item.respostaCorreta ? "cartao-correto" : "cartao-incorreto")} key={i}><p className="selecionar-cartao">{item.texto}</p><p className="feedback-cartao">Resposta correta: {item.respostaCorreta}</p></li>)}</ul>
    </article>)}
  </section>
  <p className="resultado" role="status">{resultado}{concluida && !encerrado ? " Rodada concluída! Pontos da rodada: " + rodadaPontos + "." : ""}</p>
  {concluida && !encerrado && <p className="acoes"><button className="botao" type="button" onClick={proxima}>Próxima rodada</button><button className="botao secundario" type="button" onClick={() => setEncerrado(true)}>Parar por aqui</button></p>}
  {encerrado && <p className="resultado resultado-resumo">Fim de jogo! Você fez {sessao} pontos nesta sessão.</p>}
  <p className="aviso">Os exemplos são para treino. Uma atitude segura não garante que todo contato seja legítimo.</p>
  </>;
}
