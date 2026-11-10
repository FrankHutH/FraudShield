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
    setErro("");
    setDados(null);
    fetch(url, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Falha na API");
        return response.json();
      })
      .then((lista) => {
        if (!Array.isArray(lista) || !lista.length)
          throw new Error("JSON inválido");
        setDados(lista);
      })
      .catch(() => {
        if (!controller.signal.aborted)
          setErro("Não foi possível carregar as perguntas do jogo.");
      });
    return () => controller.abort();
  }, [url, tentativa]);
  if (erro)
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
  if (!dados) return <p role="status">Carregando perguntas do jogo...</p>;
  return tipo === "situacoes" ? (
    <JogoSituacoes dados={dados} />
  ) : (
    <JogoMensagens dados={dados} />
  );
}
