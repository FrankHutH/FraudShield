"use client";

import { useEffect, useState } from "react";
import { classificarSituacao, PONTOS_POR_ACERTO, sortearRodada } from "../lib/jogos.mjs";
import { adicionarAcerto, concluirRodada, lerProgresso } from "../lib/progresso.mjs";

export default function JogoSituacoes({ dados }) {
  const [rodada, setRodada] = useState(() => sortearRodada(dados));
  const [respostas, setRespostas] = useState({});
  const [selecionado, setSelecionado] = useState(null);
  const [numeroRodada, setNumeroRodada] = useState(1);
  const [pontosSessao, setPontosSessao] = useState(0);
  const [pontosRodada, setPontosRodada] = useState(0);
  const [salvo, setSalvo] = useState(null);
  const [resultado, setResultado] = useState(null);
  const [terminou, setTerminou] = useState(false);
  const [encerrado, setEncerrado] = useState(false);

  useEffect(() => {
    setSalvo(lerProgresso(window.localStorage)[1]);
  }, []);

  const respondidas = Object.keys(respostas).length;
  const acertos = Object.values(respostas).filter((resposta) => resposta.acertou).length;

  function classificar(categoria, indice = selecionado) {
    if (terminou || indice === null || indice < 0 || indice >= rodada.length || respostas[indice]) return;
    const acertou = classificarSituacao(rodada[indice], categoria);
    const novasRespostas = { ...respostas, [indice]: { categoria, acertou } };
    const novosPontos = pontosRodada + (acertou ? PONTOS_POR_ACERTO : 0);

    setRespostas(novasRespostas);
    setSelecionado(null);
    setPontosRodada(novosPontos);
    setResultado({
      acertou,
      mensagem: "Você marcou: " + (categoria === "golpe" ? "Golpe" : "Seguro") +
        ". Resposta correta: " + (rodada[indice].respostaCorreta === "golpe" ? "Golpe" : "Seguro") + "."
    });

    if (acertou) {
      setPontosSessao((pontos) => pontos + PONTOS_POR_ACERTO);
      adicionarAcerto(window.localStorage, 1);
    }

    if (Object.keys(novasRespostas).length === rodada.length) {
      concluirRodada(window.localStorage, 1, novosPontos);
      setTerminou(true);
    }
    setSalvo(lerProgresso(window.localStorage)[1]);
  }

  function proximaRodada() {
    setRodada(sortearRodada(dados));
    setRespostas({});
    setSelecionado(null);
    setNumeroRodada((numero) => numero + 1);
    setPontosRodada(0);
    setResultado(null);
    setTerminou(false);
    setEncerrado(false);
  }

  function cartao(item, indice) {
    const resposta = respostas[indice];
    return (
      <li
        key={indice}
        className={"cartao-situacao" +
          (resposta ? (resposta.acertou ? " cartao-correto" : " cartao-incorreto") : selecionado === indice ? " cartao-selecionado" : "")}
        draggable={!resposta}
        onDragStart={(evento) => {
          if (resposta) return;
          evento.dataTransfer.setData("text/plain", String(indice));
          setSelecionado(indice);
        }}
      >
        <button
          className="selecionar-cartao"
          type="button"
          disabled={Boolean(resposta)}
          aria-pressed={!resposta && selecionado === indice}
          onClick={() => setSelecionado((atual) => atual === indice ? null : indice)}
        >
          {item.texto}
        </button>
        {resposta && (
          <p className="feedback-cartao">
            <strong className="rotulo-resposta">{resposta.acertou ? "✓ Você acertou!" : "✕ Você errou"}</strong>
            Resposta correta: {item.respostaCorreta === "golpe" ? "Golpe" : "Seguro"}.
          </p>
        )}
      </li>
    );
  }

  function soltar(evento, categoria) {
    evento.preventDefault();
    const indice = evento.dataTransfer.getData("text/plain");
    if (/^\d+$/.test(indice)) classificar(categoria, Number(indice));
  }

  return (
    <>
      <section className="placar-jogo" aria-label="Placar">
        <p role="status">Rodada {numeroRodada} · {respondidas} de {rodada.length} situações classificadas</p>
        <p className="placar">
          Pontos nesta sessão: {pontosSessao} · Total acumulado: {salvo?.pontos ?? 0} · Recorde de rodada: {salvo?.recorde ?? 0}
        </p>
      </section>

      <section aria-labelledby="situacoes">
        <h2 id="situacoes" tabIndex="-1">Situações</h2>
        <ul className="cartoes">{rodada.map((item, indice) => !respostas[indice] && cartao(item, indice))}</ul>
      </section>

      <section className="cartoes categorias" aria-label="Caixas de resposta">
        <article className="categoria golpe" onDragOver={(evento) => evento.preventDefault()} onDrop={(evento) => soltar(evento, "golpe")}>
          <h2>✕ Golpe</h2>
          <p>Tem algo errado aqui.</p>
          <button className="botao secundario" type="button" disabled={selecionado === null} onClick={() => classificar("golpe")}>É golpe</button>
          <ul className="lista-classificados">{rodada.map((item, indice) => respostas[indice]?.categoria === "golpe" && cartao(item, indice))}</ul>
        </article>
        <article className="categoria seguro" onDragOver={(evento) => evento.preventDefault()} onDrop={(evento) => soltar(evento, "seguro")}>
          <h2>✓ Seguro</h2>
          <p>Isso protege você.</p>
          <button className="botao secundario" type="button" disabled={selecionado === null} onClick={() => classificar("seguro")}>É seguro</button>
          <ul className="lista-classificados">{rodada.map((item, indice) => respostas[indice]?.categoria === "seguro" && cartao(item, indice))}</ul>
        </article>
      </section>

      {resultado && (
        <p className={"resultado resultado-" + (encerrado ? "resumo" : resultado.acertou ? "correto" : "incorreto")} role="status" aria-atomic="true">
          <strong>{encerrado ? "Fim de jogo" : resultado.acertou ? "✓ Você acertou!" : "✕ Você errou"}</strong>
          <span>{encerrado ? "Você acertou " + acertos + " de " + respondidas + " situações nesta rodada." : resultado.mensagem}</span>
          {terminou && <span className="resumo-rodada">Rodada concluída! {acertos} de {rodada.length} acertos. Pontos da rodada: {pontosRodada}.</span>}
        </p>
      )}

      {terminou && !encerrado && (
        <p className="acoes">
          <button className="botao" type="button" onClick={proximaRodada}>Próxima rodada</button>
          <button className="botao secundario" type="button" onClick={() => setEncerrado(true)}>Parar por aqui</button>
        </p>
      )}
      <p className="aviso">Os exemplos são para treino. Uma atitude segura diminui o risco, mas não garante que todo contato seja legítimo.</p>
    </>
  );
}
