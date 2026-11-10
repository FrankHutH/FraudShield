"use client";

import { useEffect, useState } from "react";
import LegacyScripts from "./LegacyScripts";

// Busca os dados do servidor antes de iniciar a lógica dos jogos.
export default function CarregadorJogo({ url, nomeBanco, scripts }) {
  const [dados, setDados] = useState(null);
  const [erro, setErro] = useState("");
  const [tentativa, setTentativa] = useState(0);

  useEffect(() => {
    const controlador = new AbortController();

    fetch(url, { signal: controlador.signal })
      .then((resposta) => {
        if (!resposta.ok) throw new Error("Erro ao buscar os dados");
        return resposta.json();
      })
      .then((lista) => {
        if (!Array.isArray(lista) || lista.length === 0) {
          throw new Error("Dados inválidos");
        }
        setDados(lista);
      })
      .catch(() => {
        if (!controlador.signal.aborted) {
          setErro("Não foi possível carregar as perguntas do jogo.");
        }
      });

    return () => controlador.abort();
  }, [url, tentativa]);

  function tentarNovamente() {
    setDados(null);
    setErro("");
    setTentativa((numero) => numero + 1);
  }

  if (erro) {
    return (
      <p role="alert">
        {erro}{" "}
        <button className="botao secundario" type="button" onClick={tentarNovamente}>
          Tentar novamente
        </button>
      </p>
    );
  }

  if (!dados) return <p role="status">Carregando perguntas do jogo...</p>;

  return <LegacyScripts scripts={scripts} nomeBanco={nomeBanco} dados={dados} />;
}
