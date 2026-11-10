"use client";

import { useEffect, useState } from "react";
import JogoSituacoes from "./JogoSituacoes";
import JogoMensagens from "./JogoMensagens";

// O React recebe o JSON exclusivamente por GET na API do Next.js.
export default function CarregadorJogo({ tipo }) {
  const [estado, setEstado] = useState({ status: "carregando", dados: [] });
  const [tentativa, setTentativa] = useState(0);

  useEffect(() => {
    const controlador = new AbortController();
    setEstado({ status: "carregando", dados: [] });

    fetch("/api/" + tipo, { signal: controlador.signal, cache: "no-store" })
      .then((resposta) => {
        if (!resposta.ok) throw new Error("Erro HTTP " + resposta.status);
        return resposta.json();
      })
      .then((dados) => {
        if (!Array.isArray(dados) || dados.length === 0) throw new Error("JSON inválido");
        if (!controlador.signal.aborted) setEstado({ status: "pronto", dados });
      })
      .catch(() => {
        if (!controlador.signal.aborted) setEstado({ status: "erro", dados: [] });
      });

    return () => controlador.abort();
  }, [tipo, tentativa]);

  if (estado.status === "carregando") return <p role="status">Carregando perguntas do jogo...</p>;
  if (estado.status === "erro") {
    return (
      <p role="alert">
        Não foi possível carregar as perguntas do jogo.{" "}
        <button className="botao secundario" type="button" onClick={() => setTentativa((valor) => valor + 1)}>
          Tentar novamente
        </button>
      </p>
    );
  }

  return tipo === "situacoes"
    ? <JogoSituacoes key={tentativa} dados={estado.dados} />
    : <JogoMensagens key={tentativa} dados={estado.dados} />;
}
