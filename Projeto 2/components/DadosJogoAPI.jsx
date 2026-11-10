"use client";

import { useEffect, useState } from "react";
import LegacyScripts from "./LegacyScripts";

export default function DadosJogoAPI({ endpoint, banco, scripts }) {
  const [carregado, setCarregado] = useState(false);
  const [erro, setErro] = useState("");
  const chaveScripts = scripts.join("|");

  useEffect(() => {
    let ativo = true;
    setCarregado(false);
    setErro("");

    fetch(endpoint)
      .then((resposta) => {
        if (!resposta.ok) throw new Error("Falha HTTP: " + resposta.status);
        return resposta.json();
      })
      .then((dados) => {
        if (!Array.isArray(dados) || dados.length === 0) {
          throw new Error("Dados inválidos da API");
        }
        if (!ativo) return;
        window[banco] = dados;
        setCarregado(true);
      })
      .catch(() => {
        if (ativo) setErro("Não foi possível carregar o jogo. Atualize a página para tentar novamente.");
      });

    return () => { ativo = false; };
  }, [endpoint, banco]);

  if (erro) return <p role="alert">{erro}</p>;
  if (!carregado) return <p role="status">Carregando jogo...</p>;
  return <LegacyScripts scripts={chaveScripts.split("|")} />;
}
