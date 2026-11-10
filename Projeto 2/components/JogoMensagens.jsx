"use client";

import { useEffect, useState } from "react";
import { avaliarMensagem, PONTOS_POR_ACERTO, sortearRodada } from "../lib/jogos.mjs";
import { adicionarAcerto, concluirRodada, lerProgresso } from "../lib/progresso.mjs";

export default function JogoMensagens({ dados }) {
  const [rodada, setRodada] = useState(() => sortearRodada(dados));
  const [numeroRodada, setNumeroRodada] = useState(1);
  const [posicao, setPosicao] = useState(0);
  const [selecionados, setSelecionados] = useState([]);
  const [correcao, setCorrecao] = useState(null);
  const [pontosSessao, setPontosSessao] = useState(0);
  const [pontosRodada, setPontosRodada] = useState(0);
  const [salvo, setSalvo] = useState(null);
  const [terminou, setTerminou] = useState(false);
  const [encerrado, setEncerrado] = useState(false);
  const [estatisticas, setEstatisticas] = useState({ encontrados: 0, sinais: 0, incorretos: 0 });

  useEffect(() => {
    setSalvo(lerProgresso(window.localStorage)[2]);
  }, []);

  const mensagem = rodada[posicao];
  const palavras = mensagem.texto.split(" ");

  function selecionar(indice) {
    if (correcao || terminou) return;
    setSelecionados((atual) => atual.includes(indice) ? atual.filter((valor) => valor !== indice) : [...atual, indice]);
  }

  function verificar() {
    if (correcao) return;
    const resultado = avaliarMensagem(mensagem, selecionados);
    const novosPontos = pontosRodada + (resultado.acertou ? PONTOS_POR_ACERTO : 0);

    setCorrecao(resultado);
    setPontosRodada(novosPontos);
    setEstatisticas((atual) => ({
      encontrados: atual.encontrados + resultado.encontrados,
      sinais: atual.sinais + resultado.possiveis,
      incorretos: atual.incorretos + resultado.incorretos
    }));

    if (resultado.acertou) {
      setPontosSessao((pontos) => pontos + PONTOS_POR_ACERTO);
      adicionarAcerto(window.localStorage, 2);
    }

    if (posicao === rodada.length - 1) {
      concluirRodada(window.localStorage, 2, novosPontos);
      setTerminou(true);
    }
    setSalvo(lerProgresso(window.localStorage)[2]);
  }

  function proximaMensagem() {
    if (!correcao || posicao >= rodada.length - 1) return;
    setPosicao((indice) => indice + 1);
    setSelecionados([]);
    setCorrecao(null);
  }

  function proximaRodada() {
    setRodada(sortearRodada(dados));
    setNumeroRodada((numero) => numero + 1);
    setPosicao(0);
    setSelecionados([]);
    setCorrecao(null);
    setPontosRodada(0);
    setTerminou(false);
    setEncerrado(false);
  }

  return (
    <>
      <section className="placar-jogo" aria-label="Placar">
        <p role="status">Rodada {numeroRodada} · Mensagem {posicao + 1} de {rodada.length}</p>
        <p className="placar">
          Pontos nesta sessão: {pontosSessao} · Total acumulado: {salvo?.pontos ?? 0} · Recorde de rodada: {salvo?.recorde ?? 0}
        </p>
      </section>

      <section className="painel" aria-labelledby="mensagem-titulo">
        <h2 id="mensagem-titulo" tabIndex="-1">Mensagem recebida</h2>
        <p className="mensagem-jogo">
          {palavras.map((palavra, indice) => {
            const marca = correcao?.marcacoes[indice];
            const classe = marca === "correta" ? " palavra-correta" : marca === "incorreta" ? " palavra-incorreta" :
              marca === "perdida" ? " palavra-perdida" : selecionados.includes(indice) ? " palavra-selecionada" : "";
            const simbolo = marca === "correta" ? "✓ " : marca === "incorreta" ? "✕ " : marca === "perdida" ? "! " : "";
            return (
              <span key={indice}>
                <button
                  className={"palavra-mensagem" + classe}
                  type="button"
                  disabled={Boolean(correcao)}
                  aria-pressed={!correcao && selecionados.includes(indice)}
                  onClick={() => selecionar(indice)}
                >
                  {simbolo}{palavra}
                </button>{" "}
              </span>
            );
          })}
        </p>
        <ul className="legenda" aria-label="Legenda da correção">
          <li className="palavra-correta">✓ Achou</li>
          <li className="palavra-incorreta">✕ Não era</li>
          <li className="palavra-perdida">! Faltou</li>
        </ul>
      </section>

      {correcao && (
        <p className={"resultado resultado-" + (encerrado ? "resumo" : correcao.acertou ? "correto" : "incorreto")} role="status" aria-atomic="true">
          <strong>{encerrado ? "Fim de jogo" : correcao.acertou ? "✓ Você acertou!" : "✕ Sua resposta precisa de correção"}</strong>
          <span>
            {correcao.possiveis === 0
              ? "Esta mensagem não apresenta os sinais de alerta do exercício."
              : "Você encontrou " + correcao.encontrados + " de " + correcao.possiveis + " sinais de alerta."}
          </span>
          <span>Seleções incorretas: {correcao.incorretos}. Sinais que faltaram: {correcao.possiveis - correcao.encontrados}.</span>
          {terminou && <span className="resumo-rodada">
            Rodada concluída! {estatisticas.encontrados} de {estatisticas.sinais} sinais encontrados, {estatisticas.incorretos} seleções incorretas. Pontos da rodada: {pontosRodada}.
          </span>}
        </p>
      )}

      <p className="acoes">
        <button className="botao" type="button" disabled={Boolean(correcao)} onClick={verificar}>Verificar</button>
        {!terminou && <button className="botao secundario" type="button" disabled={!correcao} onClick={proximaMensagem}>Próxima mensagem</button>}
        {terminou && !encerrado && (
          <>
            <button className="botao" type="button" onClick={proximaRodada}>Próxima rodada</button>
            <button className="botao secundario" type="button" onClick={() => setEncerrado(true)}>Parar por aqui</button>
          </>
        )}
      </p>
      <p className="aviso">Uma palavra sozinha não prova que é golpe. O que pesa é o conjunto: pressa, dinheiro, senha, link.</p>
    </>
  );
}
