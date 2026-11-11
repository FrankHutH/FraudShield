"use client";

import { useEffect, useState } from "react";
import JogoSituacoes from "./JogoSituacoes";
import JogoMensagens from "./JogoMensagens";

export default function CarregadorJogo({ url, tipo }) {
  const [dados, setDados] = useState(null);
  const [erro, setErro] = useState("");
  const [tentativa, setTentativa] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function carregarPerguntas() {
      setErro("");
      setDados(null);

      try {
        const resposta = await fetch(url, { signal: controller.signal });

        if (!resposta.ok) {
          throw new Error("Falha na API");
        }

        const lista = await resposta.json();

        if (!Array.isArray(lista) || lista.length === 0) {
          throw new Error("JSON inválido");
        }

        if (!controller.signal.aborted) {
          setDados(lista);
        }
      } catch {
        if (!controller.signal.aborted) {
          setErro("Não foi possível carregar as perguntas do jogo.");
        }
      }
    }

    carregarPerguntas();

    return () => controller.abort();
  }, [url, tentativa]);

  function renderizarJogo() {
    if (erro) {
      return (
        <p role="alert">
          {erro}{" "}
          <button
            type="button"
            className="botao secundario"
            onClick={() => setTentativa((n) => n + 1)}
          >
            Tentar novamente
          </button>
        </p>
      );
    }

    if (!dados) {
      return <p role="status">Carregando perguntas do jogo...</p>;
    }

    if (tipo === "situacoes") {
      return <JogoSituacoes dados={dados} />;
    }

    return <JogoMensagens dados={dados} />;
  }

  return renderizarJogo();
}
